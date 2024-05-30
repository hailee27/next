/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import { MoreOutlined } from '@ant-design/icons';

import {
  GetListPracticeRoomParams,
  ListPracticeRoomType,
  useLazyGetListPracticeRoomQuery,
} from '@/redux/endpoints/student/practice';
import BasicPopover from '@/components/common/BasicPopover';
import BasicButton from '@/components/common/forms/BasicButton';

import CreatePracticeModal from '../Modal/CreatePracticeModal';
import ViewPracticeScoreModal from '../Modal/ViewPracticeScoreModal';

interface PropsType {
  objSearch: GetListPracticeRoomParams;
}

const StudentPracticeTable = ({ objSearch }: PropsType) => {
  const { push } = useRouter();
  const [getList, { data, isFetching }] = useLazyGetListPracticeRoomQuery();

  const [page, setPage] = useState<number>(1);
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [openViewScoreModal, setOpenViewScoreModal] = useState<boolean>(false);
  const [practiceSelected, setPracticeSelected] = useState<ListPracticeRoomType>({});

  const handleGetPractice = () => {
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
    handleGetPractice();
  }, []);

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
      title: 'Created At',
      width: 200,
      dataIndex: 'createdAt',
      render: (createdAt) => <div className="">{dayjs(createdAt).format('DD-MM-YYYY')}</div>,
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
                {record?.status && (
                  <BasicButton
                    className="flex flex-col w-full text-[#929292] hover:bg-[rgba(245,245,245,0.6)]"
                    onClick={() => {
                      push({
                        pathname: `/student/practice/${record?.id}`,
                        query: {
                          timeAllow: record?.timeAllow,
                          questionCount: record?.questionCount,
                          type: record?.type,
                        },
                      });
                    }}
                    styleType="text"
                  >
                    Exam
                  </BasicButton>
                )}
                {!record?.status && (
                  <BasicButton
                    className="flex flex-col w-full text-[#929292] hover:bg-[rgba(245,245,245,0.6)]"
                    onClick={() => {
                      setPracticeSelected(record);
                      setOpenViewScoreModal(true);
                    }}
                    styleType="text"
                  >
                    View Practice Score
                  </BasicButton>
                )}
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
    <div className="shadow-xl pb-6">
      <div className="flex items-center justify-between px-6 h-[64px] shadow-inner bg-[#F4F6F7]">
        <p className="text-[18px] leading-[22px] font-bold text-[#000]">Practice List</p>
        <div className="flex items-center gap-x-4">
          <BasicButton
            className="text-[13px] font-[700] text-[#fff] !bg-[#2F2F2F]"
            onClick={() => {
              setOpenCreateModal(true);
            }}
            styleType="rounded"
          >
            Add Practice
          </BasicButton>
        </div>
      </div>
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
      </div>
      {openCreateModal && (
        <CreatePracticeModal
          getList={() => handleGetPractice()}
          openModal={openCreateModal}
          setOpenModal={setOpenCreateModal}
        />
      )}

      {openViewScoreModal && (
        <ViewPracticeScoreModal
          openModal={openViewScoreModal}
          practiceSelected={practiceSelected}
          setOpenModal={setOpenViewScoreModal}
        />
      )}
    </div>
  );
};

export default StudentPracticeTable;
