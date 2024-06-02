/* eslint-disable no-console */
/* eslint-disable import/no-cycle */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { RootState } from '@/redux/store';
import { MessagesType } from '@/redux/endpoints/teacher/account';

import MessageDetail from './MessageDetail';

dayjs.extend(relativeTime);

export interface StudentType {
  id: number;
  name: string;
}
const TeacherMessageComponents = () => {
  const auth = useSelector((state: RootState) => state.auth);

  const socket = io('13.212.100.130:8000', { transports: ['websocket'] });

  const [conversations, setConversations] = useState<MessagesType[]>([]);
  const [studentChoose, setStudentChoose] = useState<StudentType>({ id: 0, name: '' });

  useEffect(() => {
    socket.auth = { teacherId: auth?.teacher?.id };

    socket.emit('get-conversations', { page: 1, limit: 100 });

    socket.on('refresh-conversations', (res) => {
      setConversations(
        res?.data?.map((item) => ({
          studentId: item?.student?.id,
          studentName: item?.student?.name,
          lastMessage: item?.body,
          isRead: item?.isRead,
          updatedAt: item?.updatedAt,
        }))
      );
    });

    socket.on('new-message', (message) => {
      console.log('New Message', message);
    });
  }, []);

  const messageToStudent = (message: string) => {
    socket.emit('direct-message', {
      studentId: studentChoose?.id,
      body: message,
    });
  };

  return (
    <div className="space-y-[24px] bg-[#fff] rounded flex gap-x-5">
      <div className="flex flex-col gap-y-5 w-[300px] h-[850px] p-5 overflow-y-auto">
        {conversations?.map((item) => (
          <div className="" key={item?.studentId}>
            <div
              className="cursor-pointer flex items-center gap-x-2"
              onClick={() => {
                setStudentChoose({ id: item?.studentId || 0, name: item?.studentName || '' });
              }}
              role="presentation"
            >
              <div className="rounded-full h-10 w-10 border flex items-center justify-center uppercase font-bold">
                {item?.studentName?.slice(0, 2)}
              </div>
              <div className="">
                <div className="font-semibold">{item?.studentName}</div>
                <div className="flex gap-x-2">
                  <div className="text-[11px]">{item?.lastMessage}</div>
                  <div className="text-[11px] ">{dayjs(item?.updatedAt).fromNow()}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 pr-6 h-[850px] overflow-y-auto">
        <div className="">
          <MessageDetail messageToStudent={messageToStudent} studentChoose={studentChoose} />
        </div>
      </div>
    </div>
  );
};

export default TeacherMessageComponents;
