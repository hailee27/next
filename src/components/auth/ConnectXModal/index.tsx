/* eslint-disable no-console */
import CButtonShadow from '@/components/common/CButtonShadow';
import CModalWapper from '@/components/common/CModalWapper';
import TwitterLogo from '@/components/common/icons/TwitterLogo';
import toastMessage from '@/utils/func/toastMessage';
import { useCallback, useState } from 'react';

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

  const onChangeLocalStorage = useCallback(async () => {
    try {
      window.removeEventListener('storage', onChangeLocalStorage, false);
      const storageData = JSON.parse(localStorage.getItem('twitter_callback_data') || '{}');
      console.log(storageData);
      if (storageData?.error) {
        toastMessage(storageData?.error, 'error');
        return;
      }
      if (storageData?.data) {
        console.log('twitter data', storageData?.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  function getTwitterOauthUrl() {
    window.addEventListener('storage', onChangeLocalStorage, false);
    const rootUrl = 'https://twitter.com/i/oauth2/authorize';
    const options = {
      redirect_uri: 'http://localhost:3000/auth/callback/twitter',
      client_id: 'UjZfREtGZlVIelpvS1NrbVhrRkY6MTpjaQ',
      state: actionType,
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
              cloutでは連携されたX（twitter）アカウントの情報を以下の目的で使用します。
              <br />
              ・X（twitter）アカウントでログイン
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
              ※続行することにより<span className="font-bold">利用規約</span>および
              <span className="font-bold">プライバシーポリシー</span>
              に同意したものとみなされます。
            </p>
          </div>
        </div>
      </CModalWapper>
    </>
  );
}
