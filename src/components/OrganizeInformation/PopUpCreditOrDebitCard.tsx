import React, { useEffect, useState } from 'react';
import { usePopUpContext } from '@/context/PopUpContext';
import { Form } from 'antd';
import { CreditCard, PaymentForm } from 'react-square-web-payments-sdk';
import { TypeTokenPayment } from '@/types/paymentCard.type';

import InputLabel from '../common/BasicInput/InputLabel';
import CButtonShadow from '../common/CButtonShadow';

function PopUpCreditOrDebitCard({ getCardPayment }: { getCardPayment?: (value: TypeTokenPayment) => void }) {
  const { closePopUp } = usePopUpContext();
  const [infor, setInfor] = useState<TypeTokenPayment>();

  const [form] = Form.useForm();
  useEffect(() => {
    if (infor) {
      getCardPayment?.(infor);
      closePopUp();
    }
  }, [infor]);

  return (
    <div className="p-[64px] w-[928px] ">
      <Form form={form}>
        <div className="font-bold text-[#04AFAF] text-[20px] text-center">
          クレジットカードまたはデビットカードを変更
        </div>
        <div className="pt-[30px] flex flex-col space-y-[24px]">
          <InputLabel label="カードの名義" name="cardholderName" noStyle placeholder="ここに記入してください" />
          <PaymentForm
            applicationId={process.env.NEXT_PUBLIC_SQUARE_APPLICATIONID}
            cardTokenizeResponseReceived={async (token) => {
              if (token) {
                setInfor({ ...token, cardholderName: form.getFieldValue('cardholderName') });
              }
            }}
            locationId={process.env.NEXT_PUBLIC_SQUARE_LOACTIONID}
          >
            <CreditCard
              postalCode="12345"
              render={(Button) => (
                <div className="flex items-center justify-center space-x-[24px] pt-[40px] border-t-2">
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
                  <Button className="!w-[245px]  !h-[56px] !p-0 !bg-transparent">
                    <CButtonShadow
                      classBgColor="bg-main-text"
                      classRounded="rounded-[6px]"
                      classShadowColor="bg-white"
                      shadowSize="normal"
                      title="カード情報を保存する"
                    />
                  </Button>
                </div>
              )}
              style={{
                input: {
                  fontSize: '14px',
                  fontWeight: '500',
                },
                'input::placeholder': {
                  color: '#AAAAAA',
                },
                '.input-container': {
                  borderWidth: '2px',
                  borderColor: '#333',
                },
                '.input-container.is-focus': {
                  borderColor: '#333',
                },
              }}
            />
          </PaymentForm>
        </div>
        {/* <div className="mt-[40px]  flex flex-col space-y-[24px]">
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
        </div> */}
      </Form>
    </div>
  );
}
PopUpCreditOrDebitCard.defaultProps = {
  getCardPayment: undefined,
};
export default PopUpCreditOrDebitCard;
