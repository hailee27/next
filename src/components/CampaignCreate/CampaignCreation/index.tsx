import React, { useState } from 'react';
import type { TabsProps } from 'antd';
import { Form, Spin } from 'antd';
import { useRouter } from 'next/router';
import BasicTabs from '@/components/common/BasicTabs';
import BasicButton from '@/components/common/BasicButton';
import { usePostQuestsMutation } from '@/redux/endpoints/campaign';
import { TypeResponseFormCampaign } from '@/types/campaign.type';
import toastMessage from '@/utils/func/toastMessage';
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

  return (
    <Form.Provider
      onFormFinish={(name, { forms }) => {
        let queryParams: TypeResponseFormCampaign = {};
        setTab((prev) => String(Number(prev) + 1));
        if (tab === '4') {
          setTab('4');
        }
        window.scrollTo({ behavior: 'smooth', top: 0 });
        if (name === 'reWard') {
          router.push({ query: { query: JSON.stringify({ typeWinner: forms[name].getFieldValue('typeWinner') }) } });
        }
        if (name === 'confirm') {
          queryParams = {
            ...forms?.setUp?.getFieldsValue(),
            ...forms?.tasks?.getFieldsValue(),
            ...forms?.reWard?.getFieldsValue(),
          };
          trigger({
            title: queryParams.campainName ?? '',
            category: queryParams.category ?? '',
            dontSetExpiredTime: String(queryParams.noDate) ?? false,
            startTime: queryParams.startDate ?? '',
            expiredTime: queryParams.endDate ?? ' ',
            tasks: JSON.stringify(
              Object.values(queryParams?.optionTasks ?? {}).map((e) => ({
                type: e.platForm,
                taskActionType: e?.type ?? 'NONE',
                taskTemplate: { name: e },
              }))
            ),
            methodOfselectWinners: queryParams.typeWinner ?? 'AUTO_PRIZEE_DRAW',
            totalNumberOfUsersAllowedToWork: String(queryParams.numberOfParticipants),
            campaignReward: JSON.stringify(
              [
                {
                  type: queryParams.requireTask?.platForm,
                  taskActionType: queryParams.requireTask?.type,
                  taskTemplate: { name: queryParams.requireTask },
                },
              ].concat(
                Object.values(queryParams?.optionTasks ?? {}).map((e) => ({
                  type: e.platForm,
                  taskActionType: e?.type ?? 'NONE',
                  taskTemplate: { name: e },
                }))
              )
            ),
            numberOfPrizes: String(queryParams.totalTicket),
            totalPrizeValue: String(queryParams.totalReWard),
            settingForNotWin: String(queryParams.statusCampaign) ?? false,
            description: queryParams.explanatoryText ?? '',
            note: queryParams.compensationSummary ?? 'NONE',
            campaignImage: queryParams.thumbnail,
          })
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
        <Spin spinning={isLoading}>
          <BasicTabs activeKey={tab} items={items} onChange={(e) => setTab(e)} />
        </Spin>
      </div>
    </Form.Provider>
  );
}

export default CampaignCreation;
