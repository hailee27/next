import CampaignList from '@/components/CampaignCreate/CampaignList';
import PopUpOrganization from '@/components/PopUpOrganization';
import { usePopUpContext } from '@/context/PopUpContext';
import React, { useEffect } from 'react';

function CampainListPage() {
  const { openPopUp, closePopUp } = usePopUpContext();
  useEffect(() => {
    openPopUp({ contents: <PopUpOrganization /> });
    return () => {
      closePopUp();
    };
  }, []);
  return <CampaignList />;
}

export default CampainListPage;
