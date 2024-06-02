import React from 'react';
import { Layout } from 'antd';

import HeaderRender from '@/components/layout/HeaderRender';
import MainPage from '@/components/layout/MainPage';
import TeacherMessageComponents from '@/components/pages/teacherComponents/TeacherMessagePage';

const { Content } = Layout;

const TeacherMessage = () => (
  <MainPage>
    <HeaderRender title="Teacher Message" />

    <Content>
      <TeacherMessageComponents />
    </Content>
  </MainPage>
);

export default TeacherMessage;
