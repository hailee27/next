/* eslint-disable no-console */
import { useTwitterSignupMutation } from '@/redux/endpoints/auth';
import { RootState } from '@/redux/store';
import { getErrorMessage } from '@/utils/func/getErrorMessage';
import toastMessage from '@/utils/func/toastMessage';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function CampaignImplementerPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const { accessToken } = useSelector((store: RootState) => store.auth);
  const [isUserClickedTwitterBtn, setIsUserClickedTwitterBtn] = useState(false);

  const [twitterSignup] = useTwitterSignupMutation();

  const handleRedirectTwitterAuth = async () => {
    setIsUserClickedTwitterBtn(true);
    const width = 450;
    const height = 730;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const newWindow = window.open(
      '/auth/popup/twitter',
      'Twitter Signin',
      `menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=${width}, height=${height}, top=${top}, left=${left}`
    );

    newWindow?.focus();
  };

  const handleTwitterAuthCallback = async (twitterId: string, userEmail: string) => {
    try {
      const data = await twitterSignup({
        twitterId: twitterId.toString(),
        email: userEmail,
        role: 'QUESTER',
      }).unwrap();
      console.log(data);
    } catch (error) {
      //   signOut();
      toastMessage(getErrorMessage(error), 'error');
    }
  };

  useLayoutEffect(() => {
    if (accessToken) {
      router.push('/');
    }
  }, []);

  useEffect(() => {
    if (isUserClickedTwitterBtn === false && session) {
      signOut();
    }
    if (session?.user?.userProfile?.id && session?.user?.userProfile?.email && isUserClickedTwitterBtn) {
      console.log('session?.user?.userProfile?.id', session?.user?.userProfile?.id);
      handleTwitterAuthCallback(session?.user?.userProfile?.id, session?.user?.userProfile?.email);
    }
  }, [session, isUserClickedTwitterBtn]);
  console.log('session', session);

  return (
    <div>
      <button
        className="bg-[#D9D9D9] w-[303px] h-[40px] text-[15px] font-medium"
        onClick={() => handleRedirectTwitterAuth()}
        type="button"
      >
        X（twitter）を連携
      </button>
    </div>
  );
}
