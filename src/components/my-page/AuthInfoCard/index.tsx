/* eslint-disable @typescript-eslint/no-explicit-any */
import ConnectXConfirmModal from '@/components/auth/ConnectXModal/ConnectXConfirmModal';
import useConnectX from '@/hooks/useConnectX';
import { useDisconnectTwitterMutation } from '@/redux/endpoints/auth';
import { RootState } from '@/redux/store';
import { getErrorMessage } from '@/utils/func/getErrorMessage';
import toastMessage from '@/utils/func/toastMessage';
import { Spin, Switch } from 'antd';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './styles.module.scss';

export default function AuthInfoCard() {
  const { user } = useSelector((store: RootState) => store.auth);

  const router = useRouter();

  const [disconnectTwitter, { isLoading: isDisconnecting, isSuccess: isDisconnected }] = useDisconnectTwitterMutation();

  const { isModalOpen, showModal, cancelModal, getTwitterOauthUrl, isFetchingUser, refreshUser, isRefetchUser } =
    useConnectX({
      handleAction: 'CONNECT',
    });

  const onUpdateTwoStepAuthState = async (newState: boolean) => {
    if (newState === false) {
      router.push(
        `/my-page/settings/two-step-authentication/verification?action=disable&phoneNumber=${
          user?.twoFactorPhone ?? ''
        }`
      );
    } else {
      router.push('/my-page/settings/two-step-authentication/configure-phone-number');
    }
  };

  useEffect(() => {
    if (isDisconnected) {
      window?.open('https://twitter.com', '_blank')?.focus();
      toastMessage('X(Twitter)接続が正常に切断されました。', 'success');
    }
  }, [isDisconnected]);

  const onUpdateAuthTwitter = async (newState: boolean) => {
    try {
      if (newState === true) {
        showModal();
      } else {
        if (user?.havePassword === false && user?.email === null) {
          toastMessage('X(Twitter)接続を無効にする前にメールアドレスとパスワードを設定してください');
          return;
        }
        const twitterIdentity = user?.identities?.find((item) => item?.type === 'TWITTER');
        if (twitterIdentity === undefined) {
          toastMessage('X(Twitter)接続が見つかりません。', 'error');
          return;
        }
        await disconnectTwitter({ id: twitterIdentity?.id }).unwrap();

        await refreshUser();
      }
    } catch (error) {
      toastMessage(getErrorMessage(error), 'error');
    }
  };

  return (
    <Spin spinning={isFetchingUser || isDisconnecting || isRefetchUser}>
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
      <ConnectXConfirmModal
        isOpen={isModalOpen}
        onCancel={cancelModal}
        onConfirm={() => {
          cancelModal();
          getTwitterOauthUrl();
        }}
      />
    </Spin>
  );
}
