/* eslint-disable no-console */
import React from 'react';
import { Layout } from 'antd';

import HeaderRender from '@/components/layout/HeaderRender';
import MainPage from '@/components/layout/MainPage';
import StudentMessageComponents from '@/components/pages/studentComponents/StudentMessagePage';

const { Content } = Layout;

const StudentMessage = () => (
  <MainPage>
    <HeaderRender title="Student Message" />

    <Content>
      <StudentMessageComponents />
    </Content>
  </MainPage>
);

export default StudentMessage;
