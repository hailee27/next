import React from 'react';

import { QuestionBankType } from '@/redux/endpoints/teacher/questionBank';

import SingleAnswerQuestion from './SingleAnswerQuestion';
import MultipleAnswerQuestion from './MultipleAnswerQuestion';
import FillMissingWordQuestion from './FillMissingWordQuestion';
import TrueOrFalseQuestion from './TrueOrFalseQuestion';
import ArrangeQuestion from './ArrangeQuestion';
import WriteEssayQuestion from './WriteEssayQuestion';

interface PropsType {
  question: QuestionBankType;
  index: number;
}

const Question = ({ question, index }: PropsType) => {
  if (question?.type === 1) {
    return <SingleAnswerQuestion index={index} question={question} />;
  }

  if (question?.type === 2) {
    return <MultipleAnswerQuestion index={index} question={question} />;
  }

  if (question?.type === 3) {
    return <FillMissingWordQuestion index={index} question={question} />;
  }

  if (question?.type === 4) {
    return <TrueOrFalseQuestion index={index} question={question} />;
  }

  if (question?.type === 5) {
    return <ArrangeQuestion index={index} question={question} />;
  }

  return <WriteEssayQuestion index={index} question={question} />;
};

export default Question;
