import React from 'react';
import Header from './Header';
import SideBar from './SideBar';

interface Props {
  children: JSX.Element;
}

function CampaignLayout({ children }: Props) {
  return (
    <main className="min-h-screen flex flex-col bg-white text-[#2D3648]">
      <header className="h-[96px] ">
        <Header />
      </header>
      <div className="flex h-full flex-1">
        <div className="w-[258px]">
          <SideBar />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </main>
  );
}

export default CampaignLayout;
