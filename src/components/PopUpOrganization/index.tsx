import { usePopUpContext } from '@/context/PopUpContext';
import React from 'react';
import { useRouter } from 'next/router';
import BasicButton from '../common/BasicButton';
import InputLabel from '../common/BasicInput/InputLabel';
import PopUpCreditOrDebitCard from '../OrganizeInformation/PopUpCreditOrDebitCard';
import UploadButton from '../common/UploadButton';

function PopUpOrganization() {
  const { openPopUp, closePopUp } = usePopUpContext();
  const router = useRouter();
  return (
    <div className="p-[40px] w-[1156px]">
      <InputLabel label="組織名 ※必須" />
      <InputLabel label="組織ID ※必須" />
      <InputLabel label="組織 代表メールアドレス ※必須" />
      <div className="flex flex-col space-y-[8px] mb-[24px]">
        <span className="font-semibold">ロゴ ※必須</span>
        <UploadButton className="w-[175px]" />
      </div>
      <div className="flex flex-col space-y-[8px]">
        <span className="font-semibold">お支払い方法 ※必須</span>
        <BasicButton className="w-[355px] h-[48px]" onClick={() => openPopUp({ contents: <PopUpCreditOrDebitCard /> })}>
          クレジットまたはデビットカードを追加
        </BasicButton>
      </div>
      <div className="flex space-y-[24px] flex-col border-t-2 border-[#2D3648] mt-[48px] pt-[48px]">
        <BasicButton
          className="w-[191px] h-[56px]"
          onClick={() => {
            router.push('/campaign/list');
            closePopUp();
          }}
        >
          組織を作成する
        </BasicButton>
        <span
          className="text-[16px] font-semibold underline underline-offset-2 cursor-pointer w-max"
          onClick={() =>
            openPopUp({
              contents: (
                <div className="p-[40px] w-[1156px]">
                  <InputLabel label="組織ID ※必須" />
                  <div className="flex space-y-[24px] flex-col border-t-2 border-[#2D3648] mt-[48px] pt-[48px]">
                    <BasicButton className="w-[249px] h-[56px]" onClick={() => closePopUp()}>
                      アクセス権限をリクエストする
                    </BasicButton>
                  </div>
                </div>
              ),
            })
          }
          onKeyPress={undefined}
          role="button"
          tabIndex={0}
        >
          既に存在する組織にサインインする
        </span>
      </div>
    </div>
  );
}

export default PopUpOrganization;
