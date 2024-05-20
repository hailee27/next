import React from 'react';
import { Layout } from 'antd';

import HeaderRender from '@/components/layout/HeaderRender';
import MainPage from '@/components/layout/MainPage';
import StudentClassComponents from '@/components/pages/studentComponents/StudentClassPage';

const { Content } = Layout;

const StudentClassPage = () => (
  <MainPage>
    <HeaderRender title="Class" />

    <Content>
      <StudentClassComponents />
    </Content>
  </MainPage>
);

export default StudentClassPage;
