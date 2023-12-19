import BasicButton from '@/components/common/BasicButton';
import BasicTabs from '@/components/common/BasicTabs';
import React from 'react';
import type { TabsProps } from 'antd';
import { Image } from 'antd';
import { useRouter } from 'next/router';
import TableAll from './TableAll';

const ListTab = ({ title }: { title: string }) => (
  <div className=" flex items-center space-x-[8px]">
    <Image alt="" preview={false} src="/icons/icon-placeholder.svg" />
    <span className="text-[16px] font-bold">{title}</span>
  </div>
);
function CampaignList() {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: <ListTab title="すべて" />,
      children: <TableAll />,
    },
    {
      key: '2',
      label: <ListTab title="購入申請中" />,
      children: 'Content of Tab Pane 2',
    },
    {
      key: '3',
      label: <ListTab title="公開待ち" />,
      children: 'Content of Tab Pane 3',
    },
    {
      key: '4',
      label: <ListTab title="公開中" />,
      children: 'Content of Tab Pane 3',
    },
    {
      key: '5',
      label: <ListTab title="完了" />,
      children: 'Content of Tab Pane 3',
    },
    {
      key: '6',
      label: <ListTab title="下書き" />,
      children: 'Content of Tab Pane 3',
    },
  ];
  const router = useRouter();
  return (
    <div>
      <div className="flex px-[80px] py-[32px] w-full justify-between border-b-2 border-[#2D3648] max-h-[112px]">
        <span className="text-[32px] font-bold">キャンペーン一覧</span>
        <BasicButton className="w-[104px] h-[48px]" onClick={() => router.push('/campaign/create')}>
          新規作成
        </BasicButton>
      </div>
      <div className="px-[48px] pt-[28px]">
        <BasicTabs items={items} />
      </div>
    </div>
  );
}

export default CampaignList;
