/* eslint-disable no-console */

'use client';

import CButtonShadow from '@/components/common/CButtonShadow';
import CModalWapper from '@/components/common/CModalWapper';
import TwitterLogo from '@/components/common/icons/TwitterLogo';
import { setSession } from '@/redux/slices/auth.slice';
import { getErrorMessage } from '@/utils/func/getErrorMessage';
import toastMessage from '@/utils/func/toastMessage';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

interface ConnectXModalProps {
  buttonLabel: string;
  actionType: 'SIGNUP' | 'SIGNIN';
}

export default function ConnectXModal({ buttonLabel, actionType }: ConnectXModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const router = useRouter();

  const dispatch = useDispatch();
  const onChangeLocalStorage = useCallback(async () => {
    try {
      const storageData = JSON.parse(localStorage.getItem('twitter_callback_data') || '{}');

      localStorage.removeItem('twitter_callback_data');
      if (storageData?.data || storageData?.error) {
        window.removeEventListener('storage', onChangeLocalStorage, false);
      }
      if (storageData?.error) {
        toastMessage(storageData?.error, 'error');
        return;
      }
      console.log(storageData, 'storageData');
      if (storageData?.data?.accessToken && storageData?.data?.refreshToken && storageData?.data?.user) {
        console.log('twitter data', storageData);
        dispatch(setSession({ ...storageData?.data }));

        localStorage.setItem(
          'USER_LOGIN_FROM',
          router.pathname?.includes('campaign-creator') ? 'CREATOR' : 'IMPLEMENTER'
        );

        router.replace('/my-page');
      } else if (storageData?.data?.totpToken && storageData?.data?.user) {
        router.push(
          `/auth/sign-in/${
            router.pathname?.includes('campaign-creator') ? 'campaign-creator' : 'campaign-implementer'
          }/verification?code=${storageData?.data?.code ?? undefined}&totpToken=${
            storageData?.data?.totpToken ?? undefined
          }&userId=${storageData?.data?.user?.id ?? undefined}`
        );
      }
    } catch (error) {
      console.log(error);
      toastMessage(getErrorMessage(error), 'error');
    }
  }, []);

  function getTwitterOauthUrl() {
    localStorage.removeItem('twitter_callback_data');
    window.addEventListener('storage', onChangeLocalStorage, false);
    const rootUrl = 'https://twitter.com/i/oauth2/authorize';
    const options = {
      redirect_uri: `${window.location?.origin}/auth/callback/twitter`,
      client_id: 'UjZfREtGZlVIelpvS1NrbVhrRkY6MTpjaQ',
      state: `${window.location?.origin}/auth/callback/twitter+++${actionType}`,
      response_type: 'code',
      code_challenge: 'challenge',
      code_challenge_method: 'plain',
      scope: ['users.read', 'tweet.read', 'follows.read'].join(' '),
    };
    const qs = new URLSearchParams(options).toString();
    const url = `${rootUrl}?${qs}`;
    const width = 450;
    const height = 730;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const newWindow = window.open(
      url,
      'Twitter Auth',
      `menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=${width}, height=${height}, top=${top}, left=${left}`
    );

    newWindow?.focus();
  }

  return (
    <>
      <div className="h-[53px]">
        <CButtonShadow onClick={showModal} title={buttonLabel} type="button" />
      </div>
      <CModalWapper isOpen={isModalOpen} onCancel={handleCancel}>
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
                  handleCancel();
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
