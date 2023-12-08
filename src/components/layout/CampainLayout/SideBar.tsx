import { Image } from 'antd';
import React from 'react';

const ListItem = ({ title }: { title: string }) => (
  <div className="bg-[#E2E7F0] py-[12px] pl-[40px] flex items-center space-x-[10px] cursor-pointer">
    <Image alt="" preview={false} src="/icons/icon-placeholder.svg" />
    <span className="text-[14px] font-medium">{title}</span>
  </div>
);
function SideBar() {
  return (
    <div className="border-r-2 border-[#2D3648] bg-[#EDF0F7] h-full flex flex-col py-[24px]">
      <div className="flex-1">
        <ListItem title="TOP" />
        <div className="py-[12px] px-[16px] flex items-center space-x-[10px]">
          <span className="text-[11px] font-medium">キャンペーン</span>
        </div>
        <ListItem title="キャンペーン一覧" />
        <ListItem title="キャンペーン新規作成" />
        <ListItem title="完了済みのキャンペーン" />
        <div className="py-[12px] px-[16px] flex items-center space-x-[10px]">
          <span className="text-[11px] font-medium">管理</span>
        </div>
        <ListItem title="権限管理" />
        <ListItem title="デポジット残高" />
      </div>
      <div className="h-[120px] border-t-2 border-[#2D3648] flex flex-col justify-end">
        <ListItem title="組織情報" />
        <ListItem title="アカウント情報" />
      </div>
    </div>
  );
}

export default SideBar;
