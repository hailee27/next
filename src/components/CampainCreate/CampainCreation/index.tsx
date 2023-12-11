import BasicTabs from '@/components/common/BasicTabs';
import React from 'react';
import type { TabsProps } from 'antd';
import BasicButton from '@/components/common/BasicButton';
import Setup from './Setup';
import Task from './Task';
import ReWard from './ReWard';
import Confirmation from './Confirmation';

function CampainCreation() {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Set up',
      children: <Setup />,
    },
    {
      key: '2',
      label: 'Tasks',
      children: <Task />,
    },
    {
      key: '3',
      label: 'ReWard',
      children: <ReWard />,
    },
    {
      key: '4',
      label: 'Confirmation',
      children: <Confirmation />,
    },
  ];
  return (
    <div>
      <div className="flex px-[80px] py-[32px] w-full justify-between border-b-2 border-[#2D3648] max-h-[112px]">
        <span className="text-[32px] font-bold">キャンペーン作成</span>
        <div className="flex space-x-[16px]">
          <BasicButton className="h-[48px]" type="primary">
            削除
          </BasicButton>
          <BasicButton className="h-[48px]" type="primary">
            プレビュー
          </BasicButton>
          <BasicButton className="h-[48px]">下書き保存</BasicButton>
        </div>
      </div>
      <div className="px-[48px] pt-[28px]">
        <BasicTabs items={items} />
      </div>
    </div>
  );
}

export default CampainCreation;
