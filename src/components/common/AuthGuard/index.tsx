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
    if (!accessToken) {
      router.push('/auth/login');
    }
  }, [accessToken]);
  if (!accessToken) {
    return null;
  }

  return <div>{children}</div>;
};

export default AuthGuard;
