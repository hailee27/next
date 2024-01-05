import { Modal } from 'antd';
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import styles from './modal.module.scss';

interface PropsOpenPopUp {
  contents: JSX.Element | string;
  classNameWrapperPopup?: string;
}
interface TypePopUpContext {
  openPopUp: ({ contents }: PropsOpenPopUp) => void;
  closePopUp: () => void;
}
const PopUpContext = createContext<TypePopUpContext | undefined>(undefined);
const ModalRender = (node: React.ReactNode, classNameWrapper?: string) => (
  <div className={` ${classNameWrapper} bg-white border-2 border-[#333] w-full rounded-[16px] `}> {node}</div>
);

export const PopUpProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [contentPopUp, setContentPopUp] = useState<JSX.Element | string>('');
  const [classNameWrapper, setClassNameWrapper] = useState<string>('');
  const openPopUp = useCallback(
    ({ contents, classNameWrapperPopup }: PropsOpenPopUp) => {
      setContentPopUp(contents);
      setClassNameWrapper(classNameWrapperPopup ?? '');
      setOpen(true);
    },
    [contentPopUp]
  );
  const closePopUp = () => {
    setOpen(false);
  };
  const contextvalue = useMemo<TypePopUpContext>(
    () => ({
      openPopUp,
      closePopUp,
    }),
    []
  );
  return (
    <PopUpContext.Provider value={contextvalue}>
      <>
        {children}

        <Modal
          centered
          closeIcon={false}
          footer={false}
          modalRender={(node) => ModalRender(node, classNameWrapper)}
          onCancel={() => setOpen(false)}
          open={open}
          styles={{ mask: { background: '#333', opacity: 0.9 } }}
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
