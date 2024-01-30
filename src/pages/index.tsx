import HomePage from '@/components/Home';
import { CampaignApi, ListCampaignParams, TypeCampaign } from '@/redux/endpoints/campaign';
import { wrapper } from '@/redux/store';
import { HOME_PAGINATION_PAGE_SIZE } from '@/utils/constant/enums';

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  const apiRequest: ListCampaignParams = {
    skip: 0,
    take: HOME_PAGINATION_PAGE_SIZE,
    token: 'user',
  };

  const { data: campaignsOrderByViews } = await store.dispatch(
    CampaignApi.endpoints.getListCampaign.initiate({
      ...apiRequest,
      orderBy: JSON.stringify({
        totalViews: 'desc',
      }),
    })
  );

  const { data: campaignsOrderByStartTime } = await store.dispatch(
    CampaignApi.endpoints.getListCampaign.initiate({
      ...apiRequest,
      orderBy: JSON.stringify({
        startTime: 'desc',
      }),
    })
  );

  const { data: campaignsOrderByTotalPrizeValue } = await store.dispatch(
    CampaignApi.endpoints.getListCampaign.initiate({
      ...apiRequest,
      orderBy: JSON.stringify({
        totalPrizeValue: 'desc',
      }),
    })
  );

  return {
    props: {
      campaignsOrderByViews: campaignsOrderByViews?.campaigns ?? null,
      campaignsOrderByStartTime: campaignsOrderByStartTime?.campaigns ?? null,
      campaignsOrderByTotalPrizeValue: campaignsOrderByTotalPrizeValue?.campaigns ?? null,
    },
  };
});
interface IPageProps {
  campaignsOrderByViews: TypeCampaign[] | null;
  campaignsOrderByStartTime: TypeCampaign[] | null;
  campaignsOrderByTotalPrizeValue: TypeCampaign[] | null;
}

export default function Home({
  campaignsOrderByViews,
  campaignsOrderByStartTime,
  campaignsOrderByTotalPrizeValue,
}: IPageProps) {
  return (
    <HomePage
      campaignsOrderByStartTime={campaignsOrderByStartTime}
      campaignsOrderByTotalPrizeValue={campaignsOrderByTotalPrizeValue}
      campaignsOrderByViews={campaignsOrderByViews}
    />
  );
}
