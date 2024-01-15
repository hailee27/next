/* eslint-disable max-lines */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-lines-per-function */

import CampaignCardItem from '@/components/CampaignCardItem';
import CampaignRewardCardItem from '@/components/CampaignRewardCardItem';
import CButtonShadow from '@/components/common/CButtonShadow';
import CShadowCard from '@/components/common/CCardShadow';
import CModalWapper from '@/components/common/CModalWapper';
import LineAddFriend from '@/components/common/line/LineAddFriend';
import MainFooter from '@/components/layout/_core/MainFooter';
import MainHeader from '@/components/layout/_core/MainHeader';
import useScript from '@/hooks/useScript';
import toastMessage from '@/utils/func/toastMessage';
import { tiktokProvider } from '@/utils/social-provider-configs/tiktok.provider';
import { Checkbox, Radio, Space } from 'antd';
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import { useCallback, useEffect, useImperativeHandle, useState } from 'react';

export default function Login() {
  const { data: session } = useSession();
  const [provider, setProvider] = useState('');
  const [value, setValue] = useState(1);
  const [profile, setProfile] = useState<any>();
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: '',
  });
  const handleCancel = () => {
    setModalState({
      isOpen: false,
      type: '',
    });
  };
  const handleOpen = (type: '1' | '2' | '3') => {
    setModalState({
      isOpen: true,
      type,
    });
  };

  function getTiktokOauthUrl() {
    const rootUrl = 'https://www.tiktok.com/v2/auth/authorize/';
    const options = {
      client_key: tiktokProvider?.clientKey,
      scope: ['user.info.basic', 'user.info.profile'].join(','),
      redirect_uri: 'https://www.youtube.com/',
      state: 'state_tiktok',
      response_type: 'code',
    };

    const qs = new URLSearchParams(options).toString();
    const url = `${rootUrl}?${qs}`;
    const width = 450;
    const height = 730;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    window.open(
      url,
      'twitter',
      `menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=${width}, height=${height}, top=${top}, left=${left}`
    );
  }

  // const popupSignin = (url: string, title: string) => {
  //   const dualScreenLeft = window.screenLeft ?? window.screenX;
  //   const dualScreenTop = window.screenTop ?? window.screenY;
  //   const width = window.innerWidth ?? document.documentElement.clientWidth ?? 450;

  //   const height = window.innerHeight ?? document.documentElement.clientHeight ?? 730;

  //   const systemZoom = width / window.screen.availWidth;

  //   const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
  //   const top = (height - 550) / 2 / systemZoom + dualScreenTop;

  //   const newWindow = window.open(
  //     url,
  //     title,
  //     `width=${500 / systemZoom},height=${550 / systemZoom},top=${top},left=${left}`
  //   );

  //   newWindow?.focus();
  // };

  const handleClickAuthTwitter = async () => {
    try {
      const resp = await axios.get('http://localhost:8080/auth/twitter');
      if (resp?.data?.redirectUrl) {
        localStorage.setItem('oauthRequestTokenSecret', resp?.data?.oauthRequestTokenSecret);
        localStorage.setItem('oauthRequestToken', resp?.data?.oauthRequestToken);
        const width = 576;
        const height = 730;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;
        window.open(
          resp?.data?.redirectUrl,
          'Twitter Authentication',
          ` width=${width}, height=${height}, top=${top}, left=${left}`
        );

        // menubar=no,location=no,resizable=no,scrollbars=no,status=no,
      } else {
        console.log('auth faield');
      }
      // localStorage.setItem('test', '!2312313');
      // window.open(
      //   '/auth/callback/twitter',
      //   'Twitter Authentication',
      //   ` width=${width}, height=${height}, top=${top}, left=${left}`
      // );
    } catch (error) {
      console.log(error);
    }
  };
  // telegram bot API token: 6886566855:AAGdl1a3_GdP4Y6tvNqbrCRnN34nku_Fs30
  console.log('session', session);
  const handleOpenPopup = (url: string, title: string) => {
    const dualScreenLeft = window.screenLeft ?? window.screenX;
    const dualScreenTop = window.screenTop ?? window.screenY;
    const width = window.innerWidth ?? document.documentElement.clientWidth ?? 475;

    const height = window.innerHeight ?? document.documentElement.clientHeight ?? 768;

    const systemZoom = width / window.screen.availWidth;

    const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
    const top = (height - 550) / 2 / systemZoom + dualScreenTop;

    const newWindow = window.open(
      url,
      title,
      `width=${500 / systemZoom},height=${550 / systemZoom},top=${top},left=${left}`
    );

    newWindow?.focus();
  };
  return (
    <div>
      <div className="font-notoSans text-main-text ">
        <div>
          <button onClick={handleOpen.bind(null, '1')} type="button">
            Open 1: custom task enter text
          </button>
        </div>
        <div>
          <button onClick={handleOpen.bind(null, '2')} type="button">
            Open 2: custom task select one
          </button>
        </div>
        <div>
          <button onClick={handleOpen.bind(null, '3')} type="button">
            Open 3: custom task select multiple
          </button>
        </div>
        <div>
          <button
            onClick={handleOpenPopup.bind(
              null,
              'https://twitter.com/intent/follow?screen_name=historyinmemes',
              'Twitter'
            )}
            type="button"
          >
            twitter task : follow link
          </button>
        </div>
        <div>
          <button
            onClick={handleOpenPopup.bind(
              null,
              'https://twitter.com/intent/retweet?tweet_id=463440424141459456',
              'Twitter'
            )}
            type="button"
          >
            twitter task : retweet link
          </button>
        </div>
        <div>
          <button
            onClick={handleOpenPopup.bind(null, 'https://twitter.com/Interior/status/463440424141459456', 'Twitter')}
            type="button"
          >
            twitter task : Quote tweet link //
          </button>
        </div>
        <div>
          <button onClick={handleOpenPopup.bind(null, 'https://twitter.com/compose/tweet', 'Twitter')} type="button">
            twitter task : Hashtag link //
          </button>
        </div>
        <div>
          <button
            onClick={handleOpenPopup.bind(null, 'https://twitter.com/Interior/status/463440424141459456', 'Twitter')}
            type="button"
          >
            twitter task : view tweet link
          </button>
        </div>
        <div>
          <button
            onClick={handleOpenPopup.bind(
              null,
              'https://twitter.com/intent/tweet?tweet_id=463440424141459456',
              'Twitter'
            )}
            type="button"
          >
            twitter task : tweet link //
          </button>
        </div>
        <div>
          <button onClick={handleOpenPopup.bind(null, 'https://www.tiktok.com/@redbull.no1', 'Twitter')} type="button">
            tiktok task : follow link
          </button>
        </div>
        <div>
          <button
            onClick={handleOpenPopup.bind(
              null,
              'https://www.tiktok.com/@redbull.no1/video/7321202187160374561',
              'Twitter'
            )}
            type="button"
          >
            tiktok task : watch video link
          </button>
        </div>
        <div>
          <button
            onClick={handleOpenPopup.bind(
              null,
              'https://discord.com/channels/752553802359505017/752553802359505020',
              'Twitter'
            )}
            type="button"
          >
            discord task : join channel link
          </button>
        </div>
        <div>
          <button
            //   onClick={handleOpenPopup.bind(
            //     null,
            //     'https://discord.com/channels/752553802359505017/752553802359505020',
            //     'Twitter'
            //   )}
            type="button"
          >
            telegram task : join channel link ////
          </button>
        </div>
        <div>
          <button
            //   onClick={handleOpenPopup.bind(
            //     null,
            //     'https://discord.com/channels/752553802359505017/752553802359505020',
            //     'Twitter'
            //   )}
            type="button"
          >
            telegram task : watch post link ////
          </button>
        </div>
        <div>
          <button
            //   onClick={handleOpenPopup.bind(
            //     null,
            //     'https://discord.com/channels/752553802359505017/752553802359505020',
            //     'Twitter'
            //   )}
            type="button"
          >
            LINE task :友達登録 link ////
          </button>
        </div>
        <CModalWapper isOpen={modalState?.isOpen && modalState?.type === '1'} onCancel={handleCancel}>
          <h3 className="text-[20px] font-bold tracking-[0.6px] leading-[30px] text-center">タスクタイトル</h3>
          <div className="h-[16px]" />
          <p className="text-[13px] leading-[22px]">
            タスク説明文が入ります。タスク説明文が入ります。タスク説明文が入ります。
          </p>
          <div className="h-[32px]" />
          <h4 className="text-[14px] font-bold tracking-[0.42px] leading-[21px]">質問文が入ります</h4>
          <div className="h-[16px]" />
          <textarea
            className="w-full min-h-[120px] p-[16px] bg-[#F2F2F2] text-[13px] tracking-[0.39px] placeholder:text-[13px] placeholder:text-[#aaa] rounded-[8px] resize-none"
            placeholder="自由回答形式の回答欄"
          />
          <div className="h-[24px]" />

          <div className="w-[206px] h-[53px] mx-auto">
            <CButtonShadow title="送信する" type="button" />
          </div>
        </CModalWapper>
        <CModalWapper isOpen={modalState?.isOpen && modalState?.type === '2'} onCancel={handleCancel}>
          <h3 className="text-[20px] font-bold tracking-[0.6px] leading-[30px] text-center">タスクタイトル</h3>
          <div className="h-[16px]" />
          <p className="text-[13px] leading-[22px]">
            タスク説明文が入ります。タスク説明文が入ります。タスク説明文が入ります。
          </p>
          <div className="h-[32px]" />
          <h4 className="text-[14px] font-bold tracking-[0.42px] leading-[21px]">質問文が入ります</h4>
          <div className="h-[16px]" />
          <div className="pl-[6px] pt-[6px]">
            <div className="relative w-full h-full">
              <div className="absolute w-full h-full top-[0px] left-[0px] bg-[#333] rounded-[8px]" />
              <div className="border-[2px] border-[#333] rounded-[8px] bg-white translate-x-[-6px] translate-y-[-6px] transition-all duration-200 overflow-hidden">
                <div className="p-[24px] clout-custom-antd-radio">
                  <Radio.Group onChange={() => {}} value={value}>
                    <Space className="flex flex-col gap-[16px]" direction="vertical">
                      <Radio value={1}>Option A</Radio>
                      <Radio value={2}>Option b</Radio>
                      <Radio value={3}>option c</Radio>
                    </Space>
                  </Radio.Group>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[24px]" />
          <div className="w-[206px] h-[53px] mx-auto">
            <CButtonShadow title="送信する" type="button" />
          </div>
        </CModalWapper>
        <CModalWapper isOpen={modalState?.isOpen && modalState?.type === '3'} onCancel={handleCancel}>
          <h3 className="text-[20px] font-bold tracking-[0.6px] leading-[30px] text-center">タスクタイトル</h3>
          <div className="h-[16px]" />
          <p className="text-[13px] leading-[22px]">
            タスク説明文が入ります。タスク説明文が入ります。タスク説明文が入ります。
          </p>
          <div className="h-[32px]" />
          <h4 className="text-[14px] font-bold tracking-[0.42px] leading-[21px]">質問文が入ります</h4>
          <div className="h-[16px]" />
          <div className="pl-[6px] pt-[6px]">
            <div className="relative w-full h-full">
              <div className="absolute w-full h-full top-[0px] left-[0px] bg-[#333] rounded-[8px]" />
              <div className="border-[2px] border-[#333] rounded-[8px] bg-white translate-x-[-6px] translate-y-[-6px] transition-all duration-200 overflow-hidden">
                <div className="p-[24px] ">
                  <Checkbox.Group
                    className="flex flex-col gap-[16px]"
                    defaultValue={['Apple']}
                    options={['Apple', 'Pear', 'Orange']}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="h-[24px]" />
          <div className="w-[206px] h-[53px] mx-auto">
            <CButtonShadow title="送信する" type="button" />
          </div>
        </CModalWapper>
      </div>
      <div className="h-6" />
      <div className="w-[300px] h-[66px]">
        <CButtonShadow
          onClick={() => {
            handleClickAuthTwitter?.();
          }}
          title="Sign in 3 legged auth twitter"
          type="button"
        />
      </div>
      <LineAddFriend />
      <div className="h-6" />
      <div className="w-[300px] h-[66px]">
        <CButtonShadow onClick={() => signIn('tiktok')} title=" Sign in Tiktok NextAuth" type="button" />
      </div>
      <div className="h-6" />
      <div className="w-[300px] h-[66px]">
        <CButtonShadow onClick={() => signIn('discord')} title=" Sign in discord NextAuth" type="button" />
      </div>
      <div className="h-6" />

      <div className="w-[300px] h-[66px]">
        <CButtonShadow onClick={() => signIn('line')} title=" Sign in LINE NextAuth" type="button" />
      </div>
      <div className="h-6" />
      <div className="w-[300px] h-[66px]">
        <CButtonShadow
          onClick={(e) => {
            getTiktokOauthUrl();
          }}
          title=" Sign in tiktok"
          type="button"
        />
      </div>

      <div className="h-6" />
      {/* <LoginSocialTwitter
        client_id={process?.env?.NEXT_PUBLIC_TWITTER_CLIENT_ID_KEY || ''}
        onLoginStart={() => {
          console.log('start auth');
        }}
        onLogoutSuccess={() => {
          console.log('logout');
        }}
        onReject={(err: any) => {
          console.log(err);
        }}
        onResolve={({ _provider, data }: any) => {
          console.log(_provider, data);
          setProvider(_provider);
          setProfile(data);
        }}
        // client_secret={process.env.REACT_APP_TWITTER_V2_APP_SECRET || ''}
        redirect_uri="https%3A%2F%2Fa9dd-14-248-82-148.ngrok-free.app%2Flogin"
      >
        <div className="w-[300px] h-[66px]">
          <CButtonShadow title="custom login with tw" />
        </div>
      </LoginSocialTwitter> */}
      <div className="h-6" />
      <div className="w-[300px] h-[66px]">
        <CButtonShadow
          classBgColor="bg-[#fff]"
          classShadowColor="bg-[#333]"
          textClass="text-[#333] text-[14px]  font-inner"
          title="Demo 1"
        />
      </div>
      <div className="h-6" />

      <div className="w-[300px] h-[66px]">
        <CButtonShadow
          classBgColor="bg-btn-gradation"
          classShadowColor="bg-[#333]"
          textClass="text-[#333] text-[16px] font-dmSans"
          title="Demo 2"
        />
      </div>
    </div>
  );
}

// Twitter
// Tik Tok
// Discord
// LINE
// Telegram
