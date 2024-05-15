import React from 'react';
import { Layout } from 'antd';

import ClassPageComponents from '@/components/pages/ClassPage';
import MainPage from '@/components/layout/MainPage';
import HeaderRender from '@/components/layout/HeaderRender';

const { Content } = Layout;

const ClassPage = () => (
  <MainPage>
    <HeaderRender title="Class" />

    <Content>
      <ClassPageComponents />
    </Content>
  </MainPage>
);

export default ClassPage;
