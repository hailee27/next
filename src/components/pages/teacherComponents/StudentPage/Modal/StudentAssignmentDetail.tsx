/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { MoreOutlined, SendOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Popover, Spin, Upload } from 'antd';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

import {
  useDeleteTeacherCommentMutation,
  usePostTeacherCommentMutation,
  usePutTeacherCommentMutation,
} from '@/redux/endpoints/teacher/comment';
import { CreateUpdateDeleteResponse, useLazyGetDetailAssignmentStudentQuery } from '@/redux/endpoints/teacher/student';
import { handleConvertObjectToArray, handleGetReplaceMessingText } from '@/utils';
import { CommentType } from '@/redux/endpoints/student/assignment';
import { RootState } from '@/redux/store';

interface PropsType {
  studentId: number;
  assignmentId: number;
  assignmentSessionId: number;
  open: boolean;
  setOpen: (v: boolean) => void;
}

const StudentAssignmentDetail = ({ studentId, assignmentId, assignmentSessionId, open, setOpen }: PropsType) => {
  const auth = useSelector((state: RootState) => state.auth);

  const [getDetail, { data, isFetching }] = useLazyGetDetailAssignmentStudentQuery();
  const [postComment, { isLoading: isLoadingPost }] = usePostTeacherCommentMutation();
  const [deleteComment, { isLoading: isLoadingDelete }] = useDeleteTeacherCommentMutation();
  const [updateComment, { isLoading: isLoadingComment }] = usePutTeacherCommentMutation();

  const [file, setFile] = useState<any>();
  const [commentList, setCommentList] = useState<CommentType[]>([]);
  const [comment, setComment] = useState<string>('');
  const [commentEdit, setCommentEdit] = useState<string>('');
  const [idEditComment, setIdEditComment] = useState<number>(0);

  useEffect(() => {
    if (assignmentId && studentId) {
      getDetail({
        studentId,
        assignmentId,
      });
    }
  }, [studentId, assignmentId]);

  useEffect(() => {
    setCommentList(data?.result?.comments || []);
  }, [data]);

  const handleCancel = () => {
    setOpen(false);
  };

  const handleDeleteComment = (id: number) => {
    deleteComment({
      id,
    }).then((res) => {
      if ((res as CreateUpdateDeleteResponse)?.data?.status) {
        setCommentList((prev) => prev?.filter((item) => item?.id !== id));
      }
    });
  };

  return (
    <Modal footer={null} onCancel={handleCancel} open={open} title="View Assignment List" width={1000}>
      <Spin spinning={isFetching || isLoadingPost || isLoadingComment || isLoadingDelete}>
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
          {commentList?.map((item) => (
            <div className="pb-2" key={item?.id}>
              <div className="flex justify-between">
                {idEditComment === item?.id && (
                  <div className="flex gap-x-5 justify-between items-center">
                    <Input
                      className="flex-1"
                      onChange={(e) => {
                        setCommentEdit(e.target.value);
                      }}
                      placeholder="comment"
                      value={commentEdit}
                    />
                    <div className="w-[20px]">
                      <SendOutlined
                        className="cursor-pointer"
                        onClick={() => {
                          if (commentEdit?.length > 0) {
                            updateComment({
                              body: commentEdit,
                              id: idEditComment || 0,
                            }).then((res) => {
                              if ((res as unknown as CreateUpdateDeleteResponse)?.data?.status) {
                                setCommentList(
                                  (prev) =>
                                    prev?.map((i) => {
                                      if (i?.id === idEditComment) {
                                        return {
                                          ...i,
                                          body: commentEdit,
                                        };
                                      }
                                      return i;
                                    })
                                );
                                setCommentEdit('');
                                setIdEditComment(0);
                              }
                            });
                          }
                        }}
                      />
                    </div>
                  </div>
                )}

                {idEditComment !== item?.id && (
                  <div className="flex gap-x-2">
                    <div className="rounded-full h-8 w-8 border flex items-center justify-center uppercase text-[11px] font-bold">
                      {(item?.teacher?.name || item?.student?.name || '').slice(0, 2)}
                    </div>
                    <div className="text-[12px]">
                      <p className="">{item?.body}</p>
                      <p className="">
                        {dayjs(item?.createdAt)
                          .subtract(7, 'hours')
                          .format('YYYY-MM-DD HH:mm')}
                      </p>
                    </div>
                  </div>
                )}

                {item?.teacher?.id === auth?.teacher?.id && !idEditComment && (
                  <div className="cursor-pointer">
                    <Popover
                      arrow={false}
                      content={
                        <div>
                          <div
                            className="w-[80px] p-1 pb-3 cursor-pointer flex justify-between hover:text-[#1D92E8]"
                            onClick={() => {
                              setIdEditComment(item?.id);
                              setCommentEdit(item?.body);
                            }}
                            role="presentation"
                          >
                            Edit
                          </div>
                          <div
                            className="w-[80px] p-1 cursor-pointer flex justify-between  hover:text-[#1D92E8]"
                            onClick={() => {
                              handleDeleteComment(item?.id);
                            }}
                            role="presentation"
                          >
                            Delete
                          </div>
                        </div>
                      }
                      placement="bottomLeft"
                      title=""
                      trigger="click"
                    >
                      <MoreOutlined />
                    </Popover>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div>
            <Upload data={file} fileList={file} maxCount={1} onChange={(e) => setFile(e.fileList as any)}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </div>
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
                      assignmentSessionId,
                      document: file?.[0]?.originFileObj,
                    }).then((res) => {
                      if ((res as unknown as CreateUpdateDeleteResponse)?.data?.status) {
                        getDetail({
                          studentId,
                          assignmentId,
                        });
                        setComment('');
                        setFile([]);
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
