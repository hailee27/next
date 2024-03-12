import { ListCampaignParams, TypeCampaign, useLazyGetListCampaignQuery } from '@/redux/endpoints/campaign';
import { getErrorMessage } from '@/utils/func/getErrorMessage';
import toastMessage from '@/utils/func/toastMessage';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

export default function useGetCampaigns({ pageSize }: { pageSize: number }) {
  const router = useRouter();

  const [campaigns, setCampaigns] = useState<TypeCampaign[] | null>(null);
  const [total, setTotal] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [triggerGetCampaigns] = useLazyGetListCampaignQuery();

  const fetchCampaigns = useCallback(async () => {
    try {
      const startRequest = Date.now();
      setIsFetching(true);
      const page = parseInt((router?.query?.page ?? '1') as string, 10);
      const orderBy = router?.query?.orderBy;
      const apiRequest: ListCampaignParams = {
        orderBy: JSON.stringify({
          totalViews: 'desc',
        }),
        skip: pageSize * (page - 1),
        take: pageSize,
        token: 'user',
      };
      if (orderBy) {
        if (orderBy === 'expiredTime' || orderBy === 'totalPrizeValue') {
          apiRequest.orderBy = JSON.stringify({
            [`${orderBy}`]: {
              sort: orderBy === 'expiredTime' ? 'asc' : 'desc',
              nulls: 'last',
            },
          });
        } else {
          apiRequest.orderBy = JSON.stringify({
            [`${orderBy}`]: 'desc',
          });
        }
      }
      const data = await triggerGetCampaigns(apiRequest).unwrap();
      setCampaigns(data?.campaigns);
      setTotal(data?.total);
      const endRequest = Date.now();
      if (endRequest - startRequest < 600) {
        setTimeout(
          () => {
            setIsFetching(false);
          },
          600 - (endRequest - startRequest)
        );
      } else {
        setIsFetching(false);
      }
    } catch (err) {
      setCampaigns([]);
      setTotal(0);
      toastMessage(getErrorMessage(err), 'error');
      setIsFetching(false);
    }
  }, [pageSize, router?.query?.page, router?.query?.orderBy]);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  return {
    campaigns,
    total,
    isFetching,
  };
}
