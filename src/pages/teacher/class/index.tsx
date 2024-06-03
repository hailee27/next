import React from 'react';
import { Layout } from 'antd';

import MainPage from '@/components/layout/MainPage';
import HeaderRender from '@/components/layout/HeaderRender';
import ClassPageComponents from '@/components/pages/teacherComponents/ClassPage';

const { Content } = Layout;

const TeacherClassPage = () => (
  <MainPage>
    <HeaderRender title="Class" />

    <Content>
      <ClassPageComponents />
    </Content>
  </MainPage>
);

export default TeacherClassPage;
