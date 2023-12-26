import React from 'react';
import { usePopUpContext } from '@/context/PopUpContext';
import InputLabel from '../common/BasicInput/InputLabel';
import BasicSelect from '../common/BasicSelect';
import BasicButton from '../common/BasicButton';

function PopUpCreditOrDebitCard() {
  const { closePopUp } = usePopUpContext();
  return (
    <div className="p-[40px]">
      <span className="font-semibold">クレジットカードまたはデビットカードを変更</span>
      <div className="mt-[40px] pt-[40px] border-t-2 border-[#2D3648] w-[1076px] flex flex-col space-y-[16px]">
        <InputLabel label="カードの名義" noStyle />
        <div>
          <span className="text-[14px] font-semibold">有効期限</span>
          <div className="flex space-x-[8px]">
            <BasicSelect className="!w-[158px]" value={3} />
            <BasicSelect className="!w-[158px]" value={2027} />
          </div>
        </div>
        <div className="w-[156px]">
          <InputLabel label="カードの名義" noStyle />
        </div>
        <div className="flex space-x-[24px] h-[56px]">
          <BasicButton className="w-[138px]" onClick={() => closePopUp()} type="primary">
            キャンセル
          </BasicButton>
          <BasicButton className="w-[191px]" onClick={() => closePopUp()}>
            カード情報を保存
          </BasicButton>
        </div>
      </div>
    </div>
  );
}

export default PopUpCreditOrDebitCard;
