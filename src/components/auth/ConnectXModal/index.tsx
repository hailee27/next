/* eslint-disable no-console */

'use client';

import CButtonShadow from '@/components/common/CButtonShadow';
import CModalWapper from '@/components/common/CModalWapper';
import TwitterLogo from '@/components/common/icons/TwitterLogo';
import useConnectX from '@/hooks/useConnectX';
import Link from 'next/link';

interface ConnectXModalProps {
  buttonLabel: string;
}

export default function ConnectXModal({ buttonLabel }: ConnectXModalProps) {
  const { isModalOpen, showModal, cancelModal, getTwitterOauthUrl } = useConnectX({ handleAction: 'SIGNUP' });

  return (
    <>
      <div className="h-[53px]">
        <CButtonShadow onClick={showModal} title={buttonLabel} type="button" />
      </div>
      <CModalWapper isOpen={isModalOpen} onCancel={cancelModal}>
        <div className="h-[383px] overflow-hidden  py-[8px] ">
          <div className=" flex flex-col items-center">
            <TwitterLogo />
            <div className="h-[40px]" />
            <h3 className="text-center text-[18px] font-notoSans font-bold leading-[30px] tracking-[0.53px]">
              連携するとX（twitter）で <br />
              ログインできるようになります
            </h3>
            <div className="h-[8px]" />
            <p className="text-[13px] text-gray-1 leading-[22px] tracking-[0.39px]">
              cloutでは連携されたX（twitter）アカウントの情報を、X（twitter）アカウントでログインする目的で使用します。
            </p>
            <div className="h-[24px]" />
            <div className="w-[206px] h-[53px]">
              <CButtonShadow
                onClick={() => {
                  cancelModal();
                  getTwitterOauthUrl();
                }}
                title="同意して連携する"
                type="button"
              />
            </div>
            <div className="h-[16px]" />
            <p className="text-[13px] text-gray-1 leading-[22px] tracking-[0.39px]">
              ※続行することにより
              <Link className="font-bold" href="/terms-of-service">
                利用規約
              </Link>
              および
              <Link className="font-bold" href="/privacy-policy">
                プライバシーポリシー
              </Link>
              に同意したものとみなされます。
            </p>
          </div>
        </div>
      </CModalWapper>
    </>
  );
}
