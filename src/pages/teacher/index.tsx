import React from 'react';
import { Container } from '@mui/material';

import withAuth from '@/components/common/withAuth';
import Teacher from '@/components/Teacher';

function HomePageTeacher() {
  return (
    <Container maxWidth="xl" sx={{ minHeight: '100vh' }}>
      <Teacher />
    </Container>
  );
}

export default withAuth(HomePageTeacher);
