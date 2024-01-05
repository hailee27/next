import React from 'react';
import CampaignCreatorSigninPage from '@/pages/auth/sign-in/campaign-creator';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import SignInLayout from '../layout/SignInLayout';

function AuthCheck({ children }: { children: React.ReactElement }) {
  const { accessToken } = useSelector((state: RootState) => state.auth);

  if (accessToken === null) {
    return (
      <SignInLayout>
        <CampaignCreatorSigninPage />
      </SignInLayout>
    );
  }
  return children;
}

export default AuthCheck;
