import BasicTabs from '@/components/common/BasicTabs';
import React, { useState } from 'react';
import type { TabsProps } from 'antd';
import BasicButton from '@/components/common/BasicButton';
import { Form } from 'antd';

import { useRouter } from 'next/router';
import ReWard from './ReWard';
import Confirmation from './Confirmation';
import Setup from './Setup';
import Task from './Task';

function CampaignCreation() {
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
  const [tab, setTab] = useState<string>('1');
  const router = useRouter();
  return (
    <Form.Provider
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onFormFinish={(name, { values, forms }) => {
        setTab((prev) => String(Number(prev) + 1));
        window.scrollTo({ behavior: 'smooth', top: 0 });
        // console.log(forms[name].getFieldsValue());
        // console.log(values);
        if (name === 'reWard') {
          router.push({ query: { query: JSON.stringify({ typeWinner: forms[name].getFieldValue('typeWinner') }) } });
        }
      }}
    >
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
      <div className="px-[48px] pt-[28px] pb-[55px]">
        <BasicTabs activeKey={tab} items={items} onChange={(e) => setTab(e)} />
      </div>
    </Form.Provider>
  );
}

export default CampaignCreation;
