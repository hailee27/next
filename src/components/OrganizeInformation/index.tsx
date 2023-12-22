import { Form, Image } from 'antd';
import React, { useState } from 'react';
import { usePopUpContext } from '@/context/PopUpContext';
import BasicButton from '../common/BasicButton';
import BasicInput from '../common/BasicInput';
import UploadButton from '../common/UploadButton';

function OrganizeInformation() {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { openPopUp } = usePopUpContext();
  return (
    <Form>
      <div className="border-b-2 border-[#2D3648] px-[80px] py-[32px]">
        <span className="text-[32px] font-bold">組織情報</span>
      </div>
      <div className="border-2 border-[#2D3648] my-[31px] mx-[50px] rounded-[4px] p-[40px]">
        <div className="flex flex-col space-y-[24px]">
          <div className="flex flex-col space-y-[8px]">
            <span className="text-[14px] font-semibold leading-[16px]">組織名</span>
            {isEdit ? (
              <Form.Item>
                <BasicInput />
              </Form.Item>
            ) : (
              <span className="p-[12px] h-[48px] text-[16px] leading-[24px]">ONE.course</span>
            )}
          </div>
          <div className="flex flex-col space-y-[8px]">
            <span className="text-[14px] font-semibold leading-[16px]">組織ID</span>
            <span className="p-[12px] h-[48px] text-[16px] leading-[24px]">one-course</span>
          </div>
          <div className="flex flex-col space-y-[8px]">
            <span className="text-[14px] font-semibold leading-[16px]">組織 代表メールアドレス ※必須</span>
            {isEdit ? (
              <Form.Item>
                <BasicInput />
              </Form.Item>
            ) : (
              <span className="p-[12px] m-[12px] h-[48px] text-[16px] leading-[24px]">one-course@gmail.com</span>
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-[14px] font-semibold leading-[16px]">ロゴ</span>
            {isEdit ? (
              <div className="mt-[12px]">
                <UploadButton className="w-[175px]" />
              </div>
            ) : (
              <div className="mt-[12px] w-[471px] h-[220px] border-2 border-[#2D3648]">
                <Image alt="" height="100%" preview={false} src="/assets/images/ImagePlaceholder.png" width="100%" />
              </div>
            )}
          </div>
          <div className="flex flex-col space-y-[8px] pb-[24px]">
            <span className="text-[14px] font-semibold leading-[16px]">組織 代表メールアドレス ※必須</span>
            <div className="p-[12px] flex flex-col text-[16px] leading-[24px] space-y-[20px]">
              <span>Mastercard</span>
              <span>末尾が•••• 7274のクレジットカード</span>
            </div>
            <span
              className="text-[14px] text-[#4158D0] cursor-pointer "
              onClick={() => openPopUp()}
              onKeyPress={undefined}
              role="button"
              tabIndex={0}
            >
              編集
            </span>
          </div>
          <div className="border-t-2 border-[#2D3648] pt-[48px]  h-full flex space-x-[24px]">
            {isEdit && (
              <BasicButton onClick={() => setIsEdit(false)} type="primary">
                キャンセル
              </BasicButton>
            )}
            <BasicButton className="h-[56px] w-[84px] " onClick={() => setIsEdit(true)}>
              編集
            </BasicButton>
          </div>
        </div>
      </div>
    </Form>
  );
}

export default OrganizeInformation;
