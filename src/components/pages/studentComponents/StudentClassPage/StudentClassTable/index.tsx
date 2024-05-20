/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { MoreOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { Table } from 'antd';

import { StudentGetListClassParams, useLazyStudentGetListClassQuery } from '@/redux/endpoints/student/class';
import BasicPopover from '@/components/common/BasicPopover';
import CustomPagination from '@/components/common/CustomPagination';
import BasicButton from '@/components/common/forms/BasicButton';

import AssignmentAnalysisModal from '../Modal/AssignmentAnalysisModal';

interface PropsType {
  objSearch: StudentGetListClassParams;
}

const StudentClassTable = ({ objSearch }: PropsType) => {
  const [getList, { data, isFetching }] = useLazyStudentGetListClassQuery();

  const [page, setPage] = useState<number>(1);
  const [idEdit, setIdEdit] = useState(0);
  const [openAssignmentAnalysis, setOpenAssignmentAnalysis] = useState<boolean>(false);

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
                    setIdEdit(record?.id);
                    setOpenAssignmentAnalysis(true);
                  }}
                  styleType="text"
                >
                  View Assignment Analysis
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

      {openAssignmentAnalysis && (
        <AssignmentAnalysisModal
          idEdit={idEdit}
          openModal={openAssignmentAnalysis}
          setOpenModal={setOpenAssignmentAnalysis}
        />
      )}
    </div>
  );
};

export default StudentClassTable;
