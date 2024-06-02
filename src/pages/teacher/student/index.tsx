import React from 'react';
import { Layout } from 'antd';

import MainPage from '@/components/layout/MainPage';
import HeaderRender from '@/components/layout/HeaderRender';
import StudentComponents from '@/components/pages/teacherComponents/StudentPage';

const { Content } = Layout;

const StudentPage = () => (
  <MainPage>
    <HeaderRender title="Student" />

    <Content>
      <StudentComponents />
    </Content>
  </MainPage>
);

export default StudentPage;
