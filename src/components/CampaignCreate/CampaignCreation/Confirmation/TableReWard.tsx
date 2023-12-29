import React, { useMemo } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { TypeCampaignReward } from '@/redux/endpoints/campaign';
import { formatNumber } from '@/utils/formatNumber';
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
    title: '等数',
    align: 'center',
  },
  {
    dataIndex: 'amountOfMoney',
    key: 'amountOfMoney',
    title: '金額',
    align: 'center',
    // render:(value)=> `${formatNumber(value)}`
  },
  {
    dataIndex: 'numberOfWinners',
    key: 'numberOfWinners',
    title: '当選者本数',
    align: 'center',
  },
  {
    dataIndex: 'probabilityOfWinning',
    key: 'probabilityOfWinning',
    title: '当選確率',
    align: 'center',
  },
];

interface Props {
  // onChange?: () => void;
  value?: {
    reWard0: TypeReWard;
  };
  valueTable?: TypeCampaignReward[];
}
function TableReWard({ value, valueTable }: Props) {
  const data = useMemo<DataType[]>(() => {
    if (value) {
      return Object.values(value ?? {})
        .map((e, i) => ({
          key: String(i + 1),
          equalNumber: `${i + 1}等`,
          amountOfMoney: `${e.money}円`,
          numberOfWinners: `${e.tiketWinning}本`,
          probabilityOfWinning: `${e.tiketWinning}%`,
        }))
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
        ]);
    }
    if (valueTable) {
      return valueTable
        .map((e, i) => ({
          key: String(i + 1),
          equalNumber: `${i + 1}等`,
          amountOfMoney: `${formatNumber(e.amountOfMoney, true)}円`,
          numberOfWinners: `${e.numberOfWinningTicket}本`,
          probabilityOfWinning: `${e.numberOfWinningTicket}%`,
        }))
        .concat([
          {
            key: String(valueTable.length + 1),
            equalNumber: 'はずれ',
            amountOfMoney: '0円',
            numberOfWinners: '-',
            probabilityOfWinning: `${
              100 -
              Number(valueTable?.map((e) => Number(e.numberOfWinningTicket))?.reduce((prev, cur) => prev + cur, 0))
            }%`,
          },
        ]);
    }
    return [
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
  }, [value, valueTable]);

  return (
    <div className={styles.customeTable}>
      <Table bordered columns={columns} dataSource={data} pagination={false} tableLayout="fixed" />
    </div>
  );
}
TableReWard.defaultProps = {
  value: undefined,
  valueTable: undefined,
};
export default TableReWard;
