import React, { useEffect, useState } from 'react';
import { Checkbox, message, Modal, Spin } from 'antd';

import BasicButton from '@/components/common/forms/BasicButton';
import { PostQuestionAssignmentResponse, usePostQuestionAssignmentMutation } from '@/redux/endpoints/assignment';
import { QuestionBankType, useLazyGetListQuestionBankQuery } from '@/redux/endpoints/questionBank';
import { useGetQuestionAssignmentQuery } from '@/redux/endpoints/question';

interface PropsType {
  openModal: boolean;
  setOpenModal: (v: boolean) => void;
  assignmentId: number;
}

const AddQuestionModal = ({ openModal, setOpenModal, assignmentId }: PropsType) => {
  const [getList, { data, isFetching }] = useLazyGetListQuestionBankQuery();
  const [postQuestionToAssignment, { isLoading }] = usePostQuestionAssignmentMutation();
  const { data: questionAssignment, isFetching: isFetchingQuestionAssignment } = useGetQuestionAssignmentQuery({
    assignmentId,
  });

  const [questionSelected, setQuestionSelected] = useState<QuestionBankType[]>([]);

  useEffect(() => {
    if ((questionAssignment?.result || [])?.length > 0) {
      setQuestionSelected(questionAssignment?.result || []);
    }
  }, [questionAssignment]);

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

  return (
    <Spin spinning={isFetching || isFetchingQuestionAssignment || isLoading}>
      <Modal footer={null} onCancel={handleCancel} open={openModal} title="Add Question To Assignment" width={800}>
        <div className="grid grid-cols-1 gap-y-4">
          {data?.result?.map((item) => (
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
      </Modal>
    </Spin>
  );
};

export default AddQuestionModal;
