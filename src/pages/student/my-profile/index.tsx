import React from 'react';
import { Layout } from 'antd';

import HeaderRender from '@/components/layout/HeaderRender';
import MainPage from '@/components/layout/MainPage';
import StudentProfileComponents from '@/components/pages/studentComponents/ProfilePage';

const { Content } = Layout;

const StudentProfile = () => (
  <MainPage>
    <HeaderRender title="Profile" />

    <Content>
      <StudentProfileComponents />
    </Content>
  </MainPage>
);

export default StudentProfile;
