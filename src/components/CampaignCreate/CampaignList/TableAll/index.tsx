import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import ArrowDown from '@/components/common/icons/ArrowDown';
import CircleArrow from '@/components/common/icons/CircleArrow';
import styles from './index.module.scss';

interface DataType {
  key: React.Key;
  campaignName: string;
  status: number;
  startDate: string;
  endDate: string;
  winner: string;
  campaignBalance: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'キャンペーン名',
    dataIndex: 'campaignName',
    render: (text: string) => <span className="text-[#04AFAF] underline underline-offset-2">{text}</span>,
    sorter: {
      compare: (a, b) => a.status - b.status,
    },
    sortIcon: () => <ArrowDown />,
  },
  {
    title: 'ステータス',
    dataIndex: 'status',
    sorter: {
      compare: (a, b) => a.status - b.status,
    },
    sortIcon: () => <ArrowDown />,
  },
  {
    title: '開始日時',
    dataIndex: 'startDate',
    sorter: {
      compare: (a, b) => a.status - b.status,
    },
    sortIcon: () => <ArrowDown />,
  },
  {
    title: '終了日時',
    dataIndex: 'endDate',
    sorter: {
      compare: (a, b) => a.status - b.status,
    },
    sortIcon: () => <ArrowDown />,
  },
  {
    title: '当選者選択方法',
    dataIndex: 'winner',
    sorter: {
      compare: (a, b) => a.status - b.status,
    },
    sortIcon: () => <ArrowDown />,
  },
  {
    title: 'キャンペーン残高',
    dataIndex: 'campaignBalance',
    sorter: {
      compare: (a, b) => a.status - b.status,
    },
    sortIcon: () => <ArrowDown />,
  },
];

const data: DataType[] = [
  {
    key: '1',
    campaignName: 'John Brown',
    status: 32,
    startDate: '公開待ち',
    endDate: '2023/12/25 15:00',
    winner: 'インスタントウィン',
    campaignBalance: '¥10,000',
  },
  {
    key: '2',
    campaignName: 'Jim Green',
    status: 42,
    startDate: '公開待ち',
    endDate: '2023/12/25 15:00',
    winner: 'インスタントウィン',
    campaignBalance: '¥10,000',
  },
  {
    key: '3',
    campaignName: 'Joe Black',
    status: 32,
    startDate: '下書き',
    endDate: '2023/12/25 15:00',
    winner: 'インスタントウィン',
    campaignBalance: '¥10,000',
  },
  {
    key: '4',
    campaignName: 'Disabled User',
    status: 99,
    startDate: '完了',
    endDate: '2023/12/25 15:00',
    winner: 'インスタントウィン',
    campaignBalance: '¥10,000',
  },
];

function TableAll() {
  return (
    <div className={styles.customTable}>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          position: ['bottomCenter'],
          pageSize: 2,
          jumpNextIcon: <span className="text-[16px] font-medium tracking-[0.48px]">...</span>,
          jumpPrevIcon: <span className="text-[16px] font-medium tracking-[0.48px]">...</span>,
          prevIcon: <CircleArrow position="left" />,
          nextIcon: <CircleArrow />,

          // eslint-disable-next-line react/no-unstable-nested-components
          showTotal: (total) => <span>{total} 件</span>,
        }}
        tableLayout="fixed"
      />
    </div>
  );
}

export default TableAll;
