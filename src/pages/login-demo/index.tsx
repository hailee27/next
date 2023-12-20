/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import CampaignCardItem from '@/components/CampaignCardItem';
import CampaignRewardCardItem from '@/components/CampaignRewardCardItem';
import CButtonShadow from '@/components/common/CButtonShadow';
import CShadowCard from '@/components/common/CShadowCard';
import MainFooter from '@/components/layout/_core/MainFooter';
import MainHeader from '@/components/layout/_core/MainHeader';
import { useTwitterAuthMutation } from '@/redux/endpoints/auth';
import toastMessage from '@/utils/func/toastMessage';
import { tiktokProvider } from '@/utils/social-provider-configs/tiktok.provider';
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';

export default function Login() {
  const { data: session } = useSession();
  const [provider, setProvider] = useState('');
  const [profile, setProfile] = useState<any>();
  const [twitterAuth] = useTwitterAuthMutation();

  function getTwitterOauthUrl() {
    const rootUrl = 'https://twitter.com/i/oauth2/authorize';
    const options = {
      redirect_uri:
        'https%3A%2F%2F6118-2405-4802-248e-48e0-497b-1417-d2d-8689.ngrok-free.app%2Fapi%2Fauth%2Fcallback%2Ftwitter',
      client_id: process?.env?.NEXT_PUBLIC_TWITTER_CLIENT_ID_KEY ?? '',
      state: 'state',
      response_type: 'code',
      code_challenge: 'y_SfRG4BmOES02uqWeIkIgLQAlTBggyf_G7uKT51ku8',
      code_challenge_method: 'S256',
      scope: ['users.read', 'tweet.read', 'follows.read', 'follows.write'].join(' '), // add/remove scopes as needed
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

  const onChangeLocalStorage = useCallback(async () => {
    try {
      const storageData = JSON.parse(localStorage.getItem('twitter_callback_data') || '{}');
      if (storageData?.error) {
        toastMessage('Something went wrong', 'error');
        return;
      }
      if (storageData?.data) {
        window.removeEventListener('storage', onChangeLocalStorage, false);
        console.log('twitter data', storageData?.data);
        if (storageData?.data?.id && storageData?.data?.email) {
          const data = await twitterAuth({
            twitterId: storageData?.data?.id?.toString(),
            email: storageData?.data?.email,
          }).unwrap();
          console.log(data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
  // finally {
  //   localStorage.removeItem('twitter_callback_data');
  //   localStorage.removeItem('oauthRequestToken');
  //   localStorage.removeItem('oauthRequestTokenSecret');
  // }

  useEffect(() => {
    window.addEventListener('storage', onChangeLocalStorage, false);
    return () => {
      window.removeEventListener('storage', onChangeLocalStorage, false);
    };
  }, []);

  return (
    <div>
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
        <CButtonShadow onClick={() => signIn('twitter')} title=" Sign in twitter NextAuth" type="button" />
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
      {/* <div>
        <button
          onClick={() => {
            const width = 450;
            const height = 730;
            const left = window.screen.width / 2 - width / 2;
            const top = window.screen.height / 2 - height / 2;
            window.open(
              'http://www.localhost:3000/login-demo/callback',
              'twitter',
              `width=${width}, height=${height}, top=${top}, left=${left}`
            );
          }}
          type="button"
        >
          implement
        </button>
      </div> */}
      <div className="h-6" />
      <div className="flex gap-[16px] ">
        <CampaignCardItem />
      </div>
      <div className="h-6" />
      <CampaignRewardCardItem />
      <div className="h-6" />
    </div>
  );
}

// Twitter
// Tik Tok
// Discord
// LINE
// Telegram
