import React from 'react';
import { useSelector } from 'react-redux';
import OrganizeInformation from '@/components/OrganizeInformation';
import { RootState } from '@/redux/store';
import { ConditionPage } from '@/components/CampaignCreate/ConditionPage';

function OrganizeInformationPage() {
  const { user } = useSelector((state: RootState) => state.auth);
  if (user?.isRequestMemberCompany) {
    return <ConditionPage />;
  }
  return <OrganizeInformation />;
}

export default OrganizeInformationPage;
