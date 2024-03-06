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
          <span className="font-bold">代表者</span>
          <span>岩島 慶</span>
        </div>
        <div className="flex flex-col space-y-[8px]">
          <span className="font-bold">所在地</span>
          <p>
            〒107-0062
            <br />
            東京都港区南青山3丁目1番36号青山丸竹ビル6F{' '}
          </p>
        </div>
        <div className="flex flex-col space-y-[8px]">
          <span className="font-bold">メールアドレス</span>
          <span className="text-[#04AFAF] font-medium">
            <a href="mailto:info@clout-fi.com">info@clout-fi.com</a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default SpecifiedCommercialTransactionsLawPage;
