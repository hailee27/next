import React from 'react';
import { Form } from 'antd';

import BasicArea from '@/components/common/forms/BasicArea';
import { QuestionBankType } from '@/redux/endpoints/teacher/questionBank';
import { useExamContext } from '@/context/ExamContext';
import { AnswerSubmitType, useSaveAssignmentQuestionMutation } from '@/redux/endpoints/student/assignment';

interface PropsType {
  question: QuestionBankType;
  index: number;
  setAnswerSubmit: React.Dispatch<React.SetStateAction<AnswerSubmitType[]>>;
}

const WriteEssayQuestion = ({ question, index, setAnswerSubmit }: PropsType) => {
  const { assignmentSessionId } = useExamContext();
  const [saveAssignmentQuestion] = useSaveAssignmentQuestionMutation();

  const answer = question?.answer ? JSON.parse(question?.answer) : '';

  return (
    <div>
      <p className="font-semibold mb-4">
        Question {index}: <span className="">{question?.body}</span>
      </p>

      <Form.Item
        initialValue={answer}
        label=""
        name={[index, 'essay']}
        // rules={[{ required: true, message: 'Please input essay!' }]}
      >
        <BasicArea
          onBlur={(e) => {
            const { value } = e.target;
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
          placeholder="Essay"
          rows={8}
        />
      </Form.Item>
    </div>
  );
};

export default WriteEssayQuestion;
