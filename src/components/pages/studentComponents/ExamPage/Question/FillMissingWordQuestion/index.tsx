/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-unsafe-optional-chaining */

import React, { useEffect, useState } from 'react';
import { Input } from 'antd';

import { QuestionBankType } from '@/redux/endpoints/teacher/questionBank';
import { AnswerSubmitType, useSaveAssignmentQuestionMutation } from '@/redux/endpoints/student/assignment';
import { handleGetReplaceMessingText } from '@/utils';
import { useExamContext } from '@/context/ExamContext';

interface FillMissingWordType {
  index: number;
  value: string | null;
}

interface PropsType {
  question: QuestionBankType;
  index: number;
  setAnswerSubmit: React.Dispatch<React.SetStateAction<AnswerSubmitType[]>>;
}

const FillMissingWordQuestion = ({ question, index, setAnswerSubmit }: PropsType) => {
  const { assignmentSessionId } = useExamContext();
  const [saveAssignmentQuestion] = useSaveAssignmentQuestionMutation();

  const responseLength = handleGetReplaceMessingText(question?.body || '')?.split('___')?.length - 1;

  const [dataFilled, setDataFilled] = useState<FillMissingWordType[]>(
    new Array(responseLength).fill(0)?.map((_, idex) => ({ index: idex, value: null }))
  );

  useEffect(() => {
    const answer = question?.answer ? JSON.parse(question?.answer) : [];

    if (answer?.length > 0) {
      setDataFilled(
        answer?.map((item, idex) => ({
          index: idex,
          value: item,
        }))
      );
    }
  }, [question]);

  return (
    <div>
      <p className="font-semibold mb-4">
        Question {index}: <span className="">{handleGetReplaceMessingText(question?.body || '')}</span>?
      </p>
      <div className="grid grid-cols-1 gap-y-4">
        {dataFilled?.map((i, idex) => (
          <div className="flex items-center gap-x-4" key={i?.index}>
            <div className="w-[110px]">Missing Word {idex + 1}: </div>
            <Input
              className="w-[200px]"
              onChange={(e) => {
                const dataChange = dataFilled?.map((item) => {
                  if (item?.index === idex) {
                    return {
                      ...item,
                      value: e.target.value,
                    };
                  }
                  return item;
                });

                setAnswerSubmit(
                  (prev) =>
                    prev?.map((item) => {
                      if (item?.id === question?.id) {
                        return {
                          ...item,
                          answer: dataChange?.map((v) => v?.value),
                        };
                      }
                      return item;
                    })
                );
                saveAssignmentQuestion({
                  assignmentSessionId,
                  answers: {
                    [`${question?.id || 0}`]: dataChange?.map((item) => item?.value),
                  },
                });
                setDataFilled(dataChange);
              }}
              placeholder="word"
              value={dataFilled?.find((item) => item?.index === idex)?.value || ''}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FillMissingWordQuestion;
