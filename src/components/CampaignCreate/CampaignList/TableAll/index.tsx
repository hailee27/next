import React, { useEffect, useMemo, useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import ArrowDown from '@/components/common/icons/ArrowDown';
import CircleArrow from '@/components/common/icons/CircleArrow';
import { useGetListCampaignQuery } from '@/redux/endpoints/campaign';
import moment from 'moment';
import { formatNumber } from '@/utils/formatNumber';
import { useRouter } from 'next/router';
import styles from '@/components/common/BasicTable/index.module.scss';

interface DataType {
  key: React.Key;
  campaignName: string;
  status: string;
  startDate: string;
  endDate: string;
  winner: string;
  campaignBalance: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'キャンペーン名',
    dataIndex: 'campaignName',
    render: (text: string) => <span className="text-[#04AFAF] underline underline-offset-2">{text}</span>,
    sorter: {
      compare: (a, b) => a.campaignName.localeCompare(b.campaignName),
    },
    sortIcon: () => <ArrowDown />,
  },
  {
    title: 'ステータス',
    dataIndex: 'status',
    // sorter: {
    //   compare: (a, b) => a.status - b.status,
    // },
    render: (
      value: 'DRAFT' | 'WAITING_FOR_PURCASE' | 'UNDER_REVIEW' | 'WAITING_FOR_PUBLICATION' | 'PUBLIC' | 'COMPLETION'
    ) => {
      switch (value) {
        case 'DRAFT':
          return '下書き';
        case 'UNDER_REVIEW':
          return '審査中';
        case 'WAITING_FOR_PUBLICATION':
          return '公開待ち';
        case 'PUBLIC':
          return '公開中';
        case 'COMPLETION':
          return '完了';
        default:
          return '下書き';
      }
    },
    sortIcon: () => <ArrowDown />,
  },
  {
    title: '開始日時',
    dataIndex: 'startDate',
    render: (value) => moment(value).format('YYYY/MM/DD hh:mm'),
    sorter: {
      compare: (a, b) => moment(a.startDate).diff(moment(b.startDate)),
    },
    sortIcon: () => <ArrowDown />,
  },
  {
    title: '終了日時',
    dataIndex: 'endDate',
    render: (value) => moment(value).format('YYYY/MM/DD hh:mm'),
    sorter: {
      compare: (a, b) => moment(a?.endDate).diff(moment(b?.endDate)),
    },
    sortIcon: () => <ArrowDown />,
  },
  {
    title: '当選者選択方法',
    dataIndex: 'winner',
    sorter: {
      compare: (a, b) => a.winner.localeCompare(String(b)),
    },
    sortIcon: () => <ArrowDown />,
  },
  {
    title: 'キャンペーン残高',
    dataIndex: 'campaignBalance',
    render: (value) => (!value ? '-' : `¥${formatNumber(value, true, 1)}`),
    sorter: {
      compare: (a, b) => Number(a.campaignBalance) - Number(b.campaignBalance),
    },
    sortIcon: () => <ArrowDown />,
  },
];

function TableAll({
  status,
}: {
  status?: 'ALL' | 'DRAFT' | 'UNDER_REVIEW' | 'WAITING_FOR_PUBLICATION' | 'PUBLIC' | 'COMPLETION';
}) {
  const [pageTable, setPageTable] = useState<number>(0);
  const { push, query, isReady } = useRouter();
  const { data: dataTable, isLoading } = useGetListCampaignQuery(
    { skip: pageTable ?? 0, take: 10 },
    { refetchOnMountOrArgChange: true }
  );
  // eslint-disable-next-line no-console
  console.log(status);

  useEffect(() => {
    if (query.page) {
      setPageTable(Number(Number(query.page) - 1) * 10);
    }
  }, [isReady, query?.page]);

  const data = useMemo<DataType[] | undefined>(() => {
    if (dataTable) {
      let dataCampaign: DataType[] = [];
      dataCampaign = dataTable.campaigns.map((item) => ({
        key: item.id,
        campaignName: item.title,
        status: item.status,
        startDate: item.startTime,
        endDate: item.expiredTime,
        winner: item.methodOfselectWinners === 'AUTO_PRIZEE_DRAW' ? 'インスタントウィン' : 'マニュアル',
        campaignBalance: item.totalPrizeValue,
      }));
      if (status === 'ALL') {
        return dataCampaign;
      }
      return dataCampaign.filter((e) => e.status === status);
    }
    return undefined;
  }, [dataTable?.campaigns, status]);

  return (
    <div className={styles.customTable}>
      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        onRow={(record) => ({
          onClick: () => {
            if (record.status === 'DRAFT') {
              push(`/campaign-creator/create/draft/${record.key}`);
            } else {
              push(`/campaign-creator/list/${record.key}`);
            }
            // trigger({ campaignId: String(record.key) }); // click row
          },
        })}
        pagination={{
          position: ['bottomCenter'],
          pageSize: 10,
          total: dataTable?.total ?? 10,
          showSizeChanger: false,
          jumpNextIcon: <span className="text-[16px] font-medium tracking-[0.48px]">...</span>,
          jumpPrevIcon: <span className="text-[16px] font-medium tracking-[0.48px]">...</span>,
          prevIcon: <CircleArrow position="left" />,
          nextIcon: <CircleArrow />,
          // eslint-disable-next-line react/no-unstable-nested-components
          showTotal: () => <span>{dataTable?.total ?? 10} 件</span>,
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
TableAll.defaultProps = {
  status: 'ALL',
};
export default TableAll;
