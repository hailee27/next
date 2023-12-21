import React, { useState } from 'react';
import type { TabsProps } from 'antd';
import { Form } from 'antd';
import { useRouter } from 'next/router';
import BasicTabs from '@/components/common/BasicTabs';
import BasicButton from '@/components/common/BasicButton';
import { usePostQuestsMutation } from '@/redux/endpoints/campaign';
import { TypeResponseFormCampaign } from '@/types/campaign.type';
import ReWard from './ReWard';
import Confirmation from './Confirmation';
import Setup from './Setup';
import Task from './Task';

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
function CampaignCreation() {
  const router = useRouter();
  const [tab, setTab] = useState<string>('1');
  const [trigger] = usePostQuestsMutation();

  return (
    <Form.Provider
      onFormFinish={(name, { forms }) => {
        let queryParams: TypeResponseFormCampaign = {};
        setTab((prev) => String(Number(prev) + 1));
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
            expiredTime: queryParams.endDate ?? '',
            tasks: JSON.stringify(
              Object.values(queryParams?.optionTasks ?? {}).map((e) => ({
                type: e.platForm,
                taskActionType: e?.type ?? 'NONE',
                taskTemplate: { name: e },
              }))
              // .concat({
              //   type: 'twitter',
              //   taskActionType: queryParams.requireTask?.type,
              //   taskTemplate: { name: queryParams.requireTask },
              // })
            ),
            methodOfselectWinners: queryParams.typeWinner ?? '',
            totalNumberOfUsersAllowedToWork: String(queryParams.numberOfParticipants),
            questReward: JSON.stringify(
              Object.values(queryParams?.reWard ?? {}).map((e) => ({
                type: e.receivingMethod.amazon ? 'AMAZON_GIFT' : 'PAYPAY_GIFT',
                numbers: e.money,
                order: e.tiketWinning,
              }))
            ),
            numberOfPrizes: String(queryParams.totalTicket),
            totalPrizeValue: String(queryParams.totalReWard),
            settingForNotWin: String(queryParams.statusCampaign) ?? false,
            description: queryParams.explanatoryText ?? '',
            note: 'NONE',
            questImage: queryParams.thumbnail[0],
          });
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
        <BasicTabs activeKey={tab} items={items} onChange={(e) => setTab(e)} />
      </div>
    </Form.Provider>
  );
}

export default CampaignCreation;
