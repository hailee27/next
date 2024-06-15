/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Button, message, Popconfirm, Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import CustomPagination from '@/components/common/CustomPagination';
import BasicButton from '@/components/common/forms/BasicButton';
import {
  DeleteQuestionBankResponse,
  QuestionBankSearchObj,
  useDeleteQuestionBankMutation,
  useLazyGetListQuestionBankQuery,
} from '@/redux/endpoints/teacher/questionBank';
import { handleGetReplaceMessingText } from '@/utils';

import CreateOrEditQuestionBank from '../Modal/CreateOrEditQuestionBank';

interface PropsType {
  objSearch: QuestionBankSearchObj;
}

const QuestionBankTable = ({ objSearch }: PropsType) => {
  const [getList, { data, isFetching }] = useLazyGetListQuestionBankQuery();
  const [deleteQuestionBank] = useDeleteQuestionBankMutation();

  const [page, setPage] = useState<number>(1);
  const [openCreateOrEditModal, setOpenCreateOrEditModal] = useState<boolean>(false);
  const [idEdit, setIdEdit] = useState(0);

  const handleGetQuestionBank = () => {
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
    handleGetQuestionBank();
  }, []);

  const tableFormat = [
    {
      title: 'Name',
      dataIndex: 'body',
      render: (body) => <div className="font-bold">{handleGetReplaceMessingText(body)}</div>,
    },
    {
      title: 'Instruction',
      dataIndex: 'instruction',
      render: (instruction) => <div className="font-bold">{instruction}</div>,
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
        <div className="flex items-center gap-x-1">
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
              deleteQuestionBank({ id: record?.id }).then((res) => {
                if ((res as unknown as DeleteQuestionBankResponse)?.data?.status) {
                  message.success('Xoá câu hỏi thành công');
                  handleGetQuestionBank();
                } else {
                  message.success('Xảy ra lỗi khi xoá câu hỏi');
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
        <p className="text-[18px] leading-[22px] font-bold text-[#000]">Question Bank List</p>
        <div className="flex items-center gap-x-4">
          <BasicButton
            className="text-[13px] font-[700] text-[#fff] !bg-[#2F2F2F]"
            onClick={() => {
              setOpenCreateOrEditModal(true);
              setIdEdit(0);
            }}
            styleType="rounded"
          >
            Add Question
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
        <CreateOrEditQuestionBank
          getList={handleGetQuestionBank}
          idEdit={idEdit}
          openModal={openCreateOrEditModal}
          setOpenModal={setOpenCreateOrEditModal}
        />
      )}
    </>
  );
};

export default QuestionBankTable;
