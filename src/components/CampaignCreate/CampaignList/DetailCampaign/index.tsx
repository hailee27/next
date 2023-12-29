import CButtonShadow from '@/components/common/CButtonShadow';

import React from 'react';
import Detail from './Detail';

function DetailCampaign() {
  return (
    <div className="px-[48px] pb-[77px]">
      <div className="flex py-[32px] w-full justify-between border-b-2 border-[#2D3648] max-h-[112px]">
        <span className="text-[32px] font-bold">キャンペーン詳細</span>
        <div className="w-[184px]  h-[56px]">
          <CButtonShadow
            classBgColor="bg-white"
            classRounded="rounded-[6px]"
            classShadowColor="bg-main-text"
            // onClick={() => router.push('/campaign/create')}
            shadowSize="normal"
            textClass='"bg-main-text"'
            title="プレビュー"
            withIcon={{
              position: 'left',
              icon: (
                <svg fill="none" height="18" viewBox="0 0 18 18" width="18" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15 4.8125V5H11V1H11.1875C11.375 1 11.5625 1.09375 11.7188 1.25L14.75 4.28125C14.9062 4.4375 15 4.625 15 4.8125ZM10.75 6H15V16.25C15 16.6875 14.6562 17 14.25 17H3.75C3.3125 17 3 16.6875 3 16.25V1.75C3 1.34375 3.3125 1 3.75 1H10V5.25C10 5.6875 10.3125 6 10.75 6ZM6.5 6.5C5.6875 6.5 5 7.1875 5 8C5 8.84375 5.6875 9.5 6.5 9.5C7.34375 9.5 8 8.84375 8 8C8 7.1875 7.34375 6.5 6.5 6.5ZM13 14V10.5L11.7812 9.28125C11.625 9.125 11.375 9.125 11.25 9.28125L8 12.5L6.78125 11.2812C6.625 11.125 6.40625 11.125 6.25 11.25L5.03125 12.5L5 14H13Z"
                    fill="#333333"
                  />
                </svg>
              ),
            }}
          />
        </div>
      </div>
      <div>
        <Detail />
        <div className="flex space-x-[16px] justify-center  mt-[64px]">
          <div className="w-[376px]  h-[56px]">
            <CButtonShadow
              classBgColor="bg-white"
              classRounded="rounded-[6px]"
              classShadowColor="bg-main-text"
              shadowSize="normal"
              textClass="text-main-text"
              title="キャンペーンのステータスを完了にする"
            />
          </div>
          <div className="w-[293px]  h-[56px]">
            <CButtonShadow
              classBgColor="bg-main-text"
              classRounded="rounded-[6px]"
              classShadowColor="bg-white"
              shadowSize="normal"
              title="キャンペーン参加状況を確認"
              type="submit"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailCampaign;
