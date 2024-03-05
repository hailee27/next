/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import React, { useContext, useEffect, useState } from 'react';
import { Form, Spin } from 'antd';
import BasicButton from '@/components/common/BasicButton';
// import BasicInput from '@/components/common/BasicInput';
import { StepContext, TypeTabContext } from '@/context/TabContext';
import FlagItem from '@/components/common/FlagItem';
import CButtonShadow from '@/components/common/CButtonShadow';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { formatNumber } from '@/utils/formatNumber';
import PopUpCreditOrDebitCard from '@/components/OrganizeInformation/PopUpCreditOrDebitCard';
import { usePopUpContext } from '@/context/PopUpContext';
import { useUpdateCompaniesMutation } from '@/redux/endpoints/companies';
import { useLazyMeQuery } from '@/redux/endpoints/auth';

import toastMessage from '@/utils/func/toastMessage';
import { useRouter } from 'next/router';
import { useGetDetailCampaignQuery } from '@/redux/endpoints/campaign';
import { useGetMasterDataQuery } from '@/redux/endpoints/masterData';
import moment from 'moment';
import { useGetReWardsQuery } from '@/redux/endpoints/reWard';
import { useCampaignApiContext } from '@/context/CampaignApiContext';
import TableReWard from './TableReWard';

function Confirmation() {
  const router = useRouter();
  const { isLoadingCreatePayment } = useCampaignApiContext();
  const [form] = Form.useForm();
  const { openPopUp } = usePopUpContext();
  const { user } = useSelector((state: RootState) => state.auth);
  const { prevTab } = useContext<TypeTabContext>(StepContext);
  const typeWinnerWatch = Form.useWatch('typeWinner', form);
  const priceWatch = Form.useWatch('price', form);
  const totalWinnerWatch = Form.useWatch('totalWinner', form);
  const [useDepositBalance, setUseDepositBalance] = useState<boolean>(false);
  const [totalPaymentAmount, setTotalPaymentAmount] = useState<number>(0);
  const [tax, setTax] = useState<number>(0);
  const [fee, setFee] = useState<number>(0);
  const [trigger, { isLoading: loadingUpdate }] = useUpdateCompaniesMutation();
  const [triggerMe] = useLazyMeQuery();
  const { data: dataReward } = useGetReWardsQuery(
    { campaignId: String(router?.query?.id) },
    { skip: !router?.query?.id, refetchOnMountOrArgChange: true }
  );
  const { data: dataCampaign } = useGetDetailCampaignQuery(
    { campaignId: String(router?.query?.id) },
    { skip: !router?.query?.id }
  );
  const { data: masterData } = useGetMasterDataQuery(undefined, { skip: !router?.query?.id });

  useEffect(() => {
    if (priceWatch) {
      setFee((priceWatch * 5) / 100);
      setTax((fee * 10) / 100);
      setTotalPaymentAmount(priceWatch + fee + tax);
    }
  }, [priceWatch, fee, tax]);

  useEffect(() => {
    if (totalPaymentAmount && totalPaymentAmount >= 0) {
      form.setFieldValue('priceWithTax', totalPaymentAmount);
    } else {
      form.setFieldValue('priceWithTax', 0);
    }
  }, [totalPaymentAmount]);

  useEffect(() => {
    if (dataCampaign && masterData && dataReward) {
      form.setFieldsValue({
        nameCampagin: dataCampaign.title,
        typeCampagin: masterData?.CATEGORY_CAMPAIGN.find((e) => e.value === dataCampaign.category)?.label,
        dateCampagin: !dataCampaign.expiredTime
          ? `${moment(dataCampaign.startTime).format('YYYY/MM/DD HH:mm')}`
          : `${moment(dataCampaign.startTime).format('YYYY/MM/DD HH:mm')} ~ ${moment(dataCampaign.expiredTime).format(
              'YYYY/MM/DD HH:mm'
            )}`,
        typeWinner: dataCampaign.methodOfselectWinners,
        campaginCreator: dataCampaign.createdUser.email.email,
        price: dataReward?.rewards
          ?.map((e) => e.amountOfMoney * e.numberOfWinningTicket)
          ?.reduce((prev, cur) => prev + cur, 0),
      });
    }
  }, [dataCampaign, masterData, dataReward]);

  return (
    <Spin spinning={loadingUpdate}>
      <div className="bg-white rounded-[4px] mt-[16px] md:p-[40px] p-[24px]">
        <Form form={form} name="confirm">
          <div className="mt-[24px] grid md:grid-cols-3 grid-cols-1 gap-y-[24px]">
            <div className="flex flex-col space-y-[8px]">
              <span className="text-[16px] font-bold border-l-2 border-[#04AFAF] h-[24px] pl-[14px]">
                キャンペーン名
              </span>
              <Form.Item name="nameCampagin" noStyle>
                <FlagItem className="pl-[16px]" />
              </Form.Item>
            </div>

            <div className="flex flex-col space-y-[8px]">
              <span className="text-[16px] font-bold border-l-2 border-[#04AFAF] h-[24px] pl-[14px]">カテゴリー</span>
              <Form.Item name="typeCampagin" noStyle>
                <FlagItem className="pl-[16px]" />
              </Form.Item>
            </div>
            <div className="flex flex-col space-y-[8px]">
              <span className="text-[16px] font-bold border-l-2 border-[#04AFAF] h-[24px] pl-[14px]">
                キャンペーン期間
              </span>
              <Form.Item initialValue="2023/12/1〜2023/12/25" name="dateCampagin" noStyle>
                <FlagItem className="pl-[16px]" />
              </Form.Item>
            </div>
            <div className="flex flex-col space-y-[8px]">
              <span className="text-[16px] font-bold border-l-2 border-[#04AFAF] h-[24px] pl-[14px]">
                当選者選定方法
              </span>
              <Form.Item initialValue={typeWinnerWatch} name="typeWinner" noStyle>
                <FlagItem className="hidden" />
              </Form.Item>
              <span className="pl-[16px]  text-[16px] leading-[24px]">
                {typeWinnerWatch === 'AUTO_PRIZEE_DRAW' ? 'インスタントウィン' : 'マニュアル'}
              </span>
            </div>
            <div className="flex flex-col space-y-[8px]">
              <span className="text-[16px] font-bold border-l-2 border-[#04AFAF] h-[24px] pl-[14px]">
                現在のステータス
              </span>
              <Form.Item initialValue="下書き" name="status" noStyle>
                <FlagItem className="pl-[16px]" />
              </Form.Item>
            </div>
            <div className="flex flex-col space-y-[8px]">
              <span className="text-[16px] font-bold border-l-2 border-[#04AFAF] h-[24px] pl-[14px]">
                キャンペーン作成者
              </span>
              <Form.Item initialValue={user?.email.email} name="campaginCreator" noStyle>
                <FlagItem className="pl-[16px]" />
              </Form.Item>
            </div>
          </div>
          <div className="w-full mt-[24px]">
            {typeWinnerWatch === 'AUTO_PRIZEE_DRAW' ? (
              <>
                <Form.Item className="!hidden" name="priceWithTax">
                  <FlagItem />
                </Form.Item>
                <Form.Item className="!hidden" initialValue={false} name="usePoint">
                  <FlagItem />
                </Form.Item>
                <Form.Item className="!hidden" name="totalWinner">
                  <FlagItem />
                </Form.Item>
                <div className="text-[14px] font-semibold mb-[8px]">報酬</div>
                <Form.Item name="tableReward">
                  <TableReWard totalWinner={totalWinnerWatch} />
                </Form.Item>
                <div className="flex flex-col mt-[24px]">
                  <span className="text-[16px] font-semibold leading-[24px]">
                    すべてのあたりが当選したあと、キャンペーンを終了する
                  </span>
                  <span className="p-[12px] h-[48px] text-[16px] leading-[24px]">終了する</span>
                </div>
                <div className="flex flex-col mt-[24px]">
                  <span className="text-[16px] font-semibold leading-[20px]">支払方法</span>
                  <div className="flex flex-col p-[12px] space-y-[18px] text-[16px]  leading-[24px]">
                    <span className="font-semibold">{user?.memberCompany.cardInfo.cardBrand}</span>
                    <span>末尾が•••• {user?.memberCompany.cardInfo.lastFour}のクレジットカード</span>
                  </div>
                  <span
                    className="text-[#4158D0] cursor-pointer"
                    onClick={() =>
                      openPopUp({
                        contents: (
                          <PopUpCreditOrDebitCard
                            getCardPayment={(value) =>
                              trigger({
                                companyId: String(user?.companyId),
                                cardInfo: JSON.stringify({
                                  cardholderName: value?.cardholderName,
                                  lastFour: value?.details?.card.last4,
                                  cardBrand: value?.details?.card.brand,
                                }),
                                sourceId: value?.token,
                              })
                                .unwrap()
                                .then(() => {
                                  triggerMe();
                                  toastMessage('更新に成功です。', 'success');
                                })
                            }
                          />
                        ),
                      })
                    }
                    onKeyPress={undefined}
                    role="button"
                    tabIndex={0}
                  >
                    編集
                  </span>
                </div>
                <div className="mt-[24px]">
                  <span className="text-[14px] font-semibold leading-[16px]">
                    デポジット残高 ※ {formatNumber(user?.memberCompany?.pointTotal ?? 0, true, 1)}円利用可能
                  </span>
                  <div className="flex space-x-[8px] mt-[8px]">
                    <div className="w-[210px] h-[50px] border-2 rounded-[6px] border-[#333]">
                      <Form.Item initialValue={user?.memberCompany?.pointTotal ?? 0} name="depositBalance" noStyle>
                        <FlagItem className="flex items-center  h-full p-[24px]" />
                      </Form.Item>
                    </div>
                    <BasicButton
                      className={`${useDepositBalance && 'pointer-events-none'}`}
                      disabled={useDepositBalance}
                      onClick={(e) => {
                        e.preventDefault();
                        setUseDepositBalance(true);
                        form.setFieldValue('usePoint', true);
                        setTotalPaymentAmount(totalPaymentAmount - Number(user?.memberCompany?.pointTotal ?? 0));
                      }}
                      type="primary"
                    >
                      適用
                    </BasicButton>
                  </div>
                </div>
                <div className="mt-[24px]">
                  <div className="text-[16px] items-center flex font-bold leading-[24px]">
                    支払い金額合計:&ensp;
                    {formatNumber(totalPaymentAmount && totalPaymentAmount >= 0 ? totalPaymentAmount : 0, true, 1)} 円
                  </div>
                  <div className="flex flex-col space-y-[32px] text-[16px] pt-[12px]">
                    <div className="flex items-center">
                      ギフト代金:&nbsp;
                      <Form.Item className="!m-0" name="price">
                        <FlagItem className="text-[16px]" type="number" />
                      </Form.Item>
                      円
                    </div>
                    <span>手数料: {formatNumber(fee, true, 1)}円</span>
                    <span>消費税: {formatNumber(tax, true, 1)}円</span>
                    <span>デポジット残高利用: {useDepositBalance ? user?.memberCompany?.pointTotal : 0}円</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="h-[217px]">
                <div className="text-[14px] font-semibold leading-[24px]">
                  報酬要約文（TOPページ、及び、一覧ページに表示されます）※100文字以内
                </div>
                <Form.Item name="compensationSummary">
                  <FlagItem className="mt-[8px] px-[12px]" />
                </Form.Item>
              </div>
            )}
          </div>
        </Form>
      </div>
      <div className="flex space-x-[24px] pt-[48px] justify-center">
        <div className="w-[135px]  h-[56px]">
          <CButtonShadow
            classBgColor="bg-white"
            classRounded="rounded-[6px]"
            classShadowColor="bg-main-text"
            onClick={() => prevTab?.()}
            shadowSize="normal"
            textClass="bg-main-text"
            title="戻る"
            withIcon={{
              position: 'left',
              icon: (
                <svg fill="none" height="18" viewBox="0 0 18 18" width="18" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10.0469 14.7422L9.35938 15.4297C9.04688 15.7109 8.57812 15.7109 8.29688 15.4297L2.23438 9.33594C1.92188 9.05469 1.92188 8.58594 2.23438 8.30469L8.29688 2.21094C8.57812 1.92969 9.07812 1.92969 9.35938 2.21094L10.0469 2.89844C10.3594 3.21094 10.3281 3.67969 10.0469 3.99219L6.26562 7.55469H15.2656C15.6719 7.55469 16.0156 7.89844 16.0156 8.30469V9.30469C16.0156 9.74219 15.6719 10.0547 15.2656 10.0547H6.26562L10.0469 13.6484C10.3281 13.9609 10.3594 14.4297 10.0469 14.7422Z"
                    fill="#333333"
                  />
                </svg>
              ),
            }}
          />
        </div>
        {user?.companyRole.membership === 'MANAGER' && (
          <div className="w-[233px]  h-[56px]">
            <CButtonShadow
              classBgColor="bg-main-text"
              classRounded="rounded-[6px]"
              classShadowColor="bg-white"
              isDisable={isLoadingCreatePayment}
              onClick={() => form.submit()}
              shadowSize="normal"
              title="上記の内容で購入する"
              withIcon={{
                position: 'right',
                icon: (
                  <svg fill="none" height="18" viewBox="0 0 18 18" width="18" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7.9375 2.89844L8.625 2.21094C8.9375 1.92969 9.40625 1.92969 9.6875 2.21094L15.7812 8.27344C16.0625 8.58594 16.0625 9.05469 15.7812 9.33594L9.6875 15.4297C9.40625 15.7109 8.9375 15.7109 8.625 15.4297L7.9375 14.7422C7.65625 14.4297 7.65625 13.9609 7.9375 13.6484L11.7188 10.0547H2.75C2.3125 10.0547 2 9.74219 2 9.30469V8.30469C2 7.89844 2.3125 7.55469 2.75 7.55469H11.7188L7.9375 3.99219C7.65625 3.67969 7.625 3.21094 7.9375 2.89844Z"
                      fill="white"
                    />
                  </svg>
                ),
              }}
            />
          </div>
        )}
      </div>
    </Spin>
  );
}

export default Confirmation;
