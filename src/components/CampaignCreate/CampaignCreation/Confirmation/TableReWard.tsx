import React, { useMemo } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styles from './index.module.scss';
import { TypeReWard } from '../ReWard/InstantWin';

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

interface Props {
  // onChange?: () => void;
  value?: {
    reWard0: TypeReWard;
  };
}
function TableReWard({ value }: Props) {
  const data = useMemo<DataType[]>(
    () =>
      [
        {
          key: '0',
          equalNumber: '等数',
          amountOfMoney: '金額',
          numberOfWinners: '当選者本数',
          probabilityOfWinning: '当選確率',
        },
      ]
        .concat(
          Object.values(value ?? {}).map((e, i) => ({
            key: String(i + 1),
            equalNumber: `${i + 1}等`,
            amountOfMoney: `${e.money}円`,
            numberOfWinners: `${e.tiketWinning}本`,
            probabilityOfWinning: `${e.tiketWinning}%`,
          }))
        )
        .concat([
          {
            key: String(Object.values(value ?? {}).length + 1),
            equalNumber: 'はずれ',
            amountOfMoney: '0円',
            numberOfWinners: '-',
            probabilityOfWinning: `${
              100 -
              Number(
                Object.values(value ?? {})
                  ?.map((e) => Number(e.tiketWinning))
                  ?.reduce((prev, cur) => prev + cur, 0)
              )
            }%`,
          },
        ]),
    [value]
  );
  return (
    <div className={styles.customeTable}>
      <Table bordered columns={columns} dataSource={data} pagination={false} showHeader={false} tableLayout="fixed" />
    </div>
  );
}
TableReWard.defaultProps = {
  value: undefined,
};
export default TableReWard;
