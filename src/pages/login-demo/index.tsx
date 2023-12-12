/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import axios from 'axios';
import React, { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import LoginSocialTwitter, { ObjectType } from '@/components/auth/LoginSocialTwitter';
import CButtonShadow from '@/components/common/CButtonShadow';

export default function Login() {
  const { data: session } = useSession();
  const [provider, setProvider] = useState('');
  const [profile, setProfile] = useState<any>();
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

  console.log('session, provider, profile', session, provider, profile);
  return (
    <div>
      <div onClick={getTwitterOauthUrl}>
        <p>{' twitter'}</p>
      </div>
      <div className="h-6" />

      <div className="w-[300px] h-[66px]">
        <CButtonShadow onClick={() => signIn('twitter')} title=" Sign in twitter NextAuth" type="button" />
      </div>

      <div className="h-6" />
      <LoginSocialTwitter
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
      </LoginSocialTwitter>
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
          classBgColor="bg-gradient-blue-to-green"
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
