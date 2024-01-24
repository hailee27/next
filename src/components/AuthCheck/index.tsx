/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLazyMeQuery } from '@/redux/endpoints/auth';
import { setUser } from '@/redux/slices/auth.slice';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  const [triggerGetMe] = useLazyMeQuery();
  const dispatch = useDispatch();
  const getUserLoggedIn = useCallback(async () => {
    try {
      if (accessToken) {
        const data = await triggerGetMe().unwrap();
        if (data as any) {
          dispatch(setUser(data));
        }
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('err', err);
    }
  }, [accessToken]);

  useEffect(() => {
    getUserLoggedIn();
  }, [getUserLoggedIn]);

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
