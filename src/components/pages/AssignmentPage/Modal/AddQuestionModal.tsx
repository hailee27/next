import React, { useEffect, useState } from 'react';
import { Checkbox, message, Modal, Spin } from 'antd';

import BasicButton from '@/components/common/forms/BasicButton';
import {
  PostQuestionAssignmentResponse,
  usePostQuestionAssignmentMutation,
} from '@/redux/endpoints/teacher/assignment';
import { QuestionBankType, useLazyGetListQuestionBankQuery } from '@/redux/endpoints/teacher/questionBank';
import { useLazyGetQuestionAssignmentQuery } from '@/redux/endpoints/teacher/question';

interface PropsType {
  openModal: boolean;
  setOpenModal: (v: boolean) => void;
  assignmentId: number;
}

const AddQuestionModal = ({ openModal, setOpenModal, assignmentId }: PropsType) => {
  const [getList, { data, isFetching }] = useLazyGetListQuestionBankQuery();
  const [postQuestionToAssignment, { isLoading }] = usePostQuestionAssignmentMutation();
  const [getListQuestion, { data: questionAssignment, isFetching: isFetchingQuestionAssignment }] =
    useLazyGetQuestionAssignmentQuery();

  useEffect(() => {
    if (assignmentId) {
      getListQuestion({
        assignmentId,
      });
    }
  }, [assignmentId, openModal]);

  const [questionSelected, setQuestionSelected] = useState<QuestionBankType[]>([]);

  const handleGetQuestionBank = () => {
    getList({ page: 1, limit: 100 });
  };

  useEffect(() => {
    handleGetQuestionBank();
  }, []);

  const handleCancel = () => {
    setOpenModal(false);
    setQuestionSelected([]);
  };

  const handleAddQuestionToAssignment = () => {
    postQuestionToAssignment({ assignmentId, questions: questionSelected }).then((res) => {
      if ((res as unknown as PostQuestionAssignmentResponse)?.data?.status) {
        message.success('Thêm câu hỏi vào assignment thành công');
        handleCancel();
      } else {
        message.error((res as unknown as { error: PostQuestionAssignmentResponse })?.error?.data?.message);
      }
    });
  };

  const questionAssignmentAdded = questionAssignment?.result?.map((item) => item?.questionBankId);

  return (
    <Modal footer={null} onCancel={handleCancel} open={openModal} title="Add Question To Assignment" width={800}>
      <Spin spinning={isFetching || isFetchingQuestionAssignment || isLoading}>
        <div className="grid grid-cols-1 gap-y-4">
          {data?.result
            ?.filter((item) => !questionAssignmentAdded?.includes(item?.id))
            ?.map((item) => (
              <div className="flex gap-x-3" key={item?.id}>
                <Checkbox
                  checked={!!questionSelected?.find((i) => i?.questionBankId === item?.id)?.questionBankId}
                  onClick={() => {
                    if (!questionSelected?.find((i) => i?.questionBankId === item?.id)?.questionBankId) {
                      setQuestionSelected((prev) => prev.concat([{ ...item, questionBankId: item?.id }]));
                    } else {
                      setQuestionSelected((prev) => prev.filter((i) => i?.questionBankId !== item?.id));
                    }
                  }}
                />
                <p className="">{item?.body}</p>
              </div>
            ))}
        </div>
        <div className="gap-x-3 flex items-center justify-end mt-2">
          <BasicButton onClick={() => handleCancel()} styleType="rounded">
            Cancel
          </BasicButton>
          <BasicButton
            className="text-[13px] font-[700] text-[#fff] !bg-[#2F2F2F]"
            onClick={() => {
              handleAddQuestionToAssignment();
            }}
            styleType="rounded"
          >
            Save
          </BasicButton>
        </div>
      </Spin>
    </Modal>
  );
};

export default AddQuestionModal;
