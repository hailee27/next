import { Modal } from 'antd';
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

interface TypePopUpContext {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  openPopUp: any;
}
const PopUpContext = createContext<TypePopUpContext | undefined>(undefined);

export const PopUpProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [content, setContent] = useState<JSX.Element | string>('');
  // eslint-disable-next-line react/no-unstable-nested-components
  const openPopUp = useCallback(() => {
    // setContent(content);
    setOpen(true);
  }, [content]);

  const contextvalue = useMemo<TypePopUpContext>(
    () => ({
      openPopUp,
    }),
    [openPopUp]
  );
  return (
    <PopUpContext.Provider value={contextvalue}>
      <>
        {children} <Modal open={open}>{content}</Modal>
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
