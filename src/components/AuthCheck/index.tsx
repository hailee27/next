/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLazyMeQuery } from '@/redux/endpoints/auth';
import { setUser } from '@/redux/slices/auth.slice';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const FlagComponent = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/auth/sign-in/campaign-creator');
  }, []);
  return null;
};
function AuthCheck({ children }: { children: React.ReactElement }) {
  const { accessToken } = useSelector((state: RootState) => state.auth);
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
    if (accessToken) {
      getUserLoggedIn();
    }
  }, [accessToken]);

  if (!accessToken || accessToken === null) {
    return <FlagComponent />;
  }
  return children;
}

export default AuthCheck;
