import PopUpOrganization from '@/components/PopUpOrganization';
import { usePopUpContext } from '@/context/PopUpContext';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

function CampaignPage() {
  const router = useRouter();
  const { openPopUp } = usePopUpContext();
  const { accessToken } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    openPopUp({ contents: <PopUpOrganization /> });
  }, []);
  useEffect(() => {
    if (!accessToken) {
      router.push('/auth/sign-in/campaign-creator');
    }
  }, [accessToken]);
  return <div>CampaignPage</div>;
}

export default CampaignPage;
