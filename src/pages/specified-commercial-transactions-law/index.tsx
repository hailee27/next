import React from 'react';

function SpecifiedCommercialTransactionsLawPage() {
  return (
    <div className="px-[20px] max-w-[820px] mx-auto">
      <div className="flex flex-col items-center space-y-[32px] mt-[40px]">
        <h2 className="text-[28px] font-bold text-[#04AFAF] text-center">
          特定商取引法に
          <br /> 基づく表示
        </h2>
      </div>
      <div className="flex flex-col space-y-[32px] text-[13px] text-[#777] mt-[32px]">
        <div className="flex flex-col space-y-[8px]">
          <span className="font-bold">事業者</span>
          <span>株式会社clout</span>
        </div>
        <div className="flex flex-col space-y-[8px]">
          <span className="font-bold">代表者</span>
          <span>山田 太郎</span>
        </div>
        <div className="flex flex-col space-y-[8px]">
          <span className="font-bold">ホームページ</span>
          <span className="text-[#04AFAF] font-medium">https://xxx.com/</span>
        </div>
        <div className="flex flex-col space-y-[8px]">
          <span className="font-bold">所在地</span>
          <div className="flex flex-col text-[#777] leading-[22px]">
            <span>〒123-456</span>
            <span>東京都東京1-2-3</span>
          </div>
        </div>
        <div className="flex flex-col space-y-[8px]">
          <span className="font-bold">電話番号</span>
          <div className="flex flex-col text-[#777] leading-[22px]">
            <span className="my-[8px] font-medium text-[#04AFAF]">050-3185-6685</span>
            <span>※お取引やサービスについてのお問い合わせは、ここにテキストが入ります。</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpecifiedCommercialTransactionsLawPage;
