import React from 'react';
import BasicTabs from '@/components/common/BasicTabs';
import type { TabsProps } from 'antd';
import { useRouter } from 'next/router';
import CButtonShadow from '@/components/common/CButtonShadow';
import FileIcon from '@/components/common/icons/FileIcon';
import TableAll from './TableAll';

const ListTab = ({ title }: { title: string }) => (
  <div className=" flex items-center space-x-[8px]">
    {/* <Image alt="" preview={false} src="/icons/icon-placeholder.svg" /> */}
    <span className="text-[16px] font-bold">{title}</span>
  </div>
);
function CampaignList() {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: <ListTab title="すべて" />,
      children: <TableAll status="ALL" />,
    },
    {
      key: '2',
      label: <ListTab title="下書き・購入待ち" />,
      children: <TableAll status="DRAFT" />,
    },
    {
      key: '3',
      label: <ListTab title="審査中" />,
      children: <TableAll status="UNDER_REVIEW" />,
    },
    {
      key: '4',
      label: <ListTab title="公開待ち" />,
      children: <TableAll status="WAITING_FOR_PUBLICATION" />,
    },
    {
      key: '5',
      label: <ListTab title="公開中" />,
      children: <TableAll status="PUBLIC" />,
    },
    {
      key: '6',
      label: <ListTab title="完了" />,
      children: <TableAll status="COMPLETION" />,
    },
  ];

  const router = useRouter();
  return (
    <div className="px-[48px] pb-[77px]">
      <div className="flex py-[32px] w-full justify-between border-b-2 border-[#2D3648] max-h-[112px]">
        <span className="text-[32px] font-bold">キャンペーン一覧</span>
        <div className="w-[165px]  h-[56px]">
          <CButtonShadow
            classBgColor="bg-main-text"
            classRounded="rounded-[6px]"
            classShadowColor="bg-white"
            onClick={() => router.push('/campaign-creator/create')}
            shadowSize="normal"
            title="新規作成"
            withIcon={{ position: 'left', icon: <FileIcon color="#fff" /> }}
          />
        </div>
      </div>
      <div className="pt-[28px]">
        <BasicTabs defaultActiveKey={router.query.type === 'public' ? '5' : '1'} items={items} />
      </div>
    </div>
  );
}

export default CampaignList;
