/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
import { Table } from 'antd';
import styles from '@/components/common/BasicTable/index.module.scss';
import CircleArrow from '@/components/common/icons/CircleArrow';
import { useRouter } from 'next/router';
import { ColumnsType } from 'antd/es/table';
import { useGetPaymentQuery } from '@/redux/endpoints/payment';
import moment from 'moment';
import { formatNumber } from '@/utils/formatNumber';

interface DataType {
  key: React.Key;
  date: string;
  payment?: string | number;
  withdrawal?: string | number;
  content: string;
  depositBalance: string | number;
}

const columns: ColumnsType<DataType> = [
  {
    title: '日付',
    dataIndex: 'date',
  },
  {
    title: '購入額',
    dataIndex: 'payment',
    render: (value) => <span>{value ? `${formatNumber(value, true, 1)}円` : '-'} </span>,
  },
  {
    title: '配布済み金額',
    dataIndex: 'withdrawal',
    render: (value) => <span>{value === 0 ? `${formatNumber(value, true, 1)}円` : '-'} </span>,
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
    render: (value) => <span>{formatNumber(value, true, 1)}円 </span>,
  },
];

function TablePayment() {
  const [pageTable, setPageTable] = useState<number>(0);
  const { push, query, isReady } = useRouter();
  const { data: dataListPayment } = useGetPaymentQuery(
    { skip: pageTable ?? 0, take: 10 },
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (query.page) {
      setPageTable(Number(Number(query.page) - 1) * 10);
    }
  }, [isReady, query?.page]);

  const data = useMemo<DataType[] | undefined>(
    () =>
      dataListPayment?.payments.map((e) => ({
        key: e.id,
        date: moment(e.createdAt).format('YYYY/MM/DD'),
        payment: e.type === 'PAYMENT' ? e.amount : undefined,
        withdrawal: e.type !== 'PAYMENT' ? e.amount : undefined,
        content: e.campaignName,
        depositBalance: e.amountAfterTransaction,
      })),
    [dataListPayment?.payments]
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
          pageSize: 10,
          total: dataListPayment?.total,
          showSizeChanger: false,
          jumpNextIcon: <span className="text-[16px] font-medium tracking-[0.48px]">...</span>,
          jumpPrevIcon: <span className="text-[16px] font-medium tracking-[0.48px]">...</span>,
          prevIcon: <CircleArrow position="left" />,
          nextIcon: <CircleArrow />,
          // eslint-disable-next-line react/no-unstable-nested-components
          showTotal: () => <span>{dataListPayment?.total} 件</span>,
          onChange: (page) => {
            push({ query: { page } }, undefined, { shallow: true, scroll: true });
          },
          // current: pageTable,
        }}
        scroll={{ x: 700 }}
        tableLayout="fixed"
      />
    </div>
  );
}

export default TablePayment;
