import React from 'react';
import Header from './Header';
import SideBar from './SideBar';

interface Props {
  children: JSX.Element;
}

function CampaignLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#333] font-notoSans">
      <header className="h-[76px] sticky top-0 bg-white z-10">
        <Header />
      </header>
      <div className="flex h-full flex-1 bg-[#F6F6F6]">
        <div className="w-[264px] h-[calc(100vh_-_76px)] sticky top-[76px]">
          <SideBar />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}

export default CampaignLayout;
