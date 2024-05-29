import React, { useEffect, useState } from 'react';
import { Radio } from 'antd';

import { QuestionBankType } from '@/redux/endpoints/teacher/questionBank';
import { handleConvertObjectToArray } from '@/utils';
import { AnswerSubmitType, useSaveAssignmentQuestionMutation } from '@/redux/endpoints/student/assignment';
import { useExamContext } from '@/context/ExamContext';

interface TrueFalseType {
  index: number;
  value: number | null;
}
interface PropsType {
  question: QuestionBankType;
  index: number;
  setAnswerSubmit: React.Dispatch<React.SetStateAction<AnswerSubmitType[]>>;
}

const TrueOrFalseQuestion = ({ question, index, setAnswerSubmit }: PropsType) => {
  const { assignmentSessionId } = useExamContext();
  const [saveAssignmentQuestion] = useSaveAssignmentQuestionMutation();

  const choices = handleConvertObjectToArray(JSON.parse(question?.choices || '{}'));
  const choicesOptions = (choices || [])?.map((item, key) => ({ value: key + 1, label: item || '' }));

  const [dataSelected, setDataSelected] = useState<TrueFalseType[]>(
    choicesOptions?.map((_, idex) => ({ index: idex, value: null }))
  );

  useEffect(() => {
    const answer = question?.answer ? JSON.parse(question?.answer) : [];

    if (answer?.length > 0) {
      setDataSelected(
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
        Question {index}: <span className="">{question?.body}</span>?
      </p>
      <div className="grid grid-cols-1 gap-y-4">
        {choicesOptions?.map((i, idex) => (
          <div className="flex items-center gap-x-4" key={i?.value}>
            <p className="text-[12px] font-medium">{i?.label as string}</p>
            <Radio.Group
              onChange={(e) => {
                const dataChange = dataSelected?.map((item) => {
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
                setDataSelected(dataChange);
              }}
              options={[
                { value: 1, label: 'True' },
                { value: 2, label: 'false' },
              ]}
              value={dataSelected?.find((item) => item?.index === idex)?.value}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrueOrFalseQuestion;
