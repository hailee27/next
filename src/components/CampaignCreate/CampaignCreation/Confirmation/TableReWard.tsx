import React, { useMemo } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { formatNumber } from '@/utils/formatNumber';
import { useGetReWardsQuery } from '@/redux/endpoints/reWard';
import { useRouter } from 'next/router';
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
    // render: (value) => `${formatNumber(value)}`,
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
    render: (value) => `${Number(value).toFixed(1)}%`,
  },
];

interface Props {
  // onChange?: () => void;
  value?: {
    reWard0: TypeReWard;
  };
  totalWinner?: number | string;
  // valueTable?: TypeCampaignReward[];
}
function TableReWard({ value, totalWinner }: Props) {
  const { query } = useRouter();
  const { data: valueTable } = useGetReWardsQuery(
    { campaignId: String(query?.id) },
    { refetchOnMountOrArgChange: true }
  );

  const data = useMemo<DataType[]>(() => {
    if (value) {
      return Object.values(value ?? {})
        .map((e, i) => ({
          key: String(i + 1),
          equalNumber: `${i + 1}等`,
          amountOfMoney: `${formatNumber(e.money ?? 0, true, 1)}円`,
          numberOfWinners: `${e.tiketWinning}本`,
          probabilityOfWinning: `${100 * (Number(e.tiketWinning) / Number(totalWinner ?? 100))}`,
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
                  ?.map((e) => Number(100 * (Number(e.tiketWinning) / Number(totalWinner ?? 100))))
                  ?.reduce((prev, cur) => prev + cur, 0)
              )
            }`,
          },
        ]);
    }
    if (valueTable) {
      return valueTable.rewards
        .map((e, i) => ({
          key: String(i + 1),
          equalNumber: `${i + 1}等`,
          amountOfMoney: `${formatNumber(e.amountOfMoney, true)}円`,
          numberOfWinners: `${e.numberOfWinningTicket}本`,
          probabilityOfWinning: `${100 * (Number(e.numberOfWinningTicket) / Number(totalWinner))}`,
        }))
        .concat([
          {
            key: String(valueTable.rewards.length + 1),
            equalNumber: 'はずれ',
            amountOfMoney: '0円',
            numberOfWinners: '-',
            probabilityOfWinning: `${
              100 -
              Number(
                valueTable?.rewards
                  .map((e) => Number(100 * (Number(e.numberOfWinningTicket) / Number(totalWinner))))
                  ?.reduce((prev, cur) => prev + cur, 0)
              )
            }`,
          },
        ]);
    }
    return [];
  }, [value, valueTable, totalWinner]);

  return (
    <div className={styles.customeTable}>
      <Table bordered columns={columns} dataSource={data} pagination={false} tableLayout="fixed" />
    </div>
  );
}
TableReWard.defaultProps = {
  value: undefined,
  totalWinner: 100,
  // valueTable: undefined,
};
export default TableReWard;
