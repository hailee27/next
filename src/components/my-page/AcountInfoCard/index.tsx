import ArrowDown from '@/components/common/icons/ArrowDown';
import Link from 'next/link';
import React from 'react';

export default function AcountInfoCard() {
  return (
    <div className=" border-[2px] border-[#333] px-[22px] py-[30px] rounded-[16px] bg-white">
      <div className="flex flex-col gap-[16px]">
        <div className="flex justify-between gap-[12px] items-center">
          <div className="text-main-text">
            <p className="text-[13px]">メールアドレス</p>
            <div className="h-[4px]" />
            <p className="text-[16px] font-bold max-w-[180px] overflow-hidden text-ellipsis">yamada@gmail.com</p>
          </div>
          <Link
            className="flex gap-[4px] items-center min-w-[48px] text-[#04AFAF] text-[14px] font-bold"
            href="/my-page/settings/email"
          >
            <span className="min-w-[30px]">変更</span> <ArrowDown className=" rotate-[-90deg] w-[14px] h-[14px]" />
          </Link>
        </div>
        <div className="h-[1px] bg-[#aaa]" />
        <div className="flex justify-between gap-[12px] items-center">
          <div className="text-main-text">
            <p className="text-[13px]">パスワード</p>

            <p className="text-[16px] font-bold max-w-[180px] overflow-hidden">
              {'yamada@gmail.com'.replace(/./gi, '.')}
            </p>
          </div>
          <Link
            className="flex gap-[4px] items-center min-w-[48px] text-[#04AFAF] text-[14px] font-bold"
            href="/my-page/settings/password"
          >
            <span className="min-w-[30px]">変更</span> <ArrowDown className=" rotate-[-90deg] w-[14px] h-[14px]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
