/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-console */

'use client';

import { useLazyAuthTwitterQuery } from '@/redux/endpoints/auth';

import { useCallback, useEffect } from 'react';

export default function TwitterAuthCallBack() {
  const searchParams = new URLSearchParams(window.location.search);
  const stateQuery = searchParams.get('state');
  const code = searchParams.get('code');
  const [triggerAuthTwitter] = useLazyAuthTwitterQuery();
  const handleTwitterAuth = useCallback(async () => {
    try {
      const stateUrl = stateQuery?.split('+++');
      const redirectUri = stateUrl?.[0];
      const state = stateUrl?.[1];

      if (redirectUri && (state === 'SIGNUP' || state === 'SIGNIN') && code) {
        const resp = await triggerAuthTwitter({
          code,
          state,
          redirect_uri: redirectUri,
        }).unwrap();
        console.log(resp);
        if (resp?.accessToken && resp?.refreshToken && resp?.user) {
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
              error: 'twitter connect failed',
            })
          );
        }
      } else {
        localStorage.setItem(
          'twitter_callback_data',
          JSON.stringify({
            error: 'Missing params for connect twitter',
          })
        );
      }
    } catch (err: any) {
      localStorage.setItem(
        'twitter_callback_data',
        JSON.stringify({
          error: err?.data?.message || err?.message || 'Something went wrong',
        })
      );
    } finally {
      window.close();
    }
  }, []);

  useEffect(() => {
    handleTwitterAuth();
  }, [handleTwitterAuth]);
  return <div className="w-full h-full mt-[300px] text-center">Waiting a moment ...</div>;
}
