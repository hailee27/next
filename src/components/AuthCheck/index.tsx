import { RootState } from '@/redux/store';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';

function AuthCheck({ children }: { children: React.ReactElement }) {
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  if (!accessToken) {
    router.replace('/auth/sign-in/campaign-creator');
  }
  return children;
}

export default AuthCheck;
