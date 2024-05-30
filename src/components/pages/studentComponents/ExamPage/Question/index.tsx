import React from 'react';

import { QuestionBankType } from '@/redux/endpoints/teacher/questionBank';
import { AnswerSubmitType } from '@/redux/endpoints/student/assignment';

import SingleAnswerQuestion from './SingleAnswerQuestion';
import MultipleAnswerQuestion from './MultipleAnswerQuestion';
import FillMissingWordQuestion from './FillMissingWordQuestion';
import TrueOrFalseQuestion from './TrueOrFalseQuestion';
import ArrangeQuestion from './ArrangeQuestion';
import WriteEssayQuestion from './WriteEssayQuestion';

interface PropsType {
  question: QuestionBankType;
  index: number;
  setAnswerSubmit: React.Dispatch<React.SetStateAction<AnswerSubmitType[]>>;
  isPractice?: boolean;
}

const Question = ({ question, index, setAnswerSubmit, isPractice }: PropsType) => {
  if (question?.type === 1) {
    return (
      <SingleAnswerQuestion
        index={index}
        isPractice={isPractice}
        question={question}
        setAnswerSubmit={setAnswerSubmit}
      />
    );
  }

  if (question?.type === 2) {
    return (
      <MultipleAnswerQuestion
        index={index}
        isPractice={isPractice}
        question={question}
        setAnswerSubmit={setAnswerSubmit}
      />
    );
  }

  if (question?.type === 3) {
    return (
      <FillMissingWordQuestion
        index={index}
        isPractice={isPractice}
        question={question}
        setAnswerSubmit={setAnswerSubmit}
      />
    );
  }

  if (question?.type === 4) {
    return (
      <TrueOrFalseQuestion
        index={index}
        isPractice={isPractice}
        question={question}
        setAnswerSubmit={setAnswerSubmit}
      />
    );
  }

  if (question?.type === 5) {
    return (
      <ArrangeQuestion index={index} isPractice={isPractice} question={question} setAnswerSubmit={setAnswerSubmit} />
    );
  }

  return (
    <WriteEssayQuestion index={index} isPractice={isPractice} question={question} setAnswerSubmit={setAnswerSubmit} />
  );
};

Question.defaultProps = {
  isPractice: false,
};

export default Question;
