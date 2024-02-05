import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import CreatorRoleModal from '../CreatorRoleFeedbackModal/CreatorRoleModal';

export default function UserRoleWapper({ children }: { children: React.ReactElement }) {
  const [isOpenCreatorRoleModal, setIsOpenCreatorRoleModal] = useState(false);
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const onThrowRouterError = () => {
    // Throwing an actual error class trips the Next.JS 500 Page, this string literal does not.
    // eslint-disable-next-line no-throw-literal, @typescript-eslint/no-throw-literal
    throw ' 👍 Abort route change due to user not enough condition to view page site. Triggered by UserRoleWapper.tsx. Please ignore this error.';
  };

  const onStopRouterEvent = useCallback(() => {
    router.events.emit('routeChangeError');
    onThrowRouterError();
  }, [router]);

  useEffect(() => {
    const start = (url) => {
      if (url?.startsWith('/campaign-creator') && (user?.twoFactorMethod === 'NONE' || user?.emailId === null)) {
        setIsOpenCreatorRoleModal(true);
        onStopRouterEvent();
      }
    };
    const end = () => {};
    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', end);
    router.events.on('routeChangeError', end);

    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', end);
      router.events.off('routeChangeError', end);
    };
  });

  return (
    <>
      {children}
      <CreatorRoleModal
        isOpen={isOpenCreatorRoleModal}
        onCancel={() => {
          setIsOpenCreatorRoleModal(false);
        }}
      />
    </>
  );
}
