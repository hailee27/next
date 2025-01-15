/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from 'react';
import { Input, Modal, Popover, Spin, Table } from 'antd';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { MoreOutlined, SendOutlined } from '@ant-design/icons';
import Link from 'next/link';

import {
  CommentType,
  useLazyGetAssignmentRankQuery,
  usePostAssignmentStartMutation,
} from '@/redux/endpoints/student/assignment';
import BasicButton from '@/components/common/forms/BasicButton';
import { handleConvertObjectToArray, handleGetReplaceMessingText } from '@/utils';
import { CreateUpdateDeleteResponse } from '@/redux/endpoints/teacher/student';
import {
  useDeleteStudentCommentMutation,
  usePostStudentCommentMutation,
  usePutStudentCommentMutation,
} from '@/redux/endpoints/student/comment';
import { RootState } from '@/redux/store';

interface PropsType {
  openModal: boolean;
  setOpenModal: (v: boolean) => void;
  idEdit: number;
}

const AssignmentRankModal = ({ openModal, setOpenModal, idEdit }: PropsType) => {
  const auth = useSelector((state: RootState) => state.auth);

  const [getDetail, { data, isFetching }] = useLazyGetAssignmentRankQuery();
  const [startAssignment, { data: dataList, isLoading }] = usePostAssignmentStartMutation();
  const [postComment, { isLoading: isLoadingPost }] = usePostStudentCommentMutation();
  const [deleteComment, { isLoading: isLoadingDelete }] = useDeleteStudentCommentMutation();
  const [updateComment, { isLoading: isLoadingComment }] = usePutStudentCommentMutation();

  const [commentList, setCommentList] = useState<CommentType[]>([]);
  const [comment, setComment] = useState<string>('');
  const [commentEdit, setCommentEdit] = useState<string>('');
  const [idEditComment, setIdEditComment] = useState<number>(0);

  useEffect(() => {
    if (idEdit) {
      getDetail({ assignmentId: idEdit });
      startAssignment({
        assignmentId: idEdit,
      });
    }
  }, [idEdit]);

  useEffect(() => {
    setCommentList(dataList?.result?.comments || []);
  }, [dataList]);

  const handleCancel = () => {
    setOpenModal(false);
  };

  const tableFormat = [
    {
      title: 'Answer Count',
      dataIndex: 'answerCount',
      render: (answerCount) => <div className="">{answerCount}</div>,
    },
    {
      title: 'mark',
      dataIndex: 'mark',
      render: (mark) => <div className="font-bold">{mark}</div>,
    },
  ];

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
    <Modal footer={null} onCancel={handleCancel} open={openModal} title="View Assignment Rank" width={1000}>
      <Spin spinning={isFetching || isLoading || isLoadingPost || isLoadingComment || isLoadingDelete}>
        <div className="mb-6">
          <Table
            bordered
            columns={tableFormat as any}
            dataSource={data?.result || []}
            loading={isFetching}
            locale={{
              emptyText: (
                <div>
                  <div className="text-[#80888F] font-bold pb-2">No data</div>
                </div>
              ),
            }}
            pagination={false}
            rowKey="id"
          />
        </div>

        <div className="grid grid-cols-1 gap-y-3">
          {dataList?.result?.questions?.map((item, index) => (
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
                      onChange={(e) => setCommentEdit(e.target.value)}
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
                      {item?.upload && (
                        <Link href={`${process.env.NEXT_PUBLIC_API_URL?.replace('api/v1', '')}${item.upload}`}>
                          <p className="underline ">{item.upload}</p>
                        </Link>
                      )}
                      <p className="">
                        {dayjs(item?.createdAt)
                          .subtract(7, 'hours')
                          .format('YYYY-MM-DD HH:mm')}
                      </p>
                    </div>
                  </div>
                )}

                {item?.student?.id === auth?.student?.id && !idEditComment && (
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
                      assignmentSessionId: dataList?.result?.response?.id || 0,
                    }).then((res) => {
                      if ((res as unknown as CreateUpdateDeleteResponse)?.data?.status) {
                        startAssignment({
                          assignmentId: idEdit,
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

        <div className="gap-x-3 flex items-center justify-end mt-2">
          <BasicButton onClick={() => handleCancel()} styleType="rounded">
            Close
          </BasicButton>
        </div>
      </Spin>
    </Modal>
  );
};

export default AssignmentRankModal;
