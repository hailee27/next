import React, { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import withAuth from '@/components/common/withAuth';
import { RootState } from '@/redux/store';

function HomePageStudent() {
  const { teacher } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  // useLayoutEffect(() => {
  //   if (teacher) {
  //     router.push('/teacher');
  //   }
  // }, [teacher]);
  return <div>HomePageStudent</div>;
}

export default withAuth(HomePageStudent);
