import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

export default function SignInLayout({ children }: LayoutProps) {
  return (
    <main className="relative min-w-[100vw] min-h-[100vh] bg-[url(/assets/images/ImagePlaceholder.png)] bg-no-repeat bg-cover bg-center">
      <div className="hidden absolute top-[24px] left-[40px] text-white font-bold text-[16px]">Logo</div>
      <div className="flex w-full h-full items-center">
        <div className="mx-auto max-w-[1544px]  w-full min-h-[100vh] flex items-center justify-between">
          <div className="hidden  gap-[16px] flex-col max-w-[574px]">
            <h1 className="text-[56px] font-bold leading-[66px] text-white">
              月額利用料なし
              <br /> 最速0日で開始
            </h1>
            <p className="text-[18px] font-normal leading-[30px] text-white">
              様々なタスクやインスタントウィンが月額0円。最安値、最短で認知およびコミュニティーを拡大
            </p>
          </div>
          <div className="w-full h-full ">{children}</div>
        </div>
      </div>
    </main>
  );
}
