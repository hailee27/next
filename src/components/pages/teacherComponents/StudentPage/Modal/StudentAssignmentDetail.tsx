import { SendOutlined } from '@ant-design/icons';
import { Input, Modal, Spin } from 'antd';
import React, { useEffect, useState } from 'react';

import { usePostTeacherCommentMutation } from '@/redux/endpoints/teacher/comment';
import { CreateUpdateDeleteResponse, useLazyGetDetailAssignmentStudentQuery } from '@/redux/endpoints/teacher/student';
import { handleConvertObjectToArray, handleGetReplaceMessingText } from '@/utils';

interface PropsType {
  studentId: number;
  assignmentId: number;
  open: boolean;
  setOpen: (v: boolean) => void;
}

const StudentAssignmentDetail = ({ studentId, assignmentId, open, setOpen }: PropsType) => {
  const [getDetail, { data, isFetching }] = useLazyGetDetailAssignmentStudentQuery();
  const [postComment] = usePostTeacherCommentMutation();
  const [comment, setComment] = useState<string>('');

  useEffect(() => {
    if (assignmentId && studentId) {
      getDetail({
        studentId,
        assignmentId,
      });
    }
  }, [studentId, assignmentId]);

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Modal footer={null} onCancel={handleCancel} open={open} title="View Assignment List" width={1000}>
      <Spin spinning={isFetching}>
        <div className="grid grid-cols-1 gap-y-3">
          {data?.result?.questions?.map((item, index) => (
            <div className="border-b pb-2" key={item?.id}>
              <div className="flex items-center justify-between ">
                <p className="uppercase text-[13px] font-[700]">question {index + 1}:</p>
                {item?.isCorrect && <p className="uppercase text-[11px] font-bold text-[#49AE59]">Correct</p>}
                {!item?.isCorrect && <p className="uppercase text-[11px] font-bold text-[#E11D48]">Wrong</p>}
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
        </div>

        <div className="my-8 uppercase font-bold text-[14px]">Comment</div>
        <div className="grid grid-cols-1 gap-y-3">
          {/* {data?.result?.comment?.map((item, index) => (
            <div className="border-b pb-2" key={item?.id}>
              123
            </div>
          ))} */}
          <div className="flex gap-x-5 justify-between items-center">
            <Input
              className="flex-1"
              onChange={(e) => setComment(e.target.value)}
              placeholder="comment"
              value={comment}
            />
            <div className="w-[20px]">
              <SendOutlined
                className="cursor-pointer"
                onClick={() => {
                  if (comment?.length > 0) {
                    postComment({
                      body: comment,
                      assignmentSessionId: assignmentId,
                    }).then((res) => {
                      if ((res as unknown as CreateUpdateDeleteResponse)?.data?.status) {
                        getDetail({
                          studentId,
                          assignmentId,
                        });
                        setComment('');
                      }
                    });
                  }
                }}
              />
            </div>
          </div>
        </div>
      </Spin>
    </Modal>
  );
};

export default StudentAssignmentDetail;
