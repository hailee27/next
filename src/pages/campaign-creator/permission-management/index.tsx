import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import PermissionManagement from '@/components/CampaignCreate/PermissionManagement';
import { ConditionPage } from '@/components/CampaignCreate/ConditionPage';

function PermissionManagementPage() {
  const { user } = useSelector((state: RootState) => state.auth);
  if (user?.isRequestMemberCompany) {
    return <ConditionPage />;
  }
  return <PermissionManagement />;
}

export default PermissionManagementPage;
