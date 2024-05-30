import React from 'react';
import { Layout } from 'antd';

import MainPage from '@/components/layout/MainPage';
import HeaderRender from '@/components/layout/HeaderRender';
import StudentPracticeComponents from '@/components/pages/studentComponents/StudentPracticePage';

const { Content } = Layout;

const PracticePage = () => (
  <MainPage>
    <HeaderRender title="Practice" />

    <Content>
      <StudentPracticeComponents />
    </Content>
  </MainPage>
);

export default PracticePage;
