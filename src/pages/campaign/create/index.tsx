import React from 'react';
import dynamic from 'next/dynamic';

const CampaignCreation = dynamic(() => import('@/components/CampaignCreate/CampaignCreation'), {
  ssr: false,
});
function CampaignCreatePage() {
  return <CampaignCreation />;
}

export default CampaignCreatePage;
