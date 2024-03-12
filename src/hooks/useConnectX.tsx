/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

import { useLazyMeQuery } from '@/redux/endpoints/auth';
import { setSession } from '@/redux/slices/auth.slice';
import { REDIRECT_QUERY_KEY } from '@/utils/constant/enums';
import { getErrorMessage } from '@/utils/func/getErrorMessage';
import { openWindowPopup } from '@/utils/func/openWindowPopup';
import toastMessage from '@/utils/func/toastMessage';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

interface IProps {
  handleAction: 'SIGNUP' | 'CONNECT';
  callBackPath?: string;
}

export default function useConnectX({ handleAction, callBackPath }: IProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [triggerGetMe, { isFetching: isFetchingUser }] = useLazyMeQuery();

  const [isRefetchUser, setIsRefetchUser] = useState(false);

  const refreshUser = async () => {
    try {
      await triggerGetMe().unwrap();
    } catch (error) {
      toastMessage(getErrorMessage(error), 'error');
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const cancelModal = () => {
    setIsModalOpen(false);
  };

  const onChangeLocalStorage = async () => {
    try {
      const storageData = JSON.parse(localStorage.getItem('twitter_callback_data') || '{}');

      if (storageData?.data || storageData?.error) {
        localStorage.setItem('twitter_callback_data', '{}');
        window.removeEventListener('storage', onChangeLocalStorage, false);
      }
      if (storageData?.error) {
        toastMessage(storageData?.error, 'error');
        return;
      }
      if (storageData?.data) {
        if (handleAction === 'SIGNUP') {
          if (storageData?.data?.accessToken && storageData?.data?.refreshToken && storageData?.data?.user) {
            dispatch(setSession({ ...storageData?.data }));

            if (callBackPath) {
              toastMessage('X連携をONにしました。', 'success');
              window.location.assign(`${window.location.origin}${callBackPath}`);
            } else {
              router.replace('/my-page');
            }
          } else if (storageData?.data?.totpToken && storageData?.data?.user) {
            router.push(
              `/auth/sign-in/${
                router.pathname?.includes('campaign-creator') ? 'campaign-creator' : 'campaign-implementer'
              }/verification?code=${storageData?.data?.code ?? undefined}&totpToken=${
                storageData?.data?.totpToken ?? undefined
              }&userId=${storageData?.data?.user?.id ?? undefined}&authMethod=twitter&${REDIRECT_QUERY_KEY}=${
                callBackPath ?? ''
              }`
            );
          }
        } else if (handleAction === 'CONNECT') {
          setIsRefetchUser(true);
          await refreshUser();
          toastMessage('X連携をONにしました。', 'success');
          window.location.assign(`${window.location.origin}${callBackPath}`);
        }
      }
    } catch (error) {
      console.log(error);
      toastMessage(getErrorMessage(error), 'error');
    } finally {
      setIsRefetchUser(false);
    }
  };

  function getTwitterOauthUrl() {
    localStorage.removeItem('twitter_callback_data');
    window.addEventListener('storage', onChangeLocalStorage, false);
    const rootUrl = 'https://twitter.com/i/oauth2/authorize';
    const options = {
      redirect_uri: `${window.location?.origin}/auth/callback/twitter`,
      client_id: 'UjZfREtGZlVIelpvS1NrbVhrRkY6MTpjaQ',
      state: `${window.location?.origin}/auth/callback/twitter+++${handleAction}`,
      response_type: 'code',
      code_challenge: 'challenge',
      code_challenge_method: 'plain',
      scope: ['users.read', 'tweet.read', 'follows.read'].join(' '),
    };
    const qs = new URLSearchParams(options).toString();
    const url = `${rootUrl}?${qs}`;

    openWindowPopup(url, 'Twitter Auth', 450, 680);
  }
  return {
    isModalOpen,
    showModal,
    cancelModal,
    getTwitterOauthUrl,
    isFetchingUser,
    refreshUser,
    isRefetchUser,
  };
}
