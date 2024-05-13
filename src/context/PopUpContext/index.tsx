import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Box, Fade, Modal } from '@mui/material';

interface PopUpData {
  id?: string;
  content: JSX.Element | string;
  option?: {
    onCancel: () => void;
  };
}
interface PropsOpenPopUp {
  contents: JSX.Element | string;
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
  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    // p: 4,
  };
  return (
    <PopUpContext.Provider value={contextvalue}>
      <>
        {children}
        {contentPopUp.length > 0 &&
          contentPopUp.map((e) => (
            <Modal
              onClose={() => {
                e.option?.onCancel();
                closePopUp();
              }}
              open={contentPopUp[contentPopUp.length - 1].id === e.id}
            >
              <Fade in={contentPopUp[contentPopUp.length - 1].id === e.id}>
                <Box sx={style}>{e.content}</Box>
              </Fade>
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
