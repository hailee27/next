import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styles from './index.module.scss';

interface DataType {
  key: string;
  equalNumber: string;
  amountOfMoney: string;
  numberOfWinners: string;
  probabilityOfWinning: string;
}

const columns: ColumnsType<DataType> = [
  {
    dataIndex: 'equalNumber',
    key: 'equalNumber',
  },
  {
    dataIndex: 'amountOfMoney',
    key: 'amountOfMoney',
  },
  {
    dataIndex: 'numberOfWinners',
    key: 'numberOfWinners',
  },
  {
    dataIndex: 'probabilityOfWinning',
    key: 'probabilityOfWinning',
  },
];

const data: DataType[] = [
  {
    key: '0',
    equalNumber: '等数',
    amountOfMoney: '金額',
    numberOfWinners: '当選者本数',
    probabilityOfWinning: '当選確率',
  },
  {
    key: '1',
    equalNumber: '1等',
    amountOfMoney: '10,000円',
    numberOfWinners: '1本',
    probabilityOfWinning: '1%',
  },
  {
    key: '2',
    equalNumber: '2等',
    amountOfMoney: '5,000円',
    numberOfWinners: '5本',
    probabilityOfWinning: '5%',
  },
  {
    key: '3',
    equalNumber: '3等',
    amountOfMoney: '1,000円',
    numberOfWinners: '10本',
    probabilityOfWinning: '10%',
  },
  {
    key: '4',
    equalNumber: 'はずれ',
    amountOfMoney: '0円',
    numberOfWinners: '-',
    probabilityOfWinning: '84%',
  },
];

function TableReWard() {
  return (
    <div className={styles.customeTable}>
      <Table bordered columns={columns} dataSource={data} pagination={false} showHeader={false} tableLayout="fixed" />
    </div>
  );
}

export default TableReWard;
