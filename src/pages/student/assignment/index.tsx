import React from 'react';
import { Layout } from 'antd';

import HeaderRender from '@/components/layout/HeaderRender';
import MainPage from '@/components/layout/MainPage';
import StudentAssignmentComponents from '@/components/pages/studentComponents/StudentAssignmentPage';

const { Content } = Layout;

const StudentAssignmentPage = () => (
  <MainPage>
    <HeaderRender title="Assignment" />
    <Content>
      <StudentAssignmentComponents />
    </Content>
  </MainPage>
);

export default StudentAssignmentPage;
