import React, { useState } from 'react';
import type { TabsProps } from 'antd';
import { Form, Spin } from 'antd';
import { useRouter } from 'next/router';
import BasicTabs from '@/components/common/BasicTabs';
import BasicButton from '@/components/common/BasicButton';
import { usePostCampaignDraftMutation, usePostQuestsMutation } from '@/redux/endpoints/campaign';
import { TypeResponseFormCampaign } from '@/types/campaign.type';
import toastMessage from '@/utils/func/toastMessage';
import adapterCampaignParams from '@/utils/func/adapterCampaignParams';
import ReWard from './ReWard';
import Confirmation from './Confirmation';
import Setup from './Setup';
import Task from './Task';

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'セットアップ',
    children: <Setup />,
  },
  {
    key: '2',
    label: 'タスク',
    children: <Task />,
  },
  {
    key: '3',
    label: '報酬',
    children: <ReWard />,
  },
  {
    key: '4',
    label: '確認',
    children: <Confirmation />,
  },
];
function CampaignCreation() {
  const router = useRouter();
  const [tab, setTab] = useState<string>('1');
  const [trigger, { isLoading }] = usePostQuestsMutation();
  const [triggerCampaignDraft] = usePostCampaignDraftMutation();

  return (
    <Form.Provider
      onFormFinish={(name, { forms }) => {
        let queryParams: TypeResponseFormCampaign = {};
        queryParams = {
          ...forms?.setUp?.getFieldsValue(),
          ...forms?.tasks?.getFieldsValue(),
          ...forms?.reWard?.getFieldsValue(),
        };
        if (name !== 'delete' && name !== 'preview' && name !== 'saveDraft') {
          setTab((prev) => String(Number(prev) + 1));
        }
        if (tab === '4') {
          setTab('4');
        }

        window.scrollTo({ behavior: 'smooth', top: 0 });
        if (name === 'reWard') {
          router.push({ query: { query: JSON.stringify({ typeWinner: forms[name].getFieldValue('typeWinner') }) } });
        }
        if (name === 'saveDraft') {
          triggerCampaignDraft(adapterCampaignParams(queryParams, queryParams.typeWinner))
            .unwrap()
            .then(() => toastMessage('save draft succses', 'success'));
        }
        if (name === 'confirm') {
          trigger(adapterCampaignParams(queryParams, queryParams.typeWinner))
            .unwrap()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .then((res: any) => {
              if (res?.error?.status === 400) {
                toastMessage(res?.error?.data?.error, 'error');
              } else {
                router.push('/campaign/list');
                toastMessage('succses', 'success');
              }
            })
            .catch((err) => toastMessage(err.message || 'error', 'error'));
        }
      }}
    >
      <div className="flex px-[80px] py-[32px] w-full justify-between border-b-2 border-[#2D3648] max-h-[112px] font-notoSans">
        <span className="text-[32px] font-bold">キャンペーン作成</span>
        <div className="flex space-x-[16px]">
          <Form name="delete">
            <BasicButton className="h-[48px]" htmlType="submit" type="primary">
              削除
            </BasicButton>
          </Form>
          <Form name="preview">
            <BasicButton className="h-[48px]" htmlType="submit" type="primary">
              プレビュー
            </BasicButton>
          </Form>
          <Form name="saveDraft">
            <BasicButton className="h-[48px]" htmlType="submit">
              下書き保存
            </BasicButton>
          </Form>
        </div>
      </div>
      <div className="px-[48px] pt-[28px] pb-[55px]">
        <Spin spinning={isLoading}>
          <BasicTabs activeKey={tab} items={items} onChange={(e) => setTab(e)} />
        </Spin>
      </div>
    </Form.Provider>
  );
}

export default CampaignCreation;
