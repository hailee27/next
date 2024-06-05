/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

import { RootState } from '@/redux/store';

interface PropsType {
  children: React.ReactNode;
}

const SocketContext = createContext<any | undefined>(undefined);

const SocketContextProvider = ({ children }: PropsType) => {
  const auth = useSelector((state: RootState) => state.auth);

  const socket = io('13.212.100.130:8000', { transports: ['websocket'] });
  if (auth?.teacher?.id) {
    socket.auth = { teacherId: auth?.teacher?.id };
  } else {
    socket.auth = { studentId: auth?.student?.id };
  }

  const providerValue = useMemo(() => ({ socket }), [socket]);

  return <SocketContext.Provider value={providerValue}>{children}</SocketContext.Provider>;
};

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (context == null) {
    throw new Error('useSocketContext() called outside of a SocketProvider?'); // an alert is not placed because this is an error for the developer not the user
  }
  return context;
};

export { SocketContextProvider, SocketContext };
