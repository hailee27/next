import React from 'react';
import { Layout } from 'antd';

import HeaderRender from '@/components/layout/HeaderRender';
import MainPage from '@/components/layout/MainPage';
import ExamComponents from '@/components/pages/studentComponents/ExamPage';
import { ExamContextProvider } from '@/context/ExamContext';

const { Content } = Layout;

const StudentExamPage = () => (
  <MainPage>
    <HeaderRender title="Exam" />

    <Content>
      <ExamContextProvider>
        <ExamComponents />
      </ExamContextProvider>
    </Content>
  </MainPage>
);

export default StudentExamPage;
