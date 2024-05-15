import React from 'react';
import { Layout } from 'antd';

import HeaderRender from '@/components/layout/HeaderRender';
import MainPage from '@/components/layout/MainPage';
import AssignmentPageComponents from '@/components/pages/AssignmentPage';

const { Content } = Layout;

const AssignmentPage = () => (
  <MainPage>
    <HeaderRender title="Assignment" />

    <Content>
      <AssignmentPageComponents />
    </Content>
  </MainPage>
);

export default AssignmentPage;
