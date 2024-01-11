import ArrowDown from '@/components/common/icons/ArrowDown';
import { RootState } from '@/redux/store';
import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';

export default function AcountInfoCard() {
  const { user } = useSelector((store: RootState) => store.auth);
  return (
    <div className=" border-[2px] border-[#333] px-[22px] py-[30px] rounded-[16px] bg-white">
      {!user?.email?.email && !user?.havePassword ? (
        <div className="flex justify-between gap-[40px]">
          <div className="text-main-text">
            <div>
              <p className="text-[13px]">メールアドレス</p>
              <div className="h-[4px]" />
              <p className="text-[16px] font-bold max-w-[180px] overflow-hidden text-ellipsis min-h-[24px]">未登録</p>
            </div>
            <div className="h-[32px]" />
            <div>
              <p className="text-[13px]">パスワード</p>
              <div className="h-[4px]" />
              <p className="text-[16px] font-bold max-w-[180px] overflow-hidden text-ellipsis min-h-[24px]">未登録</p>
            </div>
          </div>
          <Link
            className="flex gap-[4px] items-center min-w-[48px] text-[#04AFAF] text-[14px] font-bold"
            href="/my-page/settings/auth-email"
          >
            <span className="min-w-[30px]">変更</span> <ArrowDown className=" rotate-[-90deg] w-[14px] h-[14px]" />
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-[16px]">
          <div className="flex justify-between gap-[12px] items-center">
            <div className="text-main-text">
              <p className="text-[13px]">メールアドレス</p>
              <div className="h-[4px]" />
              <p className="text-[16px] font-bold max-w-[180px] overflow-hidden text-ellipsis min-h-[24px]">
                {user?.email?.email ?? ''}
              </p>
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

              <p className="text-[16px] font-bold max-w-[180px] overflow-hidden min-h-[24px]">
                {user?.havePassword ? '............' : ''}
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
      )}
    </div>
  );
}
