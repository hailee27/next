import React from 'react';
import dynamic from 'next/dynamic';
import { Spin } from 'antd';

const CampaignCreation = dynamic(() => import('@/components/CampaignCreate/CampaignCreation'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <Spin />
    </div>
  ),
});
function CampaignCreatePage() {
  return <CampaignCreation />;
}

export default CampaignCreatePage;
