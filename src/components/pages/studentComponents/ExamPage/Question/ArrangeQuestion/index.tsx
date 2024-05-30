import React, { useEffect, useState } from 'react';
import { Tooltip } from 'antd';

import { QuestionBankType } from '@/redux/endpoints/teacher/questionBank';
import { handleConvertObjectToArray } from '@/utils';
import { useExamContext } from '@/context/ExamContext';
import { AnswerSubmitType, useSaveAssignmentQuestionMutation } from '@/redux/endpoints/student/assignment';
import { useSavePracticeMutation } from '@/redux/endpoints/student/practice';

export interface SelectType {
  value: number;
  label: string;
}

interface PropsType {
  question: QuestionBankType;
  index: number;
  setAnswerSubmit: React.Dispatch<React.SetStateAction<AnswerSubmitType[]>>;
  isPractice?: boolean;
}

const ArrangeQuestion = ({ question, index, setAnswerSubmit, isPractice }: PropsType) => {
  const { assignmentSessionId } = useExamContext();
  const [saveAssignmentQuestion] = useSaveAssignmentQuestionMutation();
  const [savePracticeQuestion] = useSavePracticeMutation();

  const choices = handleConvertObjectToArray(JSON.parse(question?.choices || '{}'));
  const choicesOptions = (choices || [])?.map((item, key) => ({ value: key + 1, label: item || '' }));

  const [responseChoose, setResponseChoose] = useState<SelectType[]>([]);

  useEffect(() => {
    if (responseChoose?.length === choicesOptions?.length) {
      const dataSaveApi = {
        assignmentSessionId,
        answers: {
          [`${question?.id || 0}`]: responseChoose?.map((item) => item?.value),
        },
      };
      if (isPractice) {
        savePracticeQuestion(dataSaveApi);
      } else {
        saveAssignmentQuestion(dataSaveApi);
      }
      setAnswerSubmit(
        (prev) =>
          prev?.map((item) => {
            if (item?.id === question?.id) {
              return {
                ...item,
                answer: responseChoose?.map((i) => i?.value),
              };
            }
            return item;
          })
      );
    }
  }, [responseChoose]);

  useEffect(() => {
    const answer = question?.answer ? JSON.parse(question?.answer) : [];

    if (answer?.length > 0) {
      setResponseChoose(
        answer?.map((item) => ({
          value: item,
          label: choicesOptions?.find((i) => i?.value === item)?.label,
        }))
      );
    }
  }, [question]);

  return (
    <div>
      <p className="font-semibold mb-4">
        Question {index}: <span className="">{question?.body}</span>?
      </p>
      <div className="!min-h-[52px] border rounded py-2 px-3 mb-3 bg-[#F4F6F7] flex items-center gap-3">
        {responseChoose?.map((item) => (
          <Tooltip key={item?.value} title="Remove">
            <div
              className="bg-[#EDF4FE] min-w-[60px] border-[#3391D6] border rounded px-3 py-2 cursor-pointer"
              onClick={() => {
                setResponseChoose((prev) => prev.filter((i) => i?.value !== item?.value));
              }}
              role="presentation"
            >
              <p className="text-[13px] text-[#3391D6] font-bold text-center h-4 leading-4">{item?.label as string}</p>
            </div>
          </Tooltip>
        ))}
        {responseChoose?.length === 0 && <p className="">Answer</p>}
      </div>
      <div className="flex items-center gap-3">
        {choicesOptions
          ?.filter((item) => !responseChoose?.map((i) => i?.value)?.includes(item?.value))
          ?.map((item) => (
            <Tooltip key={item?.value} title="Add to answer">
              <div
                className="bg-[#EDF4FE] min-w-[60px] border-[#3391D6] border rounded px-3 py-2 cursor-pointer"
                onClick={() => {
                  setResponseChoose((prev) => prev.concat([item as SelectType]));
                }}
                role="presentation"
              >
                <p className="text-[13px] text-[#3391D6] font-bold text-center h-4 leading-4">
                  {item?.label as string}
                </p>
              </div>
            </Tooltip>
          ))}
      </div>
    </div>
  );
};

ArrangeQuestion.defaultProps = {
  isPractice: false,
};

export default ArrangeQuestion;
