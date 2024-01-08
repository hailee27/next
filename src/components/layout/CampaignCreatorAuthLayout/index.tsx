import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function CampaignCreatorAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-notoSans">
      <div className="h-[62px] px-[20px] flex justify-between items-center w-full  ">
        <Link className="w-[81px] h-[24px] hover:cursor-pointer" href="/">
          <Image
            alt=" logo"
            className="w-full h-full object-cover"
            height="0"
            sizes="100vw"
            src="/assets/images/logo 1.png"
            width="0"
          />
        </Link>
      </div>
      <div className="min-h-[calc(100vh-62px)] bg-[url('/assets/images/login-bg.png')] bg-no-repeat bg-cover bg-center">
        <div className="flex w-full h-full min-h-[calc(100vh-62px)] items-center justify-center  xxl:justify-between gap-[88px] p-[16px] xxl:p-[92px] xxl:pt-[0px]">
          <div className="hidden xxl:block m-w-[425px]">
            <h1 className="text-[#333] text-[56px] font-bold leading-[72px] tracking-[1.68px]">
              月額利用料なし <br />
              最速0日で開始
            </h1>
            <div className="h-[16px]" />
            <div className="text-[#333] text-[18px] font-medium leading-[28px] tracking-[0.54px]">
              <h3>様々なタスクやインスタントウィンが月額0円。</h3>
              <h3>最安値、最短で認知およびコミュニティーを拡大。</h3>
            </div>
            <div className="h-[48px]" />

            <div className="w-[400px] h-[386px]">
              <Image
                alt="image"
                className="w-full h-full object-cover"
                height="0"
                sizes="100vw"
                src="/assets/images/login-bg-image.png"
                width="0"
              />
            </div>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
