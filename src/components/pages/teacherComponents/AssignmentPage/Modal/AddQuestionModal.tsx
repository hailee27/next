import React, { useEffect, useState } from 'react';
import { Checkbox, message, Modal, Spin } from 'antd';

import BasicButton from '@/components/common/forms/BasicButton';
import {
  PostQuestionAssignmentResponse,
  usePostQuestionAssignmentMutation,
} from '@/redux/endpoints/teacher/assignment';
import { QuestionBankType, useLazyGetListQuestionBankQuery } from '@/redux/endpoints/teacher/questionBank';
import { useLazyGetQuestionAssignmentQuery } from '@/redux/endpoints/teacher/question';
import { handleGetReplaceMessingText } from '@/utils';

import CreateOrEditQuestionBank from '../../QuestionBankPage/Modal/CreateOrEditQuestionBank';

interface PropsType {
  openModal: boolean;
  setOpenModal: (v: boolean) => void;
  assignmentId: number;
  getListQuestionPopup: () => void;
}

const AddQuestionModal = ({ openModal, setOpenModal, assignmentId, getListQuestionPopup }: PropsType) => {
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
  const [openCreateQuestionModal, setOpenCreateQuestionModal] = useState<boolean>(false);

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
        getListQuestionPopup();
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
        <div className="flex justify-end my-4">
          <BasicButton
            className="text-[13px] font-[700] text-[#fff] !bg-[#2F2F2F]"
            onClick={() => {
              setOpenCreateQuestionModal(true);
            }}
            styleType="rounded"
          >
            Add New Question
          </BasicButton>
        </div>

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
                <p className="">{handleGetReplaceMessingText(item?.body || '')}</p>
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

        {openCreateQuestionModal && (
          <CreateOrEditQuestionBank
            getList={handleGetQuestionBank}
            idEdit={0}
            openModal={openCreateQuestionModal}
            setOpenModal={setOpenCreateQuestionModal}
          />
        )}
      </Spin>
    </Modal>
  );
};

export default AddQuestionModal;
