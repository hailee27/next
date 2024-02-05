import { Modal } from 'antd';
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import styles from './modal.module.scss';

interface PopUpData {
  id?: string;
  content: JSX.Element;
  option?: {
    onCancel: () => void;
  };
}
interface PropsOpenPopUp {
  contents: JSX.Element;
  classNameWrapperPopup?: string;
  typePopup?: 'POPUP' | 'ALERT';
  onCancel?: () => void;
}
interface TypePopUpContext {
  openPopUp: ({ contents }: PropsOpenPopUp) => void;
  closePopUp: () => void;
  closeAllPopUp: () => void;
}
const PopUpContext = createContext<TypePopUpContext | undefined>(undefined);
const ModalRender = (node: React.ReactNode, classNameWrapper?: string) => (
  <div className={` ${classNameWrapper} bg-white border-2 border-[#333] w-full rounded-[16px] `}> {node}</div>
);

export const PopUpProvider = ({ children }: { children: React.ReactNode }) => {
  // const [open, setOpen] = useState<boolean>(false);
  const [contentPopUp, setContentPopUp] = useState<PopUpData[]>([]);
  const [classNameWrapper, setClassNameWrapper] = useState<string>('');
  const [type, setType] = useState<'POPUP' | 'ALERT' | undefined>('POPUP');

  const openPopUp = useCallback(
    ({ contents, classNameWrapperPopup, typePopup, onCancel }: PropsOpenPopUp) => {
      const id = (Math.random() + 1).toString(36).substring(7);
      setClassNameWrapper(classNameWrapperPopup ?? '');
      setContentPopUp((prev) => [...prev, { id, content: contents, option: { onCancel: () => onCancel?.() } }]);
      setType(typePopup);
      // setOpen(true);
    },
    [contentPopUp, classNameWrapper, type]
  );
  const closePopUp = (callBack?: () => void) => {
    callBack?.();
    setContentPopUp((prev) => prev.filter((e) => e.id !== prev[prev.length - 1].id));
  };
  const closeAllPopUp = () => {
    setContentPopUp([]);
  };

  const contextvalue = useMemo<TypePopUpContext>(
    () => ({
      openPopUp,
      closePopUp,
      closeAllPopUp,
    }),
    [openPopUp, classNameWrapper, type, closeAllPopUp]
  );
  return (
    <PopUpContext.Provider value={contextvalue}>
      <>
        {children}

        {contentPopUp.length > 0 &&
          contentPopUp.map((e) => (
            <Modal
              centered
              // className="!hidden"
              closeIcon={false}
              footer={false}
              key={e.id}
              modalRender={(node) => ModalRender(node, classNameWrapper)}
              onCancel={() => {
                e.option?.onCancel();
                closePopUp();
              }}
              open={contentPopUp[contentPopUp.length - 1].id === e.id}
              styles={{ mask: { background: '#333', opacity: 0.9 } }}
              width="max-content"
              wrapClassName={styles.customModal}
            >
              {e.content}
            </Modal>
          ))}
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
