/* eslint-disable max-lines */
/* eslint-disable react/no-danger */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import CampaignDetail from '@/components/CampaignDetail';
import CampaignDetailProvider from '@/components/CampaignDetail/CampainContext';
import RecommedCampaignsSection from '@/components/CampaignDetail/RecommedCampaignsSection';
import { CampaignApi, ListCampaignParams, TypeCampaign } from '@/redux/endpoints/campaign';
import { wrapper } from '@/redux/store';

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ params }) => {
  if (
    !Array.isArray(params?.slug) ||
    (Array.isArray(params?.slug) && params?.slug && params?.slug?.length > 2) ||
    (Array.isArray(params?.slug) &&
      params?.slug &&
      params?.slug?.length === 2 &&
      ['completion', 'winning', 'losing']?.find((i) => params?.slug?.[1] === i) === undefined)
  ) {
    return {
      notFound: true,
    };
  }

  const id = params?.slug?.[0] ? params?.slug?.[0] : '';

  const apiRequest: ListCampaignParams = {
    orderBy: JSON.stringify({
      totalViews: 'desc',
    }),
    skip: 0,
    take: 20,
    token: 'user',
    except: id as string,
  };

  const { data: dataCampaigns } = await store.dispatch(CampaignApi.endpoints.getListCampaign.initiate(apiRequest));

  const { data: dataCampaign } = await store.dispatch(
    CampaignApi.endpoints.getDetailCampaign.initiate({
      campaignId: id as string,
      token: 'user',
    })
  );

  if (!dataCampaign?.id || (dataCampaign?.status !== 'PUBLIC' && dataCampaign?.status !== 'COMPLETION')) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      viewType: params?.slug?.[1] ?? 'detail',
      campaignDetail: dataCampaign ?? null,
      campaignsRecommend: dataCampaigns?.campaigns ?? null,
    },
  };
});

// eslint-disable-next-line max-lines-per-function
export default function CampaignDetailPage({
  campaignDetail,
  campaignsRecommend,
  viewType,
}: {
  campaignDetail: TypeCampaign | null;
  campaignsRecommend: TypeCampaign[] | null;
  viewType: 'completion' | 'winning' | 'losing' | 'detail';
}) {
  return (
    <CampaignDetailProvider campaignDetail={campaignDetail} viewType={viewType}>
      <div className="font-notoSans">
        <CampaignDetail />
        <div className="h-[24px]" />
        {Array.isArray(campaignsRecommend) && campaignsRecommend?.length > 0 ? (
          <RecommedCampaignsSection campaignsRecommend={campaignsRecommend} />
        ) : (
          ''
        )}
      </div>
    </CampaignDetailProvider>
  );
}
