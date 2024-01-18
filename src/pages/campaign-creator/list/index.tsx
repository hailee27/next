import CampaignList from '@/components/CampaignCreate/CampaignList';
import PopUpOrganization from '@/components/PopUpOrganization';
import { usePopUpContext } from '@/context/PopUpContext';
import { RootState } from '@/redux/store';

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

function CampainListPage() {
  const { openPopUp } = usePopUpContext();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user?.companyId == null) {
      openPopUp({ contents: <PopUpOrganization /> });
    }
  }, [user?.companyId]);
  return <CampaignList />;
}

export default CampainListPage;