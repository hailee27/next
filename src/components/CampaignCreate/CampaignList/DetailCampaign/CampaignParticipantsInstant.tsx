import { useGetDetailCampaignQuery, useGetListCampaignUsersQuery } from '@/redux/endpoints/campaign';
import { Table } from 'antd';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import styles from '@/components/common/BasicTable/index.module.scss';
import { ColumnsType } from 'antd/es/table';
import CircleArrow from '@/components/common/icons/CircleArrow';
import moment from 'moment';
import { formatNumber } from '@/utils/formatNumber';
import { Image, type TabsProps } from 'antd';
import BasicTabs from '@/components/common/BasicTabs';
import ShareChart from './participants/ShareChart';
import ShareTable from './participants/ShareTable';

interface DataType {
  key: React.Key;
  accountName: string;
  email: string;
  date: string;
  shares?: number;
  prize?: string;
  question_1: string;
  question_2: string;
}

const ListTab = ({ title }: { title: string }) => (
  <div className=" flex items-center space-x-[8px]">
    <Image alt="" preview={false} src="/icons/icon-placeholder.svg" />
    <span className="text-[16px] font-bold">{title}</span>
  </div>
);

function CampaignParticipantsInstant({ totalPrizeValue }: { totalPrizeValue: number }) {
  const { query } = useRouter();
  const { data: dataTable, isFetching: isFetchingDetail } = useGetDetailCampaignQuery({
    campaignId: String(query?.id),
    isAdmin: true,
  });
  const { data: listDataCampaignUser, isFetching: isFetchingList } = useGetListCampaignUsersQuery({
    campaignId: String(query?.id),
  });
  const columns = useMemo<ColumnsType<DataType>>(() => {
    if (dataTable?.methodOfselectWinners === 'AUTO_PRIZEE_DRAW') {
      return [
        {
          title: 'Xアカウント名',
          dataIndex: 'accountName',
          render: (text: string) => <span className="text-[#04AFAF] underline underline-offset-2">{text}</span>,
        },
        {
          title: 'メールアドレス',
          dataIndex: 'email',
        },
        {
          title: '参加日時',
          dataIndex: 'date',
        },
        {
          title: '賞品',
          dataIndex: 'prize',
        },
        {
          title: '自由形式質問_1',
          dataIndex: 'question_1',
          ellipsis: true,
        },
        {
          title: '自由形式質問_2',
          dataIndex: 'question_2',
          ellipsis: true,
        },
      ];
    }
    return [
      {
        title: 'Xアカウント名',
        dataIndex: 'accountName',
        render: (text: string) => <span className="text-[#04AFAF] underline underline-offset-2">{text}</span>,
      },
      {
        title: 'メールアドレス',
        dataIndex: 'email',
      },
      {
        title: '参加日時',
        dataIndex: 'date',
      },
      {
        title: 'ポイント',
        dataIndex: 'shares',
      },
      {
        title: '自由形式質問_1',
        dataIndex: 'question_1',
        ellipsis: true,
      },
      {
        title: '自由形式質問_2',
        dataIndex: 'question_2',
        ellipsis: true,
      },
    ];
  }, [dataTable?.methodOfselectWinners]);

  const data = useMemo<DataType[] | undefined>(() => {
    if (listDataCampaignUser) {
      return listDataCampaignUser.users.map((e) => ({
        key: e.id,
        accountName: e.identityAccountName,
        email: e.user?.email?.email ?? '-',
        date: moment(e.createdAt).format('YYYY/MM/DD HH:mm'),
        prize: e.award == null ? 'ハズレ' : `${formatNumber(e.award.value, true, 1)}円`,
        question_1: e.user?.UserTask?.[0]?.answer ?? '-',
        question_2: e.user?.UserTask?.[1]?.answer ?? '-',
      }));
    }
    return undefined;
  }, [listDataCampaignUser]);

  const fee = useMemo(() => Number((Number(totalPrizeValue) * 5) / 100), [totalPrizeValue]);
  const tax = useMemo(() => Number((fee * 10) / 100), [totalPrizeValue, fee]);

  const ParticipantsTableContentRender = (
    <div className={styles.customTable}>
      <Table
        columns={columns}
        dataSource={data}
        loading={isFetchingDetail || isFetchingList}
        // onRow={(record) => ({
        //   onClick: () => {
        //     push(`/campaign-creator/list/${record.key}`);
        //     // trigger({ campaignId: String(record.key) }); // click row
        //   },
        // })}
        pagination={{
          position: ['bottomCenter'],
          pageSize: 10,
          // total: 10,
          showSizeChanger: false,
          jumpNextIcon: <span className="text-[16px] font-medium tracking-[0.48px]">...</span>,
          jumpPrevIcon: <span className="text-[16px] font-medium tracking-[0.48px]">...</span>,
          prevIcon: <CircleArrow position="left" />,
          nextIcon: <CircleArrow />,
          // eslint-disable-next-line react/no-unstable-nested-components
          showTotal: () => <span>{10} 件</span>,
          // onChange: (page) => {
          //   push({ query: { page } }, undefined, { shallow: true, scroll: true });
          // },
          current: 10,
        }}
        tableLayout="fixed"
      />
    </div>
  );

  const manualCampaignTabItems: TabsProps['items'] = [
    {
      key: '1',
      label: <ListTab title="すべて" />,
      children: <div className="mt-[16px]">{ParticipantsTableContentRender}</div>,
    },
    {
      key: '2',
      label: <ListTab title="下書き・購入待ち" />,
      children: (
        <div className="mt-[16px]">
          <ShareChart />
          <div className="h-[40px]" />
          <ShareTable />
        </div>
      ),
    },
  ];

  return (
    <div className="mt-[56px]">
      {dataTable?.methodOfselectWinners === 'AUTO_PRIZEE_DRAW' && (
        <div className="flex mb-[56px]">
          <div className="flex flex-col space-y-[16px]">
            <span className="text-[#04AFAF] text-[18px] font-bold">配布済み賞品金額</span>
            <span className=" text-[16px] font-bold">
              合計 {formatNumber(listDataCampaignUser?.amountAwarded ?? 0, true, 1)}円
            </span>
          </div>
          <div className="flex flex-col space-y-[16px] ml-[72px]">
            <span className="text-[#04AFAF] text-[18px] font-bold">支払い金額合計</span>
            <div className="flex space-x-[48px]">
              <span className="text-[16px] font-bold">
                合計 {formatNumber(Number(totalPrizeValue) + fee + tax, true, 1)} 円
              </span>
              <div className="flex flex-col text-[14px] space-y-[8px]">
                <div className="flex space-x-[8px] justify-between ">
                  <span>ギフト代金</span>
                  <span>{formatNumber(totalPrizeValue ?? 0, true, 1)}円</span>
                </div>
                <div className="flex space-x-[8px] justify-between">
                  <span>手数料</span>
                  <span>{formatNumber(fee, true, 1)}円</span>
                </div>
                <div className="flex space-x-[8px] justify-between">
                  <span>消費税（手数料に対する消費税）</span>
                  <span>{formatNumber(tax, true, 1)}円</span>
                </div>
                <div className="flex space-x-[8px] justify-between">
                  <span>デポジット残高利用</span>
                  <span>0円</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {dataTable?.methodOfselectWinners === 'AUTO_PRIZEE_DRAW' ? (
        ParticipantsTableContentRender
      ) : (
        <BasicTabs defaultActiveKey="1" items={manualCampaignTabItems} />
      )}
    </div>
  );
}

export default CampaignParticipantsInstant;
