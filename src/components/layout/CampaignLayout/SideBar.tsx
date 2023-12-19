import { Image } from 'antd';
import Link from 'next/link';
import React from 'react';

const ListItem = ({ title, to }: { title: string; to: string }) => (
  <Link href={to}>
    <div className="bg-[#E2E7F0] py-[12px] pl-[40px] flex items-center space-x-[10px] cursor-pointer">
      <Image alt="" preview={false} src="/icons/icon-placeholder.svg" />
      <span className="text-[14px] font-medium">{title}</span>
    </div>
  </Link>
);
function SideBar() {
  return (
    <div className="border-r-2 border-[#2D3648] bg-[#EDF0F7] h-full flex flex-col py-[24px]">
      <div className="flex-1">
        <ListItem title="TOP" to="/top" />
        <div className="py-[12px] px-[16px] flex items-center space-x-[10px]">
          <span className="text-[11px] font-medium">キャンペーン</span>
        </div>
        <ListItem title="キャンペーン一覧" to="/campaign/list" />
        <ListItem title="キャンペーン新規作成" to="/campaign/" />
        <ListItem title="完了済みのキャンペーン" to="/campaign/" />
        <div className="py-[12px] px-[16px] flex items-center space-x-[10px]">
          <span className="text-[11px] font-medium">管理</span>
        </div>
        <ListItem title="権限管理" to="/campaign/" />
        <ListItem title="デポジット残高" to="/campaign/" />
      </div>
      <div className="h-[120px] border-t-2 border-[#2D3648] flex flex-col justify-end">
        <ListItem title="組織情報" to="/campaign/" />
        <ListItem title="アカウント情報" to="/campaign/" />
      </div>
    </div>
  );
}

export default SideBar;
