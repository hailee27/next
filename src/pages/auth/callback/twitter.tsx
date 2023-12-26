/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-console */
import axios from 'axios';
import { useEffect } from 'react';

export default function TwitterAuthCallBack() {
  const urlParams = new URLSearchParams(window.location.search);
  const oauthTokenParam = urlParams.get('oauth_token');
  const oauthTokenVerifierParam = urlParams.get('oauth_verifier');

  const handleTwitterAuth = async () => {
    try {
      const localReqToken = localStorage.getItem('oauthRequestToken');
      const localReqTokenSecret = localStorage.getItem('oauthRequestTokenSecret');

      if (oauthTokenParam === localReqToken && oauthTokenVerifierParam) {
        const response = await axios.get(
          `${process?.env?.NEXT_PUBLIC_API_URL}auth/redirect/${localReqToken}/${localReqTokenSecret}/${oauthTokenVerifierParam}`
        );
        if (response?.data?.user) {
          localStorage.setItem(
            'twitter_callback_data',
            JSON.stringify({
              data: response?.data?.user,
            })
          );
        } else {
          localStorage.setItem(
            'twitter_callback_data',
            JSON.stringify({
              error: 'Auth Failed: failed to get user',
            })
          );
        }
      } else {
        localStorage.setItem(
          'twitter_callback_data',
          JSON.stringify({
            error: 'Auth Failed: Token not matching',
          })
        );
      }
    } catch (err) {
      localStorage.setItem(
        'twitter_callback_data',
        JSON.stringify({
          error: err || {},
        })
      );
    } finally {
      window.close();
    }
  };

  useEffect(() => {
    if (oauthTokenParam && oauthTokenVerifierParam) {
      console.log('call', oauthTokenParam, oauthTokenVerifierParam);
      handleTwitterAuth();
    }
  }, []);
  return <div className="w-full h-full mt-[300px] text-center">Waiting a moment ...</div>;
}
