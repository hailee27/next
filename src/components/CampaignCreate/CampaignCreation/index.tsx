import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
import { Form, Spin } from 'antd';
import type { TabsProps } from 'antd';
import BasicTabs from '@/components/common/BasicTabs';
import BasicButton from '@/components/common/BasicButton';
import { usePostCampaignDraftMutation, usePostQuestsMutation } from '@/redux/endpoints/campaign';
import { TypeResponseFormCampaign } from '@/types/campaign.type';
import toastMessage from '@/utils/func/toastMessage';
import adapterCampaignParams from '@/utils/func/adapterCampaignParams';
import { StepContext, TypeTabContext } from '@/context/TabContext';
import { useGetMasterDataQuery } from '@/redux/endpoints/masterData';
import ReWard from './ReWard';
import Confirmation from './Confirmation';
import Setup from './Setup';
import Task from './Task';

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'セットアップ',
    children: <Setup />,
    forceRender: true,
    destroyInactiveTabPane: true,
  },
  {
    key: '2',
    label: 'タスク',
    children: <Task />,
    forceRender: true,
    destroyInactiveTabPane: true,
  },
  {
    key: '3',
    label: '報酬',
    children: <ReWard />,
    forceRender: true,
    destroyInactiveTabPane: true,
  },
  {
    key: '4',
    label: '確認',
    children: <Confirmation />,
    forceRender: true,
    destroyInactiveTabPane: true,
  },
];

function CampaignCreation() {
  const router = useRouter();
  const [tab, setTab] = useState<string>('1');
  const [trigger, { isLoading }] = usePostQuestsMutation();
  const [triggerCampaignDraft] = usePostCampaignDraftMutation();
  const { data: dataMaster } = useGetMasterDataQuery();
  const valueContext = useMemo<TypeTabContext>(
    () => ({
      prevTab: () => setTab((prev) => String(Number(prev) - 1)),
    }),
    [setTab]
  );

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

        if (name === 'saveDraft') {
          triggerCampaignDraft(adapterCampaignParams(queryParams, queryParams.typeWinner))
            .unwrap()
            .then(() => toastMessage('save draft succses', 'success'))
            .catch(() => toastMessage('failed', 'error'));
        }

        forms?.confirm?.setFieldsValue({
          nameCampagin: queryParams.campainName,
          typeCampagin: dataMaster?.CATEGORY_CAMPAIGN.find((e) => e.value === queryParams.category)?.label,
          dateCampagin: queryParams.noDate
            ? moment(String(queryParams.startDate)).format('YYYY/MM/DD')
            : // eslint-disable-next-line no-irregular-whitespace
              `${moment(String(queryParams.startDate)).format('YYYY/MM/DD')}　〜　${moment(
                String(queryParams.endDate)
              ).format('YYYY/MM/DD')} `,
          typeWinner: queryParams.typeWinner ?? 'AUTO_PRIZEE_DRAW',
          // status: String(queryParams.statusCampaign),
          status: '下書き',
          campaginCreator: 'halie',
          // tableReward: { ...queryParams.reWard },
        });
        if (queryParams.typeWinner === 'AUTO_PRIZEE_DRAW') {
          forms?.confirm?.setFieldValue('tableReward', queryParams?.reWard);
        } else {
          forms?.confirm?.setFieldValue('compensationSummary', queryParams?.compensationSummary);
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
        window.scrollTo({ behavior: 'smooth', top: 0 });
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
          <StepContext.Provider value={valueContext}>
            <BasicTabs activeKey={tab} items={items} onChange={(e) => setTab(e)} />
          </StepContext.Provider>
        </Spin>
      </div>
    </Form.Provider>
  );
}

export default CampaignCreation;
