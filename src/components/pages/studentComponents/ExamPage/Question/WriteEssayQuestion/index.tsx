import React from 'react';

import BasicArea from '@/components/common/forms/BasicArea';
import { QuestionBankType } from '@/redux/endpoints/teacher/questionBank';

interface PropsType {
  question: QuestionBankType;
  index: number;
}

const WriteEssayQuestion = ({ question, index }: PropsType) => (
  <div>
    <p className="font-semibold mb-4">
      Question {index}: <span className="">{question?.body}</span>
    </p>
    <BasicArea placeholder="Essay" rows={8} />
  </div>
);

export default WriteEssayQuestion;
