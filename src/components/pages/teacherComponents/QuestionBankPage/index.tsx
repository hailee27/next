import React, { useState } from 'react';
import dayjs from 'dayjs';

import { QuestionBankSearchObj } from '@/redux/endpoints/teacher/questionBank';

import QuestionBankTable from './QuestionBankTable';
import QuestionBankFilter from './QuestionBankFilter';

const QuestionBankComponents = () => {
  const [objSearch, setObjSearch] = useState<QuestionBankSearchObj>({});

  return (
    <div>
      <div className="py-[14px] space-y-[24px]">
        <QuestionBankFilter
          onSubmit={(values) =>
            setObjSearch({
              search: values?.search || '',
              createdAt: values?.createdAt ? dayjs(values?.createdAt).format('YYYY-MM-DD') : '',
            })
          }
        />
      </div>

      <QuestionBankTable objSearch={objSearch} />
    </div>
  );
};

export default QuestionBankComponents;
