import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Spin } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/router';

const CampaignCreation = dynamic(() => import('@/components/CampaignCreate/CampaignCreation'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <Spin />
    </div>
  ),
});
function CampaignCreatePage() {
  const { push } = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (user?.companyId == null) {
      push('/campaign/list');
    }
  }, [user?.companyId]);
  return <CampaignCreation />;
}

export default CampaignCreatePage;
