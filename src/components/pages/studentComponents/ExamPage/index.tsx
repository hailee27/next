import React, { useEffect, useState } from 'react';
import { Form, message, Spin } from 'antd';
import { useRouter } from 'next/router';

import {
  AnswerSubmitType,
  SubmitAssignmentQuestionResponse,
  usePostAssignmentStartMutation,
  useSubmitAssignmentQuestionMutation,
} from '@/redux/endpoints/student/assignment';
import BasicButton from '@/components/common/forms/BasicButton';
import { QuestionBankType } from '@/redux/endpoints/teacher/questionBank';
import { useExamContext } from '@/context/ExamContext';
import { handleConvertAnswerArrayToObject, handleGetQuestionAnswerData } from '@/utils';

import Question from './Question';
import TimeLeft from './TimeLeft';

const ExamComponents = () => {
  const [form] = Form.useForm();
  const { query, push } = useRouter();
  const { setAssignmentSessionId, assignmentSessionId } = useExamContext();

  const [getList, { data, isLoading }] = usePostAssignmentStartMutation();
  const [submitAssignment, { isLoading: isLoadingSubmit }] = useSubmitAssignmentQuestionMutation();

  const [questions, setQuestions] = useState<QuestionBankType[]>([]);
  const [answerSubmit, setAnswerSubmit] = useState<AnswerSubmitType[]>([]);

  useEffect(() => {
    if (query?.id) {
      getList({
        assignmentId: Number(query?.id as string),
      });
    }
  }, [query?.id]);

  useEffect(() => {
    setAssignmentSessionId(data?.result?.session?.id || 0);
    if (!isLoading) {
      if ((data?.result.questions || [])?.length > 0) {
        const questionData = data?.result?.questions || [];
        const questionAnswerData = handleGetQuestionAnswerData(data?.result?.questions || []);
        setAnswerSubmit(questionAnswerData);
        setQuestions(questionData);
      }
    }
  }, [data, isLoading]);

  return (
    <div className="flex gap-x-6">
      <div className="shadow-lg bg-[#fff] rounded p-6 flex-1">
        <Spin spinning={isLoading || isLoadingSubmit}>
          <Form
            autoComplete="off"
            form={form}
            layout="vertical"
            name="class"
            onFinish={() => {
              const submitData = {
                assignmentSessionId,
                answers: handleConvertAnswerArrayToObject(answerSubmit),
              };
              submitAssignment(submitData).then((res) => {
                if ((res as unknown as SubmitAssignmentQuestionResponse)?.data?.status) {
                  message.success('Nộp bài thành công');
                  form.resetFields();
                  push('/student/assignment');
                } else {
                  message.error((res as unknown as { error: SubmitAssignmentQuestionResponse })?.error?.data?.message);
                }
              });
            }}
            scrollToFirstError
          >
            <Form.List name="answers">
              {() => (
                <div className="grid grid-cols-1 gap-y-5">
                  {questions?.map((item, index) => (
                    <Question index={index + 1} key={item?.id} question={item} setAnswerSubmit={setAnswerSubmit} />
                  ))}
                </div>
              )}
            </Form.List>

            <div className="gap-x-3 flex items-center justify-end mt-2">
              <BasicButton
                className="text-[13px] font-[700] text-[#fff] !bg-[#2F2F2F]"
                htmlType="submit"
                styleType="rounded"
              >
                Submit
              </BasicButton>
            </div>
          </Form>
        </Spin>
      </div>
      <div className="w-[200px] shadow-lg bg-[#fff] rounded p-6 h-fit">
        <TimeLeft
          onSubmit={() => {
            form.submit();
          }}
          timeEnd={data?.result?.session?.assignment?.timeEnd || ''}
        />
      </div>
    </div>
  );
};

export default ExamComponents;
