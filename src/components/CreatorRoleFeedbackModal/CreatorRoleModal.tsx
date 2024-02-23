import React from 'react';
import { useRouter } from 'next/router';
import CButtonShadow from '../common/CButtonShadow';
import CModalWapper from '../common/CModalWapper';

export default function CreatorRoleModal({ isOpen, onCancel }: { isOpen: boolean; onCancel: () => void }) {
  const router = useRouter();

  return (
    <CModalWapper isOpen={isOpen} onCancel={onCancel}>
      <div className=" py-[8px] ">
        <div className=" flex flex-col items-center">
          <p className="text-[14px] text-main-text leading-[22px] tracking-[0.39px]">
            キャンペーン作成の画面にログインするにはメールアドレス、パスワード、2段階認証がマイページで登録されていることが必須とする。
          </p>
          <div className="h-[24px]" />
          <div className="w-[236px] h-[53px]">
            <CButtonShadow
              onClick={() => {
                onCancel();
                router.push('/my-page');
              }}
              title="マイページで設定する"
              type="button"
            />
          </div>
        </div>
      </div>
    </CModalWapper>
  );
}
