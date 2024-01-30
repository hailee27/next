import React from 'react';
import { useRouter } from 'next/router';
import CButtonShadow from '../common/CButtonShadow';
import CModalWapper from '../common/CModalWapper';

export default function CreatorRoleFeedbackModal() {
  const router = useRouter();

  return (
    <div>
      <CModalWapper
        isOpen
        onCancel={() => {
          router.push('/');
        }}
        top={80}
      >
        <div className=" py-[8px] ">
          <div className=" flex flex-col items-center">
            <p className="text-[14px] text-main-text leading-[22px] tracking-[0.39px]">
              続行するには、電子メール パスワードを使用してログインを構成し、2 段階認証を有効にする必要があります。
            </p>
            <div className="h-[24px]" />
            <div className="w-[206px] h-[53px]">
              <CButtonShadow
                onClick={() => {
                  router.push('/my-page');
                }}
                title="Go Setting"
                type="button"
              />
            </div>
          </div>
        </div>
      </CModalWapper>
    </div>
  );
}
