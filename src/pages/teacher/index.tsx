import React, { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Container } from '@mui/material';

import withAuth from '@/components/common/withAuth';
import { RootState } from '@/redux/store';
import Teacher from '@/components/Teacher';

function HomePageTeacher() {
  const { student } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  // useLayoutEffect(() => {
  //   if (student) {
  //     router.push('/student');
  //   }
  // }, [student]);
  return (
    <Container maxWidth="xl" sx={{ minHeight: '100vh' }}>
      <Teacher />
    </Container>
  );
}

export default withAuth(HomePageTeacher);
