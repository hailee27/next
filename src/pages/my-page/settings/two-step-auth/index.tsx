import SmsVerificationForm from '@/components/auth/sms-verification-form';
import CButtonShadow from '@/components/common/CButtonShadow';
import CFormInputShadow from '@/components/common/CFormInputShadow';
import clsx from 'clsx';
import { useState } from 'react';

export default function SettingTwoStepAuthPage() {
  const [step, setStep] = useState(1);
  return (
    <div className="relative w-full min-h-[100vh] overflow-x-hidden bg-[#D5FFFF]">
      <div
        className={clsx(
          'absolute z-[1] min-h-[100vh] h-full w-full bg-[#D5FFFF] py-[40px] px-[20px] transition-all duration-300',
          step === 1 ? 'top-0 left-[0]' : 'top-0 left-[-110vw]'
        )}
      >
        <div className=" border-[2px] border-[#333] px-[22px] py-[30px] rounded-[16px]">
          <h1 className="text-[20px] font-bold text-[#04AFAF] tracking-[0.6px] text-center ">携帯電話番号を入力</h1>
          <div className="h-[16px]" />
          <CFormInputShadow name="phoneNumber" placeholder="090-1234-5678" type="text" />
        </div>
        <div className="h-[24px]" />
        <div className="h-[53px] flex gap-[8px]">
          <div className="flex-1">
            <CButtonShadow onClick={() => {}} title="キャンセルする" type="button" />
          </div>
          <div className="flex-1">
            <CButtonShadow onClick={() => setStep(2)} title="保存する" type="button" />
          </div>
        </div>
      </div>
      <div
        className={clsx(
          'absolute z-[1] min-h-[100vh] h-full w-full bg-[#D5FFFF] py-[40px] px-[20px] transition-all duration-300',
          step === 1 ? 'top-0 left-[110vw]' : 'top-0 left-[0]'
        )}
      >
        <div className="bg-white border-[2px] border-[#333] px-[22px] py-[30px] rounded-[16px]">
          <h1 className="text-[20px] font-bold text-[#04AFAF] tracking-[0.6px] text-center ">
            携帯電話に届いた認証コード
            <br />
            を入力してください
          </h1>
          <div className="h-[16px]" />

          <SmsVerificationForm
            onSubmitCode={(code) => {
              // eslint-disable-next-line no-console
              console.log('code:', code);
            }}
          />
        </div>
        <div className="h-[24px]" />
        <div>
          <p className="w-fit pb-[4px] border-b-[#333] border-b-[1px] text-[12px] font-medium cursor-pointer">
            自動音声案内で認証コードを受け取る
          </p>
          <div className="h-[8px]" />

          <p className="w-fit pb-[4px] border-b-[#333] border-b-[1px] text-[12px] font-medium cursor-pointer">
            認証コードを再送する
          </p>
        </div>
      </div>
    </div>
  );
}
