/* eslint-disable react/no-unused-prop-types */
import React from 'react';

import { QuestionBankType } from '@/redux/endpoints/teacher/questionBank';
import { AnswerSubmitType } from '@/redux/endpoints/student/assignment';
import { handleGetReplaceMessingText } from '@/utils';

interface PropsType {
  question: QuestionBankType;
  index: number;
  setAnswerSubmit: React.Dispatch<React.SetStateAction<AnswerSubmitType[]>>;
}

const FillMissingWordQuestion = ({ question, index }: PropsType) => (
  <div>
    <p className="font-semibold mb-4">
      Question {index}: <span className="">{handleGetReplaceMessingText(question?.body || '')}</span>?
    </p>
  </div>
);

export default FillMissingWordQuestion;
