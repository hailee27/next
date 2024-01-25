import CButtonShadow from '@/components/common/CButtonShadow';
import { useRouter } from 'next/router';
import React from 'react';

export default function Feedback() {
  const router = useRouter();

  return (
    <div className="container-min-height pb-[56px] h-full w-full bg-[#D5FFFF] py-[48px] px-[20px] transition-all duration-300 flex justify-center">
      <div className="w-[288px] font-notoSans">
        <h1 className="text-center leading-[43px] font-bold text-[28px] text-[#04AFAF]">
          お問い合わせ <br />
          ありがとうございます
        </h1>
        <div className="h-[24px]" />
        <p className="text-[#333] text-[14px]  leading-[22px] ">
          入力されたメールアドレスに再設定用のURLを送付しました
        </p>
        <div className="h-[32px]" />
        <div className="h-[53px] w-[206px] mx-auto">
          <CButtonShadow
            onClick={() => {
              router.push('/');
            }}
            title="HOMEに戻る"
            type="button"
          />
        </div>
      </div>
    </div>
  );
}
