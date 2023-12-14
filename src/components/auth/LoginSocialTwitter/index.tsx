/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */

import React, { useCallback, useEffect } from 'react';

export type ObjectType = {
  [key: string]: any;
};

export type IResolveParams = {
  provider: string;
  data?: ObjectType;
};

interface Props {
  client_id: string;
  className?: string;
  redirect_uri: string;
  state?: string;
  fields?: string;
  scope?: string;
  children?: React.ReactNode;
  isOnlyGetCode?: boolean;
  isOnlyGetToken?: boolean;
  onLoginStart?: () => void;
  onLogoutSuccess?: () => void;
  onReject: (reject: string | ObjectType) => void;
  onResolve: ({ provider, data }: IResolveParams) => void;
}

const TWITTER_URL: string = 'https://twitter.com';
const TWITTER_API_URL: string = 'https://api.twitter.com';
const PREVENT_CORS_URL: string = 'https://cors.bridged.cc';

export const LoginSocialTwitter = ({
  client_id,
  className = '',
  redirect_uri,
  children,
  fields = 'created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld',
  state = 'state',
  scope = 'users.read%20tweet.read',
  isOnlyGetCode = false,
  isOnlyGetToken = false,
  onLoginStart,
  onReject,
  onResolve,
}: Props) => {
  useEffect(() => {
    const popupWindowURL = new URL(window.location.href);
    const code = popupWindowURL.searchParams.get('code');
    const stateee = popupWindowURL.searchParams.get('state');
    if (stateee?.includes('_twitter') && code) {
      localStorage.setItem('twitter', code);
      window.close();
    }
  }, []);

  const getProfile = useCallback(
    (data: ObjectType) => {
      const url = `${PREVENT_CORS_URL}/${TWITTER_API_URL}/2/users/me?user.fields=${fields}`;
      fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          onResolve({ provider: 'twitter', data: { ...data, ...res.data } });
        })
        .catch((err) => onReject(err));
    },
    [fields, onReject, onResolve]
  );

  const getAccessToken = useCallback(
    async (code: string) => {
      if (isOnlyGetCode) onResolve({ provider: 'twitter', data: { code } });
      else {
        const details = new URLSearchParams({
          code,
          redirect_uri,
          client_id,
          grant_type: 'authorization_code',
          code_verifier: 'challenge',
        });

        const requestOAuthURL = `${PREVENT_CORS_URL}/${TWITTER_API_URL}/2/oauth2/token`;
        const data = await fetch(requestOAuthURL, {
          method: 'POST',
          body: details,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
          .then((data) => data.json())
          .catch((err) => onReject(err));

        if (data.access_token) {
          if (isOnlyGetToken) onResolve({ provider: 'twitter', data });
          else getProfile(data);
        }
      }
    },
    [onReject, getProfile, onResolve, client_id, redirect_uri, isOnlyGetCode, isOnlyGetToken]
  );

  const handlePostMessage = useCallback(
    async ({ type, code, provider }: ObjectType) =>
      type === 'code' && provider === 'twitter' && code && getAccessToken(code),
    [getAccessToken]
  );

  const onChangeLocalStorage = useCallback(() => {
    window.removeEventListener('storage', onChangeLocalStorage, false);
    const code = localStorage.getItem('twitter');
    if (code) {
      handlePostMessage({ provider: 'twitter', type: 'code', code });
      localStorage.removeItem('twitter');
    }
  }, [handlePostMessage]);

  const onLogin = useCallback(async () => {
    onLoginStart?.();
    window.addEventListener('storage', onChangeLocalStorage, false);
    const oauthUrl = `${TWITTER_URL}/i/oauth2/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&state=${`${state}_twitter`}&code_challenge=challenge&code_challenge_method=plain`;
    const width = 450;
    const height = 730;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    window.open(
      oauthUrl,
      'twitter',
      `menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=${width}, height=${height}, top=${top}, left=${left}`
    );
  }, [scope, state, client_id, onLoginStart, redirect_uri, onChangeLocalStorage]);

  return (
    <div className={className} onClick={onLogin}>
      {children}
    </div>
  );
};

export default LoginSocialTwitter;
