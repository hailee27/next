import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';
import { Form, Spin } from 'antd';
import type { TabsProps } from 'antd';
import BasicTabs from '@/components/common/BasicTabs';
import { useDeleteCampaignMutation } from '@/redux/endpoints/campaign';
import { TypeResponseFormCampaign } from '@/types/campaign.type';
import { StepContext, TypeTabContext } from '@/context/TabContext';
import { useGetMasterDataQuery } from '@/redux/endpoints/masterData';
import CButtonShadow from '@/components/common/CButtonShadow';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useCampaignApiContext } from '@/context/CampaignApiContext';
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
    label: '確認・購入',
    children: <Confirmation />,
    forceRender: true,
    destroyInactiveTabPane: true,
  },
];

function CampaignCreation() {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const [tab, setTab] = useState<string>('1');
  const { handleCreateCampaign, handleUpdateCampaign, isLoadingCreate, isLoadingUpdate } = useCampaignApiContext();
  const [deleteCampaign] = useDeleteCampaignMutation();
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
        // await forms[name].validateFields();
        if (name !== 'delete' && name !== 'preview' && name !== 'saveDraft') {
          setTab((prev) => String(Number(prev) + 1));
        }
        if (tab === '4') {
          setTab('4');
        }
        let queryParams: TypeResponseFormCampaign = {};
        queryParams = {
          ...forms?.setUp?.getFieldsValue(),
          ...forms?.tasks?.getFieldsValue(),
          ...forms?.confirm?.getFieldsValue(),
          ...forms?.reWard?.getFieldsValue(),
        };
        // PASS VALUE TO FROM CONFIRM
        forms?.confirm?.setFieldsValue({
          nameCampagin: queryParams.campainName,
          typeCampagin: dataMaster?.CATEGORY_CAMPAIGN.find((e) => e.value === queryParams.category)?.label,
          dateCampagin: queryParams.noDate
            ? moment(String(queryParams.startDate)).format('YYYY/MM/DD HH:mm')
            : `${moment(String(queryParams.startDate)).format('YYYY/MM/DD HH:mm')} 〜 ${moment(
                String(queryParams.endDate)
              ).format('YYYY/MM/DD  HH:mm')} `,
          typeWinner: queryParams.typeWinner,
          status: '下書き',
          campaginCreator: user?.email?.email,
        });
        if (queryParams.typeWinner === 'AUTO_PRIZEE_DRAW') {
          forms?.confirm?.setFieldValue('tableReward', queryParams?.reWard);
          forms?.confirm?.setFieldValue('price', queryParams.totalReWard);
          forms?.confirm?.setFieldValue('totalWinner', queryParams.numberOfParticipants);
        } else {
          forms?.confirm?.setFieldValue('compensationSummary', queryParams?.compensationSummary);
        }

        // SAVE
        if (name === 'confirm') {
          if (router.query.id) {
            if (queryParams.typeWinner === 'AUTO_PRIZEE_DRAW') {
              handleUpdateCampaign(String(router.query.id), queryParams, 'DRAFT', 'CREATE');
            } else {
              handleUpdateCampaign(String(router.query.id), queryParams, 'WAITING_FOR_PUBLICATION');
            }
          } else if (queryParams.typeWinner === 'AUTO_PRIZEE_DRAW') {
            handleCreateCampaign(queryParams, 'UNDER_REVIEW');
          } else {
            handleCreateCampaign(queryParams, 'WAITING_FOR_PUBLICATION');
          }
        }

        // SAVE DRAFT
        if (name === 'saveDraft') {
          if (router.query.id) {
            handleUpdateCampaign(String(router.query.id), queryParams, 'DRAFT');
          } else {
            handleCreateCampaign(queryParams, 'DRAFT');
          }
        }

        // DELETE
        if (name === 'delete') {
          if (router.query.id) {
            deleteCampaign({ campaignId: String(router.query.id) })
              .unwrap()
              .then(() => router.push('/campaign-creator/list'));
          } else {
            router.push('/campaign-creator/list');
          }
        }
        window.scrollTo({ behavior: 'smooth', top: 0 });
      }}
    >
      <div className="px-[48px]">
        <div className="flex  py-[24px] w-full item justify-between border-b-2 border-[#2D3648] max-h-[112px] font-notoSans">
          <span className="text-[32px] font-bold">キャンペーン作成</span>
          <div className="flex space-x-[16px]">
            <Form name="delete">
              <div className="w-[135px] h-[56px]">
                <CButtonShadow
                  classBgColor="bg-white"
                  classRounded="rounded-[6px]"
                  classShadowColor="bg-main-text"
                  shadowSize="normal"
                  textClass="bg-main-text"
                  title="削除"
                  type="submit"
                  withIcon={{
                    position: 'left',
                    icon: (
                      <svg fill="none" height="18" viewBox="0 0 18 18" width="18" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M3 15.5V5H15V15.5C15 16.3438 14.3125 17 13.5 17H4.5C3.65625 17 3 16.3438 3 15.5ZM11.5 7.5V14.5C11.5 14.7812 11.7188 15 12 15C12.25 15 12.5 14.7812 12.5 14.5V7.5C12.5 7.25 12.25 7 12 7C11.7188 7 11.5 7.25 11.5 7.5ZM8.5 7.5V14.5C8.5 14.7812 8.71875 15 9 15C9.25 15 9.5 14.7812 9.5 14.5V7.5C9.5 7.25 9.25 7 9 7C8.71875 7 8.5 7.25 8.5 7.5ZM5.5 7.5V14.5C5.5 14.7812 5.71875 15 6 15C6.25 15 6.5 14.7812 6.5 14.5V7.5C6.5 7.25 6.25 7 6 7C5.71875 7 5.5 7.25 5.5 7.5ZM15.5 2C15.75 2 16 2.25 16 2.5V3.5C16 3.78125 15.75 4 15.5 4H2.5C2.21875 4 2 3.78125 2 3.5V2.5C2 2.25 2.21875 2 2.5 2H6.25L6.53125 1.4375C6.65625 1.1875 6.90625 1 7.1875 1H10.7812C11.0625 1 11.3125 1.1875 11.4375 1.4375L11.75 2H15.5Z"
                          fill="#333333"
                        />
                      </svg>
                    ),
                  }}
                />
              </div>
            </Form>
            <Form name="preview">
              <div className="w-[184px]  h-[56px]">
                <CButtonShadow
                  classBgColor="bg-white"
                  classRounded="rounded-[6px]"
                  classShadowColor="bg-main-text"
                  shadowSize="normal"
                  textClass="bg-main-text"
                  title="プレビュー"
                  type="submit"
                  withIcon={{
                    position: 'left',
                    icon: (
                      <svg fill="none" height="18" viewBox="0 0 18 18" width="18" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M15 4.8125V5H11V1H11.1875C11.375 1 11.5625 1.09375 11.7188 1.25L14.75 4.28125C14.9062 4.4375 15 4.625 15 4.8125ZM10.75 6H15V16.25C15 16.6875 14.6562 17 14.25 17H3.75C3.3125 17 3 16.6875 3 16.25V1.75C3 1.34375 3.3125 1 3.75 1H10V5.25C10 5.6875 10.3125 6 10.75 6ZM6.5 6.5C5.6875 6.5 5 7.1875 5 8C5 8.84375 5.6875 9.5 6.5 9.5C7.34375 9.5 8 8.84375 8 8C8 7.1875 7.34375 6.5 6.5 6.5ZM13 14V10.5L11.7812 9.28125C11.625 9.125 11.375 9.125 11.25 9.28125L8 12.5L6.78125 11.2812C6.625 11.125 6.40625 11.125 6.25 11.25L5.03125 12.5L5 14H13Z"
                          fill="#333333"
                        />
                      </svg>
                    ),
                  }}
                />
              </div>
            </Form>
            <Form name="saveDraft">
              <div className="w-[184px]  h-[56px]">
                <CButtonShadow
                  classBgColor="bg-main-text"
                  classRounded="rounded-[6px]"
                  classShadowColor="bg-white"
                  shadowSize="normal"
                  title="下書き保存"
                  type="submit"
                  withIcon={{
                    position: 'left',
                    icon: (
                      <svg fill="none" height="18" viewBox="0 0 18 18" width="18" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M0 3C0 1.90625 0.875 1 2 1H7V5C7 5.5625 7.4375 6 8 6H12V10.375L9.03125 13.3438C8.78125 13.5938 8.59375 13.9062 8.5 14.2812L8.03125 16.1562C7.96875 16.4375 7.96875 16.75 8.0625 17H2C0.875 17 0 16.125 0 15V3ZM8 5V1L12 5H8ZM17.625 8.84375C18.0938 9.3125 18.0938 10.0938 17.625 10.5938L16.6875 11.5312L14.4688 9.3125L15.4062 8.375C15.875 7.90625 16.6875 7.90625 17.1562 8.375L17.625 8.84375ZM9.71875 14.0312L13.7812 10L16 12.2188L11.9375 16.25C11.8125 16.375 11.6562 16.4688 11.5 16.5312L9.59375 17C9.4375 17.0312 9.25 17 9.125 16.875C9 16.75 8.96875 16.5625 9 16.375L9.46875 14.5C9.5 14.3438 9.59375 14.1875 9.71875 14.0312Z"
                          fill="white"
                        />
                      </svg>
                    ),
                  }}
                />
              </div>
            </Form>
          </div>
        </div>
        <div className="pt-[28px] pb-[55px]">
          <Spin spinning={isLoadingCreate || isLoadingUpdate}>
            <StepContext.Provider value={valueContext}>
              <BasicTabs activeKey={tab} items={items} onChange={(e) => setTab(e)} />
            </StepContext.Provider>
          </Spin>
        </div>
      </div>
    </Form.Provider>
  );
}

export default CampaignCreation;
