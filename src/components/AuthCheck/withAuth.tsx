import { useEffect } from 'react';

import Router from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const withAuth = () => {
  const Auth = () => {
    const { accessToken } = useSelector((state: RootState) => state.auth);
    useEffect(() => {
      if (!accessToken) Router.push('/auth/sign-in/campaign-creator');
    });
  };
  return Auth;
};
export default withAuth;
