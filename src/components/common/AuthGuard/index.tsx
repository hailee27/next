import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { RootState } from '@/redux/store';

interface PropsType {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: PropsType) => {
  const router = useRouter();
  const { accessToken } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!accessToken && router.pathname !== '/auth/login') {
      router.push('/auth/login');
    } else if (accessToken && router.pathname === '/auth/login') {
      router.push('/');
    }
  }, [accessToken]);

  return <div>{children}</div>;
};

export default AuthGuard;
