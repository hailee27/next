import React from 'react';
import { Layout } from 'antd';

import HeaderRender from '@/components/layout/HeaderRender';
import MainPage from '@/components/layout/MainPage';
import PracticeExamComponents from '@/components/pages/studentComponents/PracticeExam';
import { ExamContextProvider } from '@/context/ExamContext';

const { Content } = Layout;

const StudentPracticeExam = () => (
  <MainPage>
    <HeaderRender title="Practice Exam" />

    <Content>
      <ExamContextProvider>
        <PracticeExamComponents />
      </ExamContextProvider>
    </Content>
  </MainPage>
);

export default StudentPracticeExam;
