import CButtonShadow from '@/components/common/CButtonShadow';
import LossSvg from '@/components/common/icons/LossSvg';
import { useRouter } from 'next/router';
import React from 'react';

export default function PageNotFound() {
  const router = useRouter();

  return (
    <div className="w-full min-h-[550px] h-[calc(100vh-64px-387px)] flex items-center justify-center bg-[#F0F7F6] flex-col gap-[24px]">
      <LossSvg />
      <div className="text-center">
        <h1 className="text-[#333] text-[32px] font-bold leading-[43px] ">404</h1>
        <p className="text-[14px] font-medium text-[#333438] leading-[22px]">ページは見つかりません。</p>
      </div>
      <div className="h-[53px] w-[165px] mx-auto ">
        <CButtonShadow
          onClick={() => {
            router.push('/');
          }}
          title="HOMEに戻る"
          type="button"
        />
      </div>
    </div>
  );
}
