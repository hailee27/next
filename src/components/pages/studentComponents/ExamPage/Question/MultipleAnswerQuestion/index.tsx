import React from 'react';
import { Checkbox, Form, Space } from 'antd';

import { QuestionBankType } from '@/redux/endpoints/teacher/questionBank';
import { handleConvertObjectToArray } from '@/utils';
import { useExamContext } from '@/context/ExamContext';
import { AnswerSubmitType, useSaveAssignmentQuestionMutation } from '@/redux/endpoints/student/assignment';

interface PropsType {
  question: QuestionBankType;
  index: number;
  setAnswerSubmit: React.Dispatch<React.SetStateAction<AnswerSubmitType[]>>;
}

const MultipleAnswerQuestion = ({ question, index, setAnswerSubmit }: PropsType) => {
  const { assignmentSessionId } = useExamContext();
  const [saveAssignmentQuestion] = useSaveAssignmentQuestionMutation();

  const choices = handleConvertObjectToArray(JSON.parse(question?.choices || '{}'));
  const choicesOptions = (choices || [])?.map((item, key) => ({ value: key + 1, label: item || '' }));

  const answer = question?.answer ? JSON.parse(question?.answer) : [];

  return (
    <div>
      <p className="font-semibold mb-4">
        Question {index}: <span className="">{question?.body}</span>?
      </p>
      <Form.Item
        initialValue={answer}
        label=""
        name={[index, 'multiple']}
        // rules={[{ required: true, message: 'Please choose answer!' }]}
      >
        <Checkbox.Group
          onChange={(e) => {
            const value = e;
            setAnswerSubmit(
              (prev) =>
                prev?.map((item) => {
                  if (item?.id === question?.id) {
                    return {
                      ...item,
                      answer: value,
                    };
                  }
                  return item;
                })
            );
            saveAssignmentQuestion({
              assignmentSessionId,
              answers: {
                [`${question?.id || 0}`]: value,
              },
            });
          }}
        >
          <Space direction="vertical">
            {choicesOptions?.map((item) => (
              <Checkbox key={item?.value} value={item?.value}>
                {item?.label as string}
              </Checkbox>
            ))}
          </Space>
        </Checkbox.Group>
      </Form.Item>
    </div>
  );
};

export default MultipleAnswerQuestion;
