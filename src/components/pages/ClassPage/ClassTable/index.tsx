/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { message, Table } from 'antd';
import dayjs from 'dayjs';
import { MoreOutlined } from '@ant-design/icons';

import {
  ClassSearchObj,
  DeleteClassResponse,
  useDeleteClassMutation,
  useLazyGetListClassQuery,
} from '@/redux/endpoints/class';
import BasicPopover from '@/components/common/BasicPopover';
import BasicButton from '@/components/common/forms/BasicButton';
import CustomPagination from '@/components/common/CustomPagination';

import CreateOrEditClass from '../Modal/CreateOrEditClass';
import AddStudentModal from '../Modal/AddStudentModal';

interface PropsType {
  objSearch: ClassSearchObj;
}

const ClassTable = ({ objSearch }: PropsType) => {
  const [getList, { data, isFetching }] = useLazyGetListClassQuery();
  const [deleteClass] = useDeleteClassMutation();

  const [page, setPage] = useState<number>(1);
  const [classIdEdit, setClassIdEdit] = useState(0);
  const [openCreateOrEditModal, setOpenCreateOrEditModal] = useState<boolean>(false);
  const [openAddStudentModal, setOpenAddStudentModal] = useState<boolean>(false);

  const handleGetClass = () => {
    getList({ page: 1, limit: 20 });
  };

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

  useEffect(() => {
    handleGetClass();
  }, []);

  const tableFormat = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (name) => <div className="font-bold">{name}</div>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      render: (description) => <div className="">{description}</div>,
    },
    {
      title: 'Created At',
      width: 200,
      dataIndex: 'createdAt',
      render: (createdAt) => <div className="">{dayjs(createdAt).format('DD-MM-YYYY')}</div>,
    },
    {
      title: 'Updated At',
      width: 200,
      dataIndex: 'updatedAt',
      render: (updatedAt) => <div className="">{dayjs(updatedAt).format('DD-MM-YYYY')}</div>,
    },
    {
      title: '',
      dataIndex: 'moreAction',
      width: 50,
      render: (_, record) => (
        <div id="MoreOutlined">
          <BasicPopover
            content={
              <div>
                <BasicButton
                  className="flex flex-col w-full text-[#929292] hover:bg-[rgba(245,245,245,0.6)]"
                  onClick={() => {
                    setClassIdEdit(record?.id);
                    setOpenAddStudentModal(true);
                  }}
                  styleType="text"
                >
                  Add Student
                </BasicButton>
                <BasicButton
                  className="flex flex-col w-full text-[#929292] hover:bg-[rgba(245,245,245,0.6)]"
                  onClick={() => {
                    setClassIdEdit(record?.id);
                    setOpenCreateOrEditModal(true);
                  }}
                  styleType="text"
                >
                  Update
                </BasicButton>
                <BasicButton
                  className="flex flex-col w-full text-[#929292] hover:bg-[rgba(245,245,245,0.6)]"
                  onClick={() => {
                    deleteClass({ id: record?.id }).then((res) => {
                      if ((res as unknown as DeleteClassResponse)?.data?.status) {
                        message.success('Xoá lớp học thành công');
                        handleGetClass();
                      } else {
                        message.success('Xảy ra lỗi khi xoá lớp học');
                      }
                    });
                  }}
                  styleType="text"
                >
                  Delete
                </BasicButton>
              </div>
            }
            placement="left"
          >
            <MoreOutlined />
          </BasicPopover>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between px-6 h-[64px] shadow-inner bg-[#F4F6F7]">
        <p className="text-[18px] leading-[22px] font-bold text-[#000]">Class List</p>
        <div className="flex items-center gap-x-4">
          <BasicButton
            className="text-[13px] font-[700] text-[#fff] !bg-[#2F2F2F]"
            onClick={() => {
              setOpenCreateOrEditModal(true);
              setClassIdEdit(0);
            }}
            styleType="rounded"
          >
            Add Class
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
        <CreateOrEditClass
          classIdEdit={classIdEdit}
          getList={handleGetClass}
          openModal={openCreateOrEditModal}
          setOpenModal={setOpenCreateOrEditModal}
        />
      )}
      {openAddStudentModal && (
        <AddStudentModal classId={classIdEdit} openModal={openAddStudentModal} setOpenModal={setOpenAddStudentModal} />
      )}
    </>
  );
};

export default ClassTable;
