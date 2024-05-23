import React from 'react';
import { Layout } from 'antd';

import HeaderRender from '@/components/layout/HeaderRender';
import MainPage from '@/components/layout/MainPage';
import ExamComponents from '@/components/pages/studentComponents/ExamPage';

const { Content } = Layout;

const StudentExamPage = () => (
  <MainPage>
    <HeaderRender title="Exam" />

    <Content>
      <ExamComponents />
    </Content>
  </MainPage>
);

export default StudentExamPage;
