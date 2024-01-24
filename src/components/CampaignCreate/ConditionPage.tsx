import { useEffect } from 'react';
import { useRouter } from 'next/router';

export const ConditionPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/campaign-creator/list');
  });
  return null;
};
