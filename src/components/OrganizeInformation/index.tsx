import React, { useState } from 'react';
import { Form, Image, Spin } from 'antd';
import { usePopUpContext } from '@/context/PopUpContext';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { TypeTokenPayment } from '@/types/paymentCard.type';
import { CompaniesParams, useUpdateCompaniesMutation } from '@/redux/endpoints/companies';
import { useLazyMeQuery } from '@/redux/endpoints/auth';
import toastMessage from '@/utils/func/toastMessage';
import { getErrorMessage } from '@/utils/func/getErrorMessage';
import BasicInput from '../common/BasicInput';
import UploadButton from '../common/UploadButton';
import PopUpCreditOrDebitCard from './PopUpCreditOrDebitCard';
import CButtonShadow from '../common/CButtonShadow';
import CButtonClassic from '../common/CButtonClassic';

function OrganizeInformation() {
  const [form] = Form.useForm();
  const { openPopUp } = usePopUpContext();
  const { user } = useSelector((state: RootState) => state.auth);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<TypeTokenPayment | undefined>(undefined);
  const [trigger, { isLoading: loadingUpdate }] = useUpdateCompaniesMutation();
  const [triggerMe] = useLazyMeQuery();

  return (
    <Spin spinning={loadingUpdate}>
      <Form
        className="px-[48px] pb-[100px]"
        form={form}
        onFinish={(e) => {
          const obj: CompaniesParams = {
            companyId: String(user?.companyId),
            name: e.name,
            email: e.email,
            companyImage: e.companyImage,
            cardInfo:
              paymentMethod &&
              JSON.stringify({
                cardholderName: paymentMethod?.cardholderName,
                lastFour: paymentMethod?.details?.card.last4,
                cardBrand: paymentMethod?.details?.card.brand,
              }),
            sourceId: paymentMethod?.token,
          };
          Object.keys(obj).forEach((key) => {
            if (obj[key] === null || obj[key] === undefined) {
              delete obj[key];
            }
          });

          trigger(obj)
            .unwrap()
            .then(() => {
              triggerMe()
                .unwrap()
                .then(() => {
                  setIsEdit(false);
                });

              toastMessage('更新に成功です。', 'success');
            })
            .catch((error) => toastMessage(getErrorMessage(error), 'error'));
        }}
      >
        <div className="border-b-2 border-[#2D3648]  py-[24px]">
          <span className="text-[32px] font-bold">組織情報</span>
        </div>
        <div className="bg-white rounded-[16px] p-[48px] mt-[56px]">
          {user?.isRequestMemberCompany || user?.companyId === null ? (
            <div className="text-center text-[#ccc]">データがありません!</div>
          ) : (
            <div className="flex flex-col space-y-[32px]">
              <div className="flex flex-col space-y-[16px]">
                <span className="text-[18px] font-bold text-[#04AFAF] leading-[16px]">組織名</span>
                {isEdit ? (
                  <Form.Item initialValue={user?.memberCompany?.name} name="name">
                    <BasicInput />
                  </Form.Item>
                ) : (
                  <span className="text-[16px] leading-[24px]">{user?.memberCompany?.name}</span>
                )}
              </div>
              <div className="flex flex-col space-y-[16px]">
                <span className="text-[18px] font-bold text-[#04AFAF] leading-[16px]">組織ID</span>
                <span className="text-[16px] leading-[24px]">{user?.memberCompany?.code}</span>
              </div>
              <div className="flex flex-col space-y-[16px]">
                <span className="text-[18px] font-bold text-[#04AFAF] leading-[16px]">組織 代表メールアドレス </span>
                {isEdit ? (
                  <Form.Item initialValue={user?.memberCompany?.email?.email} name="email">
                    <BasicInput />
                  </Form.Item>
                ) : (
                  <span className="text-[16px] leading-[24px]">{user?.memberCompany?.email?.email}</span>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-[18px] font-bold text-[#04AFAF] leading-[16px]">ロゴ</span>
                {isEdit ? (
                  <div className="mt-[12px]">
                    <Form.Item initialValue={user?.memberCompany.image} name="companyImage" noStyle>
                      <UploadButton className="w-[175px]" />
                    </Form.Item>
                  </div>
                ) : (
                  <div className="mt-[12px] w-[189px] h-[56px] ">
                    <Image
                      alt="image"
                      className="object-cover"
                      crossOrigin="anonymous"
                      height="56px"
                      preview={false}
                      src={user?.memberCompany?.image?.imageUrl}
                      width="189px"
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-col space-y-[16px] pb-[24px]">
                <span className="text-[18px] font-bold text-[#04AFAF] leading-[16px]">支払方法</span>
                {!isEdit ? (
                  <div className="flex flex-col text-[16px] leading-[24px] space-y-[20px]">
                    <span>{user?.memberCompany?.cardInfo?.cardBrand}</span>
                    <span>末尾が••••{user?.memberCompany?.cardInfo?.lastFour}のクレジットカード</span>
                  </div>
                ) : (
                  <div className="flex flex-col text-[16px] leading-[24px] space-y-[20px]">
                    <span>
                      {paymentMethod ? paymentMethod.details.card.brand : user?.memberCompany?.cardInfo?.cardBrand}
                    </span>
                    <span>
                      末尾が••••
                      {paymentMethod ? paymentMethod.details.card.last4 : user?.memberCompany?.cardInfo?.lastFour}
                      のクレジットカード
                    </span>
                  </div>
                )}
                {isEdit && (
                  <CButtonClassic
                    customClassName="!rounded-[6px] !w-[90px] !h-[47px] !text-[14px] "
                    onClick={() =>
                      openPopUp({
                        contents: <PopUpCreditOrDebitCard getCardPayment={(value) => setPaymentMethod(value)} />,
                      })
                    }
                    title="編集"
                  />
                )}
              </div>
            </div>
          )}
        </div>
        {!(user?.isRequestMemberCompany || user?.companyId === null) && (
          <div className=" pt-[48px]  h-full flex space-x-[24px] items-center justify-center">
            {isEdit && (
              <div className="w-[146px]  h-[56px]">
                <CButtonShadow
                  classBgColor="bg-main-text"
                  classRounded="rounded-[6px]"
                  classShadowColor="bg-white"
                  onClick={() => setIsEdit(false)}
                  shadowSize="normal"
                  title="キャンセル"
                />
              </div>
            )}
            <div className="w-[146px]  h-[56px]">
              <CButtonShadow
                classBgColor="bg-white"
                classRounded="rounded-[6px]"
                classShadowColor="bg-main-text"
                onClick={() => {
                  if (!isEdit) {
                    setIsEdit(true);
                  } else if (user?.companyRole.membership === 'MEMBER') {
                    toastMessage('組織情報を変更できるのは管理者だけです。', 'error');
                  } else {
                    form.submit();
                  }
                }}
                shadowSize="normal"
                textClass="bg-main-text"
                title={isEdit ? '保存' : '編集する'}
              />
            </div>
          </div>
        )}
      </Form>
    </Spin>
  );
}

export default OrganizeInformation;
