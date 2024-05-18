import { message, Modal, Spin } from 'antd';
import React, { useEffect } from 'react';

import BasicButton from '@/components/common/forms/BasicButton';
import {
  DeleteQuestionDetailAssignmentResponse,
  useDeleteQuestionAssignmentMutation,
  useLazyGetQuestionAssignmentQuery,
} from '@/redux/endpoints/question';
import { handleConvertObjectToArray } from '@/utils';

interface PropsType {
  openModal: boolean;
  setOpenModal: (v: boolean) => void;
  assignmentId: number;
}

const ViewQuestionListModal = ({ openModal, setOpenModal, assignmentId }: PropsType) => {
  const [getList, { data: questionAssignment, isFetching: isFetchingQuestionAssignment }] =
    useLazyGetQuestionAssignmentQuery();
  const [deleteQuestion] = useDeleteQuestionAssignmentMutation();

  useEffect(() => {
    if (assignmentId) {
      getList({
        assignmentId,
      });
    }
  }, [assignmentId]);

  const handleCancel = () => {
    setOpenModal(false);
  };

  return (
    <Spin spinning={isFetchingQuestionAssignment}>
      <Modal footer={null} onCancel={handleCancel} open={openModal} title="View Question List" width={800}>
        <div className="grid grid-cols-1 gap-y-3">
          {questionAssignment?.result?.map((item, index) => (
            <div className="" key={item?.id}>
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
              <p className="text-[14px] font-bold">{item?.body}</p>
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
      </Modal>
    </Spin>
  );
};

export default ViewQuestionListModal;
