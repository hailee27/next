import { Modal } from 'antd';
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import styles from './modal.module.scss';

interface PropsOpenPopUp {
  contents: JSX.Element | string;
}
interface TypePopUpContext {
  openPopUp: ({ contents }: PropsOpenPopUp) => void;
  closePopUp: () => void;
}
const PopUpContext = createContext<TypePopUpContext | undefined>(undefined);
const ModalRender = (node: React.ReactNode) => (
  <div className="bg-white border-2 border-[#2D3648] w-full "> {node}</div>
);

export const PopUpProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [contentPopUp, setContentPopUp] = useState<JSX.Element | string>('');

  const openPopUp = useCallback(
    ({ contents }: PropsOpenPopUp) => {
      setContentPopUp(contents);
      setOpen(true);
    },
    [contentPopUp]
  );
  const closePopUp = () => {
    setOpen(!open);
  };
  const contextvalue = useMemo<TypePopUpContext>(
    () => ({
      openPopUp,
      closePopUp,
    }),
    [openPopUp]
  );
  return (
    <PopUpContext.Provider value={contextvalue}>
      <>
        {children}

        <Modal
          centered
          closeIcon={false}
          footer={false}
          modalRender={ModalRender}
          onCancel={() => setOpen(false)}
          open={open}
          width="max-content"
          wrapClassName={styles.customModal}
        >
          {contentPopUp}
        </Modal>
      </>
    </PopUpContext.Provider>
  );
};

export const usePopUpContext = () => {
  const popups = useContext(PopUpContext);
  if (popups == null) {
    throw new Error('usePopUpContext() called outside of a PopUpProvider?'); // an alert is not placed because this is an error for the developer not the user
  }
  return popups;
};
export default PopUpContext;
