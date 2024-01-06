/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-console */

'use client';

import axios from 'axios';
import { useCallback, useEffect } from 'react';

export default function TwitterAuthCallBack() {
  const searchParams = new URLSearchParams(window.location.search);
  const state = searchParams.get('state');
  const code = searchParams.get('code');

  const handleTwitterAuth = useCallback(async () => {
    try {
      if ((state === 'SIGNUP' || state === 'SIGNIN') && code) {
        const response = await axios.get(
          `${process?.env?.NEXT_PUBLIC_API_URL}auth/connect/twitter?code=${code}&state=${state}`
        );

        if (response?.data) {
          localStorage.setItem(
            'twitter_callback_data',
            JSON.stringify({
              data: response?.data,
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
    } catch (err) {
      localStorage.setItem(
        'twitter_callback_data',
        JSON.stringify({
          error: (err as any)?.message ?? 'Something went wrong',
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
