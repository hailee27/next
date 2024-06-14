import { message, Modal, Spin } from 'antd';
import React, { useEffect, useState } from 'react';

import BasicButton from '@/components/common/forms/BasicButton';
import { handleConvertObjectToArray, handleGetReplaceMessingText } from '@/utils';
import {
  DeleteQuestionDetailAssignmentResponse,
  useDeleteQuestionAssignmentMutation,
  useLazyGetQuestionAssignmentQuery,
} from '@/redux/endpoints/teacher/question';

import AddQuestionModal from './AddQuestionModal';
import { useLazyGetDetailAssignmentQuery } from '@/redux/endpoints/teacher/assignment';

interface PropsType {
  openModal: boolean;
  setOpenModal: (v: boolean) => void;
  assignmentId: number;
}

const ViewQuestionListModal = ({ openModal, setOpenModal, assignmentId }: PropsType) => {
  const [getList, { data: questionAssignment, isFetching: isFetchingQuestionAssignment }] =
    useLazyGetQuestionAssignmentQuery();
  const [deleteQuestion] = useDeleteQuestionAssignmentMutation();
  const [getDetail, { data, isFetching }] = useLazyGetDetailAssignmentQuery();

  const [openAddQuestion, setOpenAddQuestion] = useState<boolean>(false);

  useEffect(() => {
    if (assignmentId) {
      getList({
        assignmentId,
      });
      getDetail({ id: assignmentId });
    }
  }, [assignmentId, openModal]);

  const handleCancel = () => {
    setOpenModal(false);
  };

  const totalMark = Number(data?.result?.assignment?.totalMark);

  console.log('totalMark', totalMark);

  return (
    <Modal footer={null} onCancel={handleCancel} open={openModal} title="View Question List" width={800}>
      <Spin spinning={isFetchingQuestionAssignment}>
        {(questionAssignment?.result || [])?.length < totalMark && (
          <div className="flex justify-end my-4">
            <BasicButton
              className="text-[13px] font-[700] text-[#fff] !bg-[#2F2F2F]"
              onClick={() => {
                setOpenAddQuestion(true);
              }}
              styleType="rounded"
            >
              Add Question
            </BasicButton>
          </div>
        )}
        <div className="uppercase font-bold mb-4">Maximum number of questions: {totalMark}</div>
        <div className="grid grid-cols-1 gap-y-3">
          {questionAssignment?.result?.map((item, index) => (
            <div className="border-b pb-2" key={item?.id}>
              <div className="flex items-center justify-between ">
                <p className="uppercase text-[13px] font-[700]">question {index + 1}:</p>
                <BasicButton
                  className="text-[11px] font-bold uppercase text-[#E11D48]"
                  onClick={() => {
                    deleteQuestion({ id: Number(item?.id) }).then((res) => {
                      if ((res as unknown as DeleteQuestionDetailAssignmentResponse)?.data?.status) {
                        message.success('Xoá câu hỏi thành công');
                        getList({
                          assignmentId,
                        });
                      } else {
                        message.success('Xảy ra lỗi khi xoá câu hỏi');
                      }
                    });
                  }}
                  styleType="text"
                  type="dashed"
                >
                  Delete
                </BasicButton>
              </div>
              <p className="text-[14px] font-bold">{handleGetReplaceMessingText(item?.body || '')}</p>
              <div className="">
                {handleConvertObjectToArray(JSON.parse(item?.choices || '{}'))?.map((choice, i) => (
                  <p className="">
                    <span className="uppercase text-[11px] font-bold">choice {i + 1}:</span> {(choice as string) || ''}
                  </p>
                ))}
              </div>
            </div>
          ))}
          {questionAssignment?.result?.length === 0 && <p className="text-center">No data</p>}
        </div>
        <div className="gap-x-3 flex items-center justify-end mt-2">
          <BasicButton onClick={() => handleCancel()} styleType="rounded">
            Close
          </BasicButton>
        </div>

        {openAddQuestion && (
          <AddQuestionModal
            assignmentId={assignmentId}
            totalQuestionAllowAdd={totalMark - (questionAssignment?.result || [])?.length}
            getListQuestionPopup={() => {
              getList({
                assignmentId,
              });
            }}
            openModal={openAddQuestion}
            setOpenModal={setOpenAddQuestion}
          />
        )}
      </Spin>
    </Modal>
  );
};

export default ViewQuestionListModal;
