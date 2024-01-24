import React from 'react';
import TablePayment from './TablePayment';

function DepositBalance() {
  return (
    <div className="px-[48px] pt-[32px]">
      <div className="border-b-2 border-[#333] flex justify-between items-center pb-[24px] mb-[47px]">
        <span className="text-[32px] font-bold">支払管理</span>
      </div>
      <div className="flex flex-col space-y-[16px]">
        <span className="text-[#04AFAF] text-[18px] font-bold">デポジット残高</span>
        <span className="text-[16px] font-bold">10,000円</span>
      </div>
      <div className="pt-[30px]">
        <TablePayment />
      </div>
      {/* <div className="bg-white rounded-[8px] p-[40px]">aloo</div> */}
    </div>
  );
}

export default DepositBalance;
