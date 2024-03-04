import LossSvg from '@/components/common/icons/LossSvg';
import React from 'react';

export default function Loser() {
  return (
    <>
      <div className="bg-[#F0F7F6] min-h-[450px] px-[44px] pt-[48px] pb-[56px] flex items-center justify-center flex-col gap-[24px] font-notoSans">
        <LossSvg />
        <h1 className="text-[#333] text-[28px] font-bold leading-[43px] ">残念！ハズレです...</h1>
        <p className="text-[14px] font-medium text-[#333438] leading-[22px]">またのご参加をお待ちしております</p>
      </div>
      <div className="h-[56px]" />
    </>
  );
}
