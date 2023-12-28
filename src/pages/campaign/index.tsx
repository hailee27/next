import { RootState } from '@/redux/store';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

function CampaignPage() {
  const router = useRouter();
  const { accessToken } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!accessToken) {
      router.push('/auth/sign-in/campaign-creator');
    }
  }, [accessToken]);
  return <div>CampaignPage</div>;
}

export default CampaignPage;
