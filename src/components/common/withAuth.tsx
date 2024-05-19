import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/redux/store';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function withAuth<T>(Component: any) {
  const Auth = (props: T) => {
    const router = useRouter();
    const { accessToken } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
      if (!accessToken) {
        router.push('/auth/login');
      }
    }, [accessToken]);
    if (!accessToken) {
      return null;
    }

    return <Component {...props} />;
  };
  return Auth;
}

export default withAuth;
