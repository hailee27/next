import React, { createContext, useContext, useMemo, useState } from 'react';
import { Alert, Slide, SlideProps, Snackbar } from '@mui/material';

type PropsToggleAlert = { content: JSX.Element | string; type?: 'success' | 'info' | 'warning' | 'error' };
type TypeNotificationContext = {
  toggleAlert: (contents: PropsToggleAlert) => void;
};
const NotificationContext = createContext<TypeNotificationContext | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [notification, setNotification] = useState<PropsToggleAlert | undefined>(undefined);
  const toggleAlert = (contents: PropsToggleAlert) => {
    setOpen(true);
    setNotification(contents);
  };

  const contextValue = useMemo<TypeNotificationContext>(() => ({ toggleAlert }), [toggleAlert]);
  return (
    <NotificationContext.Provider value={contextValue}>
      <>
        {children}
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          autoHideDuration={1200}
          onClose={() => setOpen(false)}
          open={open}
          // eslint-disable-next-line react/no-unstable-nested-components
          TransitionComponent={(props: SlideProps) => <Slide {...props} direction="down" />}
        >
          <Alert severity={notification?.type} variant="standard">
            {notification?.content}
          </Alert>
        </Snackbar>
      </>
    </NotificationContext.Provider>
  );
};
export const useNotificationContext = () => {
  const popups = useContext(NotificationContext);
  if (popups == null) {
    throw new Error('useNotificationContext() called outside of a PopUpProvider?'); // an alert is not placed because this is an error for the developer not the user
  }
  return popups;
};
export default NotificationContext;
