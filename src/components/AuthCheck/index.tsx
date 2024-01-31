/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMeQuery } from '@/redux/endpoints/auth';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import CreatorRoleFeedbackModal from '../CreatorRoleFeedbackModal';

const FlagComponent = ({ type }: { type?: 'CREATOR' | 'IMPLEMENTER' }) => {
  const router = useRouter();
  useEffect(() => {
    router.push(type === 'CREATOR' ? '/auth/sign-in/campaign-creator' : '/auth/sign-in/campaign-implementer');
  }, [router.isReady, type]);
  return null;
};

function AuthCheck({ children, type }: { children: React.ReactElement; type?: 'CREATOR' | 'IMPLEMENTER' }) {
  const router = useRouter();
  const { accessToken, user } = useSelector((state: RootState) => state.auth);

  useMeQuery(undefined, {
    skip: !accessToken,
    refetchOnMountOrArgChange: true,
  });

  if ((!accessToken || accessToken === null) && type === 'IMPLEMENTER') {
    return <FlagComponent type="IMPLEMENTER" />;
  }
  if ((!accessToken || accessToken === null) && type === 'CREATOR') {
    return <FlagComponent type="CREATOR" />;
  }
  if (
    accessToken &&
    router.pathname.startsWith('/campaign-creator') &&
    (user?.twoFactorMethod === 'NONE' || user?.emailId === null)
  ) {
    return <CreatorRoleFeedbackModal />;
  }
  return children;
}

FlagComponent.defaultProps = {
  type: 'IMPLEMENTER',
};
AuthCheck.defaultProps = {
  type: 'IMPLEMENTER',
};
export default AuthCheck;
