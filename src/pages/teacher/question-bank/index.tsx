import React from 'react';
import { Layout } from 'antd';

import MainPage from '@/components/layout/MainPage';
import HeaderRender from '@/components/layout/HeaderRender';
import QuestionBankComponents from '@/components/pages/teacherComponents/QuestionBankPage';

const { Content } = Layout;

const QuestionBankPage = () => (
  <MainPage>
    <HeaderRender title="Question Bank" />

    <Content>
      <QuestionBankComponents />
    </Content>
  </MainPage>
);

export default QuestionBankPage;
