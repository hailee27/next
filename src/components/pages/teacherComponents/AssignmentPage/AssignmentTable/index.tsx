/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable max-lines-per-function */
import React, { useEffect, useState } from 'react';
import { Button, message, Popconfirm, Table } from 'antd';
import dayjs from 'dayjs';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import BasicButton from '@/components/common/forms/BasicButton';
import {
  AssignmentSearchObj,
  DeleteAssignmentResponse,
  useDeleteAssignmentMutation,
  useLazyGetListAssignmentQuery,
} from '@/redux/endpoints/teacher/assignment';
import CustomPagination from '@/components/common/CustomPagination';

import CreateOrEditAssignment from '../Modal/CreateOrEditAssignment';
import ViewQuestionListModal from '../Modal/ViewQuestionListModal';

interface PropsType {
  objSearch: AssignmentSearchObj;
}

const AssignmentTable = ({ objSearch }: PropsType) => {
  const [getList, { data, isFetching }] = useLazyGetListAssignmentQuery();
  const [deleteAssignment] = useDeleteAssignmentMutation();

  const [page, setPage] = useState<number>(1);
  const [idEdit, setIdEdit] = useState(0);
  const [openCreateOrEditModal, setOpenCreateOrEditModal] = useState<boolean>(false);
  const [openViewQuestionList, setOpenViewQuestionList] = useState<boolean>(false);

  useEffect(() => {
    if (objSearch?.classId) {
      getList({
        limit: 20,
        page,
        classId: Number(objSearch?.classId || 0),
        createdAt: objSearch?.createdAt,
      });
    }
  }, [page]);

  useEffect(() => {
    if (objSearch?.classId) {
      if (page !== 1) {
        setPage(1);
      } else {
        getList({
          limit: 20,
          page,
          classId: Number(objSearch?.classId || 0),
          createdAt: objSearch?.createdAt,
        });
      }
    }
  }, [objSearch]);

  const handleGetFirstPage = () => {
    getList({
      limit: 20,
      page: 1,
      classId: Number(objSearch?.classId || 0),
      createdAt: objSearch?.createdAt,
    });
  };

  const tableFormat = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (name) => <div className="font-bold">{name}</div>,
    },
    {
      title: 'Total Mark',
      dataIndex: 'totalMark',
      render: (totalMark) => <div className="">{totalMark}</div>,
    },
    {
      title: 'Time Allow',
      dataIndex: 'timeAllow',
      render: (timeAllow) => <div className="">{(timeAllow / 60).toFixed(2)} h</div>,
    },
    {
      title: 'Time Start',
      width: 200,
      dataIndex: 'timeStart',
      render: (timeStart) => <div className="">{dayjs(timeStart).format('DD-MM-YYYY HH:mm')}</div>,
    },
    {
      title: 'Time End',
      width: 200,
      dataIndex: 'timeEnd',
      render: (timeEnd) => <div className="">{dayjs(timeEnd).format('DD-MM-YYYY HH:mm')}</div>,
    },
    {
      title: '',
      dataIndex: 'moreAction',
      width: 50,
      render: (_, record) => (
        <div className="flex items-center gap-x-1">
          <Button
            onClick={() => {
              setIdEdit(record?.id || 0);
              setOpenViewQuestionList(true);
            }}
            type="primary"
          >
            Question List
          </Button>
          <Button
            className="flex items-center"
            onClick={() => {
              setIdEdit(record?.id);
              setOpenCreateOrEditModal(true);
            }}
            type="default"
          >
            <EditOutlined />
          </Button>
          <Popconfirm
            cancelText="No"
            okText="Yes"
            onConfirm={() => {
              deleteAssignment({ id: record?.id }).then((res) => {
                if ((res as unknown as DeleteAssignmentResponse)?.data?.status) {
                  message.success('Xoá assignment thành công');
                  handleGetFirstPage();
                } else {
                  message.success('Xảy ra lỗi khi xoá assignment');
                }
              });
            }}
            placement="topLeft"
            title="Are you sure to delete this record?"
          >
            <Button className="flex items-center" danger>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between px-6 h-[64px] shadow-inner bg-[#F4F6F7]">
        <p className="text-[18px] leading-[22px] font-bold text-[#000]">Assignment List</p>
        <div className="flex items-center gap-x-4">
          {objSearch?.classId && (
            <BasicButton
              className="text-[13px] font-[700] text-[#fff] !bg-[#2F2F2F]"
              onClick={() => {
                setOpenCreateOrEditModal(true);
                setIdEdit(0);
              }}
              styleType="rounded"
            >
              Add Assignment
            </BasicButton>
          )}
        </div>
      </div>
      <div className="shadow-xl pb-6">
        <div className="flex-1">
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
          {Number(data?.metadata?.total) > 0 && (
            <CustomPagination
              onBackPage={() => {
                setPage?.((page || 0) - 1);
              }}
              onNextPage={() => {
                setPage?.((page || 0) + 1);
              }}
              onSelectPageSize={(e) => {
                console.log('e', e);
              }}
              page={page || 0}
              pageSize={20}
              total={Number(data?.metadata?.total)}
            />
          )}
        </div>
      </div>

      {openCreateOrEditModal && (
        <CreateOrEditAssignment
          classId={objSearch?.classId || 0}
          getList={() => {
            handleGetFirstPage();
          }}
          idEdit={idEdit}
          openModal={openCreateOrEditModal}
          setOpenModal={setOpenCreateOrEditModal}
        />
      )}

      {openViewQuestionList && (
        <ViewQuestionListModal
          assignmentId={idEdit}
          openModal={openViewQuestionList}
          setOpenModal={setOpenViewQuestionList}
        />
      )}
    </>
  );
};

export default AssignmentTable;
