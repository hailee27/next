import { Form, Image } from 'antd';
import React, { useState } from 'react';
import { usePopUpContext } from '@/context/PopUpContext';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import BasicButton from '../common/BasicButton';
import BasicInput from '../common/BasicInput';
import UploadButton from '../common/UploadButton';
import PopUpCreditOrDebitCard from './PopUpCreditOrDebitCard';
import CButtonShadow from '../common/CButtonShadow';

function OrganizeInformation() {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { openPopUp } = usePopUpContext();
  const { user } = useSelector((state: RootState) => state.auth);
  // const initialValue = useMemo(()=>({

  // }),[])

  return (
    <Form className="px-[48px] pb-[100px]">
      <div className="border-b-2 border-[#2D3648]  py-[24px]">
        <span className="text-[32px] font-bold">組織情報</span>
      </div>
      <div className="bg-white rounded-[16px] p-[48px] mt-[56px]">
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
                <UploadButton className="w-[175px]" />
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
            <div className="flex flex-col text-[16px] leading-[24px] space-y-[20px]">
              <span>{user?.memberCompany?.cardInfo?.cardBrand}</span>
              <span>末尾が••••{user?.memberCompany?.cardInfo?.lastFour}のクレジットカード</span>
            </div>
            {isEdit && (
              <span
                className="text-[18px] font-bold text-[#04AFAF]] cursor-pointer "
                onClick={() => openPopUp({ contents: <PopUpCreditOrDebitCard /> })}
                onKeyPress={undefined}
                role="button"
                tabIndex={0}
              >
                編集
              </span>
            )}
          </div>
        </div>
      </div>
      <div className=" pt-[48px]  h-full flex space-x-[24px] items-center justify-center">
        {isEdit && (
          <BasicButton onClick={() => setIsEdit(false)} type="primary">
            キャンセル
          </BasicButton>
        )}
        <div className="w-[146px]  h-[56px]">
          <CButtonShadow
            classBgColor="bg-white"
            classRounded="rounded-[6px]"
            classShadowColor="bg-main-text"
            onClick={() => setIsEdit(true)}
            shadowSize="normal"
            textClass="bg-main-text"
            title="編集する"
          />
        </div>
        {/* <BasicButton className="h-[56px] w-[84px] " onClick={() => setIsEdit(true)}>
          編集
        </BasicButton> */}
      </div>
    </Form>
  );
}

export default OrganizeInformation;
