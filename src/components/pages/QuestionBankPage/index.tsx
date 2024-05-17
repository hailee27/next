/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';

import { QuestionBankSearchObj } from '@/redux/endpoints/questionBank';

import QuestionBankTable from './QuestionBankTable';

const QuestionBankComponents = () => {
  const [objSearch, setObjSearch] = useState<QuestionBankSearchObj>({});

  return (
    <div>
      <QuestionBankTable objSearch={objSearch} />
    </div>
  );
};

export default QuestionBankComponents;
