/* eslint-disable no-console */
import React from 'react';
import { usePopUpContext } from '@/context/PopUpContext';
import { Form } from 'antd';
import InputLabel from '../common/BasicInput/InputLabel';
import BasicSelect from '../common/BasicSelect';
import CButtonShadow from '../common/CButtonShadow';

function PopUpCreditOrDebitCard() {
  const { closePopUp } = usePopUpContext();
  return (
    <div className="p-[64px] w-[928px]">
      <Form onFinish={(e) => console.log(e)}>
        <div className="font-bold text-[#04AFAF] text-[20px] text-center">
          クレジットカードまたはデビットカードを変更
        </div>
        <div className="mt-[40px]  flex flex-col space-y-[24px]">
          <InputLabel label="カードの名義" noStyle placeholder="ここに記入してください" />
          <div className="w-full">
            <span className="text-[14px] font-semibold">有効期限</span>
            <div className="flex space-x-[8px] w-full pt-[10px]">
              <Form.Item className="!mb-0 !w-full" name="startDate">
                <BasicSelect className="w-full" placeholder="月を選択してください" />
              </Form.Item>
              <Form.Item className="!mb-0 !w-full" name="endDate">
                <BasicSelect className="w-full" placeholder="年を選択してください" />
              </Form.Item>
            </div>
          </div>
          <InputLabel label="セキュリティコード" name="securityCode" placeholder="ここに記入してください" />
          <div className="flex space-x-[24px] justify-center  border-t border-[#AAA] mt-[32px] pt-[40px]">
            <div className="w-[162px]  h-[56px]">
              <CButtonShadow
                classBgColor="bg-white"
                classRounded="rounded-[6px]"
                classShadowColor="bg-main-text"
                onClick={() => closePopUp()}
                shadowSize="normal"
                textClass="text-main-text"
                title="キャンセル"
              />
            </div>
            <div className="w-[245px]  h-[56px]">
              <CButtonShadow
                classBgColor="bg-main-text"
                classRounded="rounded-[6px]"
                classShadowColor="bg-white"
                shadowSize="normal"
                title="カード情報を保存する"
                type="submit"
              />
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default PopUpCreditOrDebitCard;
