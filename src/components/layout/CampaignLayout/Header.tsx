import React from 'react';

function Header() {
  return (
    <div className="border-b-2 border-[#2D3648] h-full flex items-center justify-between px-[40px]">
      <div className="py-[12px] px-[40px] bg-[#2D3648] rounded-[4px] text-white text-[16px] font-bold">logo</div>
      <div className="flex space-x-[16px] text-[16px] font-bold">
        <span>ONE.course</span>
        <span>管理者</span>
        <span>ikeyama@one-stone.co.jp</span>
        <span>ログアウト</span>
      </div>
    </div>
  );
}

export default Header;
