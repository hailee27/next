/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
import { Table } from 'antd';
import styles from '@/components/common/BasicTable/index.module.scss';
import CircleArrow from '@/components/common/icons/CircleArrow';
import { useRouter } from 'next/router';
import { ColumnsType } from 'antd/es/table';

interface DataType {
  key: React.Key;
  date: string;
  payment: string;
  withdrawal: string;
  content: string;
  depositBalance: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: '日付',
    dataIndex: 'date',
  },
  {
    title: '入金',
    dataIndex: 'payment',
  },
  {
    title: '出金',
    dataIndex: 'withdrawal',
  },
  {
    title: '内容',
    dataIndex: 'content',
    render: (value) => (
      <span>
        キャンペーン: <span className="text-[#2675BE]">{value}</span>
      </span>
    ),
  },
  {
    title: 'デポジット残高',
    dataIndex: 'depositBalance',
  },
];

function TablePayment() {
  const [pageTable, setPageTable] = useState<number>(0);
  const { push, query, isReady } = useRouter();

  useEffect(() => {
    if (query.page) {
      setPageTable(Number(Number(query.page) - 1) * 10);
    }
  }, [isReady, query?.page]);

  const data = useMemo<DataType[] | undefined>(
    () => [
      {
        key: '1',
        date: '2023/12/05',
        payment: '50,000円',
        withdrawal: '90,000円',
        content: 'test_ikeyama_3',
        depositBalance: 'デポジット残高',
      },
      {
        key: '2',
        date: '2023/12/05',
        payment: '-',
        withdrawal: '90,000円',
        content: 'test_ikeyama_3',
        depositBalance: 'デポジット残高',
      },
      {
        key: '3',
        date: '2023/12/05',
        payment: '50,000円',
        withdrawal: '-',
        content: 'test_ikeyama_3',
        depositBalance: 'デポジット残高',
      },

      {
        key: '4',
        date: '2023/12/05',
        payment: '50,000円',
        withdrawal: '-',
        content: 'test_ikeyama_3',
        depositBalance: 'デポジット残高',
      },
      {
        key: '5',
        date: '2023/12/05',
        payment: '50,000円',
        withdrawal: '-',
        content: 'test_ikeyama_3',
        depositBalance: 'デポジット残高',
      },
      {
        key: '6',
        date: '2023/12/05',
        payment: '50,000円',
        withdrawal: '-',
        content: 'test_ikeyama_3',
        depositBalance: 'デポジット残高',
      },
      {
        key: '7',
        date: '2023/12/05',
        payment: '50,000円',
        withdrawal: '-',
        content: 'test_ikeyama_3',
        depositBalance: 'デポジット残高',
      },
    ],
    []
  );
  return (
    <div className={styles.customTable}>
      <Table
        columns={columns}
        dataSource={data}
        onRow={(record) => ({
          onClick: () => {
            console.log(record);
          },
        })}
        pagination={{
          position: ['bottomCenter'],
          pageSize: 5,
          // total: 10,
          showSizeChanger: false,
          jumpNextIcon: <span className="text-[16px] font-medium tracking-[0.48px]">...</span>,
          jumpPrevIcon: <span className="text-[16px] font-medium tracking-[0.48px]">...</span>,
          prevIcon: <CircleArrow position="left" />,
          nextIcon: <CircleArrow />,
          // eslint-disable-next-line react/no-unstable-nested-components
          showTotal: () => <span>{data?.length} 件</span>,
          onChange: (page) => {
            push({ query: { page } }, undefined, { shallow: true, scroll: true });
          },
          // current: pageTable,
        }}
        tableLayout="fixed"
      />
    </div>
  );
}

export default TablePayment;
