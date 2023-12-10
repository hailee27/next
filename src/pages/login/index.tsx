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
import LoginSocialTwitter from '@/components/auth/LoginSocialTwitter';

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
  console.log('session, provider, profile', session, provider, profile);
  return (
    <div>
      <div onClick={getTwitterOauthUrl}>
        <p>{' twitter'}</p>
      </div>
      <button onClick={() => signIn()} type="button">
        Sign in
      </button>
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
        redirect_uri="https%3A%2F%2Fff04-2405-4802-248e-48e0-497b-1417-d2d-8689.ngrok-free.app%2Fapi%2Fauth%2Fcallback%2Ftwitter"
      >
        login with tw
      </LoginSocialTwitter>
    </div>
  );
}
