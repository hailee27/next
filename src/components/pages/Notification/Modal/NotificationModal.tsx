/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { Drawer } from 'antd';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

import { RootState } from '@/redux/store';

interface PropsType {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const NotificationModal = ({ open, setOpen }: PropsType) => {
  const auth = useSelector((state: RootState) => state.auth);
  const isTeacher = !!auth?.teacher?.id;

  const socket = io('13.212.100.130:8000', { transports: ['websocket'] });

  useEffect(() => {
    if (isTeacher) {
      socket.auth = { teacherId: auth?.teacher?.id };
    } else {
      socket.auth = { studentId: auth?.student?.id };
    }

    if (isTeacher) {
      socket.emit('teacher-get-notification', { page: 1, limit: 100 });
    } else {
      socket.emit('student-get-notification', { page: 1, limit: 100 });
    }

    socket.on('refresh-notification', (notification) => {
      console.log('notification', notification);
    });

    socket.on('new-notification', (notification) => {
      console.log('New notification', notification);
    });
  }, []);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Drawer closable={false} onClose={onClose} open={open} placement="right" title="Notification">
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </div>
  );
};

export default NotificationModal;
