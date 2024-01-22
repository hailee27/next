/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

import { useLazyMeQuery } from '@/redux/endpoints/auth';
import { setSession, setUser } from '@/redux/slices/auth.slice';
import { getErrorMessage } from '@/utils/func/getErrorMessage';
import toastMessage from '@/utils/func/toastMessage';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

interface IProps {
  handleAction: 'SIGNUP' | 'CONNECT';
}

export default function useConnectX({ handleAction }: IProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [triggerGetMe, { isFetching: isFetchingUser }] = useLazyMeQuery();

  const refreshUser = async () => {
    try {
      const data = await triggerGetMe().unwrap();
      if (data as any) {
        dispatch(setUser(data));
      }
    } catch (error) {
      // console.log(error, 'Errrrrrrrrrrrrrrrrrr');
      toastMessage(getErrorMessage(error), 'error');
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const cancelModal = () => {
    setIsModalOpen(false);
  };

  const onChangeLocalStorage = useCallback(async () => {
    try {
      const storageData = JSON.parse(localStorage.getItem('twitter_callback_data') || '{}');

      localStorage.removeItem('twitter_callback_data');
      if (storageData?.data || storageData?.error) {
        window.removeEventListener('storage', onChangeLocalStorage, false);
      }
      if (storageData?.error) {
        toastMessage(storageData?.error, 'error');
        return;
      }
      if (handleAction === 'SIGNUP') {
        console.log(storageData, 'storageData');
        if (storageData?.data?.accessToken && storageData?.data?.refreshToken && storageData?.data?.user) {
          console.log('twitter data', storageData);
          dispatch(setSession({ ...storageData?.data }));

          router.replace('/my-page');
        } else if (storageData?.data?.totpToken && storageData?.data?.user) {
          router.push(
            `/auth/sign-in/${
              router.pathname?.includes('campaign-creator') ? 'campaign-creator' : 'campaign-implementer'
            }/verification?code=${storageData?.data?.code ?? undefined}&totpToken=${
              storageData?.data?.totpToken ?? undefined
            }&userId=${storageData?.data?.user?.id ?? undefined}&authMethod=twitter`
          );
        }
      } else if (handleAction === 'CONNECT') {
        await refreshUser();
      }
    } catch (error) {
      console.log(error);
      toastMessage(getErrorMessage(error), 'error');
    }
  }, []);

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
    const width = 450;
    const height = 730;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const newWindow = window.open(
      url,
      'Twitter Auth',
      `menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=${width}, height=${height}, top=${top}, left=${left}`
    );

    newWindow?.focus();
  }
  return {
    isModalOpen,
    showModal,
    cancelModal,
    getTwitterOauthUrl,
    isFetchingUser,
    refreshUser,
  };
}
