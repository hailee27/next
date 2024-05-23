import React from 'react';

import { QuestionBankType } from '@/redux/endpoints/teacher/questionBank';

interface PropsType {
  question: QuestionBankType;
  index: number;
}

const FillMissingWordQuestion = ({ question, index }: PropsType) => (
  <div>
    <p className="font-semibold mb-4">
      Question {index}: <span className="">{question?.body}</span>?
    </p>
  </div>
);

export default FillMissingWordQuestion;
