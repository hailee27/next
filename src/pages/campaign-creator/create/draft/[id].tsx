import React from 'react';
import CampaignCreation from '@/components/CampaignCreate/CampaignCreation';
import { CampaignApi } from '@/redux/endpoints/campaign';
import { wrapper } from '@/redux/store';

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ params }) => {
  const id = params?.id;

  const { data: dataCampaign } = await store.dispatch(
    CampaignApi.endpoints.getDetailCampaign.initiate({
      campaignId: id as string,
      token: 'user',
    })
  );
  if (dataCampaign?.status !== 'DRAFT') {
    return {
      notFound: true,
    };
  }
  return {
    props: {},
  };
});
function DraftPage() {
  return <CampaignCreation />;
}

export default DraftPage;
