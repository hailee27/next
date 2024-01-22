import Image from 'next/image';
import React from 'react';

function TwitterCallBackLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="h-[64px] px-[20px] flex justify-between items-center w-full  border-t-[2px] border-b-[2px] border-[#333] border-solid">
        <div className="w-[81px] h-[24px] hover:cursor-pointer">
          <Image
            alt="logo"
            className="w-full h-full object-cover"
            height="0"
            sizes="100vw"
            src="/assets/images/logo 1.png"
            width="0"
          />
        </div>
      </div>
      <div className="min-h-[calc(100vh-64px)]">{children}</div>
    </div>
  );
}

export default TwitterCallBackLayout;
