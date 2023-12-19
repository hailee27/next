import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    // render: (text: string) => <a>{text}</a>,
    sorter: {
      compare: (a, b) => a.age - b.age,
    },
  },
  {
    title: 'Age',
    dataIndex: 'age',
    sorter: {
      compare: (a, b) => a.age - b.age,
    },
    // sortIcon: () => <div>aloo</div>,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    sorter: {
      compare: (a, b) => a.age - b.age,
    },
  },
  {
    title: 'Address',
    dataIndex: 'address',
    sorter: {
      compare: (a, b) => a.age - b.age,
    },
  },
  {
    title: 'Address',
    dataIndex: 'address',
    sorter: {
      compare: (a, b) => a.age - b.age,
    },
  },
  {
    title: 'Address',
    dataIndex: 'address',
    sorter: {
      compare: (a, b) => a.age - b.age,
    },
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sydney No. 1 Lake Park',
  },
];

function TableAll() {
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{ position: ['bottomCenter'], pageSize: 2 }}
      tableLayout="fixed"
    />
  );
}

export default TableAll;
