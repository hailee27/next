/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-console */

'use client';

import { useConnectTwitterMutation } from '@/redux/endpoints/auth';
import clsx from 'clsx';
import Image from 'next/image';

import { useCallback, useEffect } from 'react';
import styles from './styles.module.scss';

export default function TwitterAuthCallBack() {
  const searchParams = new URLSearchParams(window.location.search);
  const stateQuery = searchParams.get('state');
  const code = searchParams.get('code');
  const [connectTwitter] = useConnectTwitterMutation();
  const handleTwitterAuth = useCallback(async () => {
    try {
      const stateUrl = stateQuery?.split('+++');
      const redirectUri = stateUrl?.[0];
      const state = stateUrl?.[1];

      if (redirectUri && (state === 'SIGNUP' || state === 'SIGNIN' || state === 'CONNECT') && code) {
        const request = {
          body: {
            code,
            state: state === 'SIGNUP' || state === 'SIGNIN' ? 'SIGNIN' : 'CONNECT',
            redirect_uri: redirectUri,
          },
        };
        if (state !== 'CONNECT') {
          (request as any).params = {
            token: 'user',
          };
        }
        const resp = await connectTwitter(request).unwrap();
        console.log(resp);
        if (
          (resp?.accessToken && resp?.refreshToken && resp?.user) ||
          (resp?.user && resp?.totpToken) ||
          resp?.status === true
        ) {
          localStorage.setItem(
            'twitter_callback_data',
            JSON.stringify({
              data: resp,
            })
          );
        } else {
          localStorage.setItem(
            'twitter_callback_data',
            JSON.stringify({
              error: 'Twitterに接続できません。',
            })
          );
        }
      } else {
        localStorage.setItem(
          'twitter_callback_data',
          JSON.stringify({
            error: 'Twitter に接続するためのパラメータが不足しています。',
          })
        );
      }
    } catch (err: any) {
      localStorage.setItem(
        'twitter_callback_data',
        JSON.stringify({
          error: err?.data?.message || err?.message || '何か問題が発生しました',
        })
      );
    } finally {
      window.close();
    }
  }, []);

  useEffect(() => {
    handleTwitterAuth();
  }, [handleTwitterAuth]);
  return (
    <div className="min-h-[calc(100vh-64px)] w-full h-full text-center flex justify-center items-center">
      <div className={clsx(styles.loader)}>
        <span />
        <span />
        <span />
        <span />
        <div className="w-[101px] h-[30px]">
          <Image
            alt="footer logo"
            className="w-full h-full object-cover"
            height={30}
            src="/assets/images/logo 1.png"
            width={101}
          />
        </div>
      </div>
    </div>
  );
}
