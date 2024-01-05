/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-console */
import axios from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

export default function TwitterAuthCallBack() {
  const { query } = useRouter();
  const handleTwitterAuth = useCallback(async () => {
    try {
      if ((query?.state === 'SIGNUP' || query?.state === 'SIGNIN') && query?.code) {
        const response = await axios.get(
          `${process?.env?.NEXT_PUBLIC_API_URL}auth/connect/twitter?code=${query?.code}&state=${query?.state}`
        );
        localStorage.setItem(
          'twitter_callback_data',
          JSON.stringify({
            data: JSON.stringify(response || {}),
          })
        );
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
  }, [query?.state, query?.code]);

  useEffect(() => {
    handleTwitterAuth();
  }, [handleTwitterAuth]);
  return <div className="w-full h-full mt-[300px] text-center">Waiting a moment ...</div>;
}
