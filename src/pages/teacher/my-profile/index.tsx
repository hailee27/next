import React from 'react';
import { Layout } from 'antd';

import HeaderRender from '@/components/layout/HeaderRender';
import MainPage from '@/components/layout/MainPage';
import TeacherProfileComponents from '@/components/pages/teacherComponents/ProfilePage';

const { Content } = Layout;

const TeacherProfile = () => (
  <MainPage>
    <HeaderRender title="Profile" />

    <Content>
      <TeacherProfileComponents />
    </Content>
  </MainPage>
);

export default TeacherProfile;
