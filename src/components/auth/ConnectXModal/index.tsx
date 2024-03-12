/* eslint-disable no-console */

'use client';

import CButtonShadow from '@/components/common/CButtonShadow';
import useConnectX from '@/hooks/useConnectX';
import ConnectXConfirmModal from './ConnectXConfirmModal';

interface ConnectXModalProps {
  buttonLabel: string;
  buttonIcon?: React.ReactElement;
}

export default function ConnectXModal({ buttonLabel, buttonIcon }: ConnectXModalProps) {
  const { isModalOpen, showModal, cancelModal, getTwitterOauthUrl } = useConnectX({ handleAction: 'SIGNUP' });

  return (
    <>
      <div className="h-[53px]">
        <CButtonShadow
          onClick={showModal}
          textClass="text-white text-[14px] font-notoSans"
          title={buttonLabel}
          type="button"
          withIcon={{
            icon: buttonIcon ?? <div />,
            position: 'left',
          }}
        />
      </div>
      <ConnectXConfirmModal
        isOpen={isModalOpen}
        onCancel={cancelModal}
        onConfirm={() => {
          cancelModal();
          getTwitterOauthUrl();
        }}
      />
    </>
  );
}

ConnectXModal.defaultProps = {
  buttonIcon: undefined,
};
