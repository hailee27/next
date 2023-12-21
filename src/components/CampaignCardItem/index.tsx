import React from 'react';
import CShadowCard from '../common/CCardShadow';
import ArrowDown from '../common/icons/ArrowDown';
import CButtonClassic from '../common/CButtonClassic';

export default function CampaignCardItem() {
  return (
    <CShadowCard>
      <div className="font-notoSans px-[24px] py-[32px] flex flex-col gap-[16px]   ">
        <div className=" flex gap-[10px] items-center  ">
          <div className="w-[32px] h-[32px] rounded-full bg-gray-2  overflow-hidden" />
          <p className="font-bold text-[14px] tracking-[0.42px] leading-[21px] text-main-text ">組織名</p>
        </div>
        <div className="h-[184px] overflow-hidden rounded-[4px] bg-gray-2" />
        <div>
          <h3 className="font-bold text-[16px] tracking-[0.48px] leading-[24px] mb-[8px] text-main-text">
            キャンペーンタイトルが入ります
          </h3>
          <div className=" flex flex-col gap-[6px] text-gray-1">
            <p className="text-[13px] tracking-[0.4px] ">報酬：100円 〜 1,000,000円</p>
            <p className="text-[13px] tracking-[0.4px] ">当選者枠：100名</p>
            <p className="text-[13px] tracking-[0.4px] ">期限：12/10 11:00 〜 12/30 15:00</p>
          </div>
        </div>
        <div className="min-w-[279px] h-[47px]">
          <CButtonClassic
            customClassName="!bg-btn-gradation !text-[14px] !text-main-text"
            tagLabel="即時抽選"
            title="キャンペーンの詳細をみる"
            withIcon={{
              position: 'right',
              icon: <ArrowDown className="rotate-[-90deg]" />,
            }}
          />
        </div>
      </div>
    </CShadowCard>
  );
}
