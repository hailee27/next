/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Button, message, Popconfirm, Table } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import CustomPagination from '@/components/common/CustomPagination';
import BasicButton from '@/components/common/forms/BasicButton';
import {
  DeleteStudentResponse,
  StudentSearchObj,
  useDeleteStudentMutation,
  useLazyGetListStudentQuery,
} from '@/redux/endpoints/teacher/student';

import CreateOrEditModal from '../Modal/CreateOrEditModal';
import AssignmentListModal from '../Modal/AssignmentListModal';

interface PropsType {
  objSearch: StudentSearchObj;
}

const StudentTable = ({ objSearch }: PropsType) => {
  const [getList, { data, isFetching }] = useLazyGetListStudentQuery();
  const [deleteStudent] = useDeleteStudentMutation();

  const [page, setPage] = useState<number>(1);
  const [idEdit, setIdEdit] = useState(0);
  const [openCreateOrEditModal, setOpenCreateOrEditModal] = useState<boolean>(false);
  const [openAssignmentListModal, setOpenAssignmentListModal] = useState<boolean>(false);

  const handleGetStudent = () => {
    getList({ page: 1, limit: 20 });
  };

  useEffect(() => {
    handleGetStudent();
  }, []);

  useEffect(() => {
    getList({
      limit: 20,
      page,
      ...objSearch,
    });
  }, [page]);

  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    } else {
      getList({
        limit: 20,
        page,
        ...objSearch,
      });
    }
  }, [objSearch]);

  const tableFormat = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (name) => <div className="font-bold">{name}</div>,
      width: 250,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: (email) => <div className="font-bold">{email}</div>,
      width: 150,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      render: (gender) => <div className="font-bold">{gender}</div>,
      width: 150,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      render: (address) => <div className="font-bold">{address}</div>,
      width: 400,
    },
    {
      title: 'Created At',
      width: 100,
      dataIndex: 'createdAt',
      render: (createdAt) => <div className="">{dayjs(createdAt).format('DD-MM-YYYY')}</div>,
    },
    {
      title: 'Updated At',
      width: 100,
      dataIndex: 'updatedAt',
      render: (updatedAt) => <div className="">{dayjs(updatedAt).format('DD-MM-YYYY')}</div>,
    },
    {
      title: '',
      dataIndex: 'moreAction',
      width: 50,
      render: (_, record) => (
        <div className="flex items-center gap-x-1">
          <Button
            onClick={() => {
              setIdEdit(record?.id);
              setOpenAssignmentListModal(true);
            }}
            type="primary"
          >
            Assignment List
          </Button>

          <Popconfirm
            cancelText="No"
            okText="Yes"
            onConfirm={() => {
              deleteStudent({ id: record?.id }).then((res) => {
                if ((res as unknown as DeleteStudentResponse)?.data?.status) {
                  message.success('Xoá học sinh thành công');
                  handleGetStudent();
                } else {
                  message.success('Xảy ra lỗi khi xoá học sinh');
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
        <p className="text-[18px] leading-[22px] font-bold text-[#000]">Student List</p>
        <div className="flex items-center gap-x-4">
          <BasicButton
            className="text-[13px] font-[700] text-[#fff] !bg-[#2F2F2F]"
            onClick={() => {
              setOpenCreateOrEditModal(true);
              setIdEdit(0);
            }}
            styleType="rounded"
          >
            Add Student
          </BasicButton>
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
        <CreateOrEditModal
          getList={handleGetStudent}
          idEdit={idEdit}
          openModal={openCreateOrEditModal}
          setOpenModal={setOpenCreateOrEditModal}
        />
      )}
      {openAssignmentListModal && (
        <AssignmentListModal
          idEdit={idEdit}
          openModal={openAssignmentListModal}
          setOpenModal={setOpenAssignmentListModal}
        />
      )}
    </>
  );
};

export default StudentTable;
