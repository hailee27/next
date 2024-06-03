/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { MoreOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { Table } from 'antd';

import BasicPopover from '@/components/common/BasicPopover';
import { StudentGetListAssignmentParams, useLazyStudentGetListAssignmentQuery } from '@/redux/endpoints/student/class';
import CustomPagination from '@/components/common/CustomPagination';
import BasicButton from '@/components/common/forms/BasicButton';

import AssignmentRankModal from '../Modal/AssignmentRankModal';

interface PropsType {
  objSearch: StudentGetListAssignmentParams;
}

const StudentAssignmentTable = ({ objSearch }: PropsType) => {
  const { push } = useRouter();
  const [getList, { data, isFetching }] = useLazyStudentGetListAssignmentQuery();

  const [page, setPage] = useState<number>(1);
  const [idEdit, setIdEdit] = useState(0);
  const [openRank, setOpenRank] = useState<boolean>(false);

  const handleGetAssignment = () => {
    getList({ page: 1, limit: 20 });
  };

  useEffect(() => {
    if (objSearch?.classId && objSearch?.status) {
      getList({
        limit: 20,
        page,
        ...objSearch,
      });
    }
  }, [page]);

  useEffect(() => {
    if (objSearch?.classId && objSearch?.status) {
      if (page !== 1) {
        setPage(1);
      } else {
        getList({
          limit: 20,
          page,
          ...objSearch,
        });
      }
    }
  }, [objSearch]);

  useEffect(() => {
    handleGetAssignment();
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
        <div id="MoreOutlined">
          <BasicPopover
            content={
              <div>
                {objSearch?.status === 1 && dayjs().isAfter(record?.timeStart) && dayjs().isBefore(record?.timeEnd) && (
                  <BasicButton
                    className="flex flex-col w-full text-[#929292] hover:bg-[rgba(245,245,245,0.6)]"
                    onClick={() => {
                      push(`/student/exam/${record?.id}`);
                    }}
                    styleType="text"
                  >
                    Exam
                  </BasicButton>
                )}
                {objSearch?.status === 3 && (
                  <BasicButton
                    className="flex flex-col w-full text-[#929292] hover:bg-[rgba(245,245,245,0.6)]"
                    onClick={() => {
                      setIdEdit(record?.id);
                      setOpenRank(true);
                    }}
                    styleType="text"
                  >
                    View Exam Results
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
        <p className="text-[18px] leading-[22px] font-bold text-[#000]">Assignment List</p>
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
          onRow={(record) => ({
            onClick: () => {
              if (objSearch?.status === 3) {
                setIdEdit(record?.id || 0);
                setOpenRank(true);
              }
            },
          })}
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
      {openRank && <AssignmentRankModal idEdit={idEdit} openModal={openRank} setOpenModal={setOpenRank} />}
    </div>
  );
};

export default StudentAssignmentTable;
