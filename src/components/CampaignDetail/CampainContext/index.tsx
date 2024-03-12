import { TypeCampaign, TypeCampaignReward, TypeTask, useLazyGetDetailCampaignQuery } from '@/redux/endpoints/campaign';
import { useGetMasterDataQuery } from '@/redux/endpoints/masterData';
import { useGetReWardsQuery } from '@/redux/endpoints/reWard';
import { useGetTasksQuery } from '@/redux/endpoints/task';
import { RootState } from '@/redux/store';
import { getMasterDataLabel } from '@/utils/func/convertCampaign';
import { getErrorMessage } from '@/utils/func/getErrorMessage';
import toastMessage from '@/utils/func/toastMessage';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

export const CampaignDetailContext = React.createContext<{
  campaignDetail: TypeCampaign | null;
  campaignTasks: TypeTask[] | null;
  campaignRewards: TypeCampaignReward[] | null;
  onRefetchCampaignTasks: () => void;
  viewType: 'completion' | 'winning' | 'losing' | 'detail';
  isFetchingCampaignTasks: boolean;
  isFetchingCampaignRewards: boolean;
  onFetchCampaignInfo?: () => Promise<TypeCampaign | null>;
  campaignCategory: string;
}>({
  campaignDetail: null,
  campaignTasks: null,
  campaignRewards: null,
  onRefetchCampaignTasks: () => {},
  viewType: 'detail',
  isFetchingCampaignTasks: false,
  isFetchingCampaignRewards: false,
  campaignCategory: '',
});

export default function CampaignDetailProvider({
  viewType,
  campaignDetail,
  children,
}: {
  children: React.ReactNode;
  campaignDetail: TypeCampaign | null;

  viewType: 'completion' | 'winning' | 'losing' | 'detail';
}) {
  const { accessToken } = useSelector((state: RootState) => state.auth);

  const router = useRouter();

  const { data: masterData } = useGetMasterDataQuery();

  const [campaignInfo, setCampaignInfo] = useState<TypeCampaign | null | undefined>(campaignDetail);

  const [triggerGetInfo] = useLazyGetDetailCampaignQuery();

  const campaignCategory = getMasterDataLabel(masterData, 'CATEGORY_CAMPAIGN', campaignDetail?.category ?? '');

  const {
    data: campaignDetailTasks,
    isFetching: isFetchingCampaignTasks,
    refetch: refetchCampaignTasks,
  } = useGetTasksQuery(
    {
      campaignId: router?.query?.slug?.[0] ?? '',
      token: accessToken || 'user',
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const { data: campaignDetailRewards, isFetching: isFetchingCampaignRewards } = useGetReWardsQuery(
    {
      campaignId: router?.query?.slug?.[0] ?? '',
      token: accessToken || 'user',
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const fetchInitCampaignInfo = useCallback(async () => {
    let result: TypeCampaign | null = null;
    try {
      if (accessToken) {
        const data = await triggerGetInfo({
          campaignId: router?.query?.slug?.[0] ?? '',
          token: accessToken || 'user',
        }).unwrap();
        setCampaignInfo(data);
        result = data;
      }
    } catch (error) {
      toastMessage(getErrorMessage(error), 'error');
    }
    return result;
  }, [accessToken, router?.query?.slug?.[0]]);

  useEffect(() => {
    fetchInitCampaignInfo();
  }, [fetchInitCampaignInfo]);

  const values = useMemo(
    () => ({
      campaignCategory: campaignCategory || campaignDetail?.category || '',
      campaignDetail: campaignInfo ?? null,
      campaignTasks: campaignDetailTasks?.tasks ?? null,
      campaignRewards: campaignDetailRewards?.rewards ?? null,
      onRefetchCampaignTasks: refetchCampaignTasks,
      viewType,
      isFetchingCampaignTasks,
      isFetchingCampaignRewards,
      onFetchCampaignInfo: fetchInitCampaignInfo,
    }),
    [
      campaignInfo,
      campaignDetailTasks,
      campaignDetailRewards,
      viewType,
      isFetchingCampaignTasks,
      isFetchingCampaignRewards,
      fetchInitCampaignInfo,
    ]
  );
  return <CampaignDetailContext.Provider value={values}>{children}</CampaignDetailContext.Provider>;
}
