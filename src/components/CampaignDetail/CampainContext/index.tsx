import { TypeCampaign, TypeCampaignReward, TypeTask } from '@/redux/endpoints/campaign';
import { useGetReWardsQuery } from '@/redux/endpoints/reWard';
import { useGetTasksQuery } from '@/redux/endpoints/task';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const CampaignDetailContext = React.createContext<{
  campaignDetail: TypeCampaign | null;
  campaignTasks: TypeTask[] | null;
  campaignRewards: TypeCampaignReward[] | null;
  onRefetchCampaignTasks: () => void;
}>({
  campaignDetail: null,
  campaignTasks: null,
  campaignRewards: null,
  onRefetchCampaignTasks: () => {},
});

export default function CampaignDetailProvider({
  campaign,
  children,
}: {
  children: React.ReactNode;
  campaign: TypeCampaign | null;
}) {
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const { data: campaignDetailTasks, refetch: refetchCampaignTasks } = useGetTasksQuery({
    campaignId: router?.query?.slug?.[0] ?? '',
    token: accessToken || 'user',
  });

  const { data: campaignDetailRewards } = useGetReWardsQuery({
    campaignId: router?.query?.slug?.[0] ?? '',
    token: accessToken || 'user',
  });

  const values = useMemo(
    () => ({
      campaignDetail: campaign ?? null,
      campaignTasks: campaignDetailTasks?.tasks ?? null,
      campaignRewards: campaignDetailRewards?.rewards ?? null,
      onRefetchCampaignTasks: refetchCampaignTasks,
    }),
    [campaign, campaignDetailTasks, campaignDetailRewards]
  );
  return <CampaignDetailContext.Provider value={values}>{children}</CampaignDetailContext.Provider>;
}
