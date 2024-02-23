import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { formatNumber } from '@/utils/formatNumber';
import TablePayment from './TablePayment';

function DepositBalance() {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <div className="md:px-[48px] px-[20px] pt-[32px]">
      <div className="border-b-2 border-[#333] flex justify-between items-center pb-[24px] mb-[47px]">
        <span className="text-[32px] font-bold">支払管理</span>
      </div>
      <div className="flex flex-col space-y-[16px]">
        <span className="text-[#04AFAF] text-[18px] font-bold">デポジット残高</span>
        <span className="text-[16px] font-bold">{formatNumber(Number(user?.memberCompany.pointTotal), true, 1)}円</span>
      </div>
      <div className="pt-[30px]">
        <TablePayment />
      </div>
    </div>
  );
}

export default DepositBalance;
