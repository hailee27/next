/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from '@/redux/store';
import { Spin, Switch } from 'antd';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import CModalWapper from '@/components/common/CModalWapper';
import TwitterLogo from '@/components/common/icons/TwitterLogo';
import toastMessage from '@/utils/func/toastMessage';
import { getErrorMessage } from '@/utils/func/getErrorMessage';
import { useDisconnectTwitterMutation, useLazyMeQuery } from '@/redux/endpoints/auth';
import { setUser } from '@/redux/slices/auth.slice';
import CButtonShadow from '@/components/common/CButtonShadow';
import styles from './styles.module.scss';

export default function AuthInfoCard() {
  const { user } = useSelector((store: RootState) => store.auth);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const [triggerGetMe, { isFetching: isFetchingUser }] = useLazyMeQuery();
  const [disconnectTwitter, { isLoading: isDisconnecting }] = useDisconnectTwitterMutation();
  const dispatch = useDispatch();

  const refreshUser = async () => {
    try {
      const data = await triggerGetMe().unwrap();
      if (data as any) {
        dispatch(setUser(data));
      }
    } catch (error) {
      toastMessage(getErrorMessage(error), 'error');
    }
  };

  const onUpdateTwoStepAuthState = async (newState: boolean) => {
    if (newState === false) {
      router.push('/my-page/settings/two-step-auth?action=disable');
    } else {
      router.push('/my-page/settings/two-step-auth');
    }
  };

  const onUpdateAuthTwitter = async (newState: boolean) => {
    try {
      if (newState === true) {
        setIsModalOpen(true);
      } else {
        if (user?.havePassword === false && user?.email === null) {
          toastMessage('Please set email and password before disabling twitter connection');
          return;
        }
        const twitterIdentity = user?.identities?.find((item) => item?.type === 'TWITTER');
        if (twitterIdentity === undefined) {
          toastMessage('Twitter connection not found', 'error');
          return;
        }
        await disconnectTwitter({ id: twitterIdentity?.id }).unwrap();
        toastMessage('twitter has been disconnected successfully', 'success');
        await refreshUser();
      }
    } catch (error) {
      toastMessage(getErrorMessage(error), 'error');
    }
  };
  const handleCancelModal = () => {
    setIsModalOpen(false);
  };

  const onChangeLocalStorage = useCallback(async () => {
    try {
      const storageData = JSON.parse(localStorage.getItem('twitter_callback_data') || '{}');
      if (storageData?.error && storageData?.data) {
        window.removeEventListener('storage', onChangeLocalStorage, false);
      }

      if (storageData?.error) {
        toastMessage(storageData?.error, 'error');
        return;
      }

      await refreshUser();
    } catch (error) {
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
      state: `${window.location?.origin}/auth/callback/twitter+++CONNECT`,
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
    <Spin spinning={isFetchingUser || isDisconnecting}>
      <div className=" border-[2px] border-[#333] px-[22px] py-[30px] rounded-[16px] bg-white">
        <div className="flex flex-col gap-[16px]">
          <div className="flex justify-between gap-[12px] items-center">
            <div className="text-main-text">
              <p className="text-[14px] font-bold">X（Twitter）連携</p>
              <div className="h-[8px]" />
              <p className="text-[13px] text-[#777]   w-[196px] overflow-hidden leading-[22px] tracking-[0.39px]">
                キャンペーンに参加される方は
                <br />
                こちらをオンにしてください
              </p>
            </div>
            <Switch
              className={styles.customSwitch}
              onChange={onUpdateAuthTwitter}
              value={Boolean(
                user?.identities && user?.identities?.length > 0 && user?.identities?.[0]?.type === 'TWITTER'
              )}
            />
          </div>
          <div className="h-[1px] bg-[#aaa]" />
          <div className="flex justify-between gap-[12px] items-center">
            <div className="text-main-text">
              <p className="text-[14px] font-bold">2段階認証</p>
              <div className="h-[8px]" />
              <p className="text-[13px] text-[#777]   w-[196px] overflow-hidden leading-[22px] tracking-[0.39px]">
                キャンペーンを作成される方は
                <br />
                こちらをオンにしてください
              </p>
            </div>
            <Switch
              className={styles.customSwitch}
              onChange={onUpdateTwoStepAuthState}
              value={Boolean(user?.twoFactorMethod === 'TOTP' && user?.twoFactorPhone)}
            />
          </div>
        </div>
      </div>
      <CModalWapper isOpen={isModalOpen} onCancel={handleCancelModal}>
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
                  handleCancelModal();
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
    </Spin>
  );
}
