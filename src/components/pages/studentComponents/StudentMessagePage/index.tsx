/* eslint-disable import/no-cycle */
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { MessageResponseType, MessagesType } from '@/redux/endpoints/teacher/account';
import { useSocketContext } from '@/context/SocketContext';

import MessageDetail from './MessageDetail';

dayjs.extend(relativeTime);

export interface TeacherType {
  id: number;
  name: string;
}
const StudentMessageComponents = () => {
  const { socket } = useSocketContext();

  const [conversations, setConversations] = useState<MessagesType[]>([]);
  const [teacherChoose, setTeacherChoose] = useState<TeacherType>({ id: 0, name: '' });
  const [listMessage, setListMessage] = useState<MessageResponseType[]>([]);

  useEffect(() => {
    socket.emit('get-conversations', { page: 1, limit: 100 });

    socket.on('refresh-conversations', (res) => {
      if (res?.data?.length > 0) {
        setConversations(
          res?.data?.map((item) => ({
            teacherId: item?.conversation?.teacher?.id || 1,
            teacherName: item?.conversation?.teacher?.name || 'Teacher',
            lastMessage: item?.body,
            isRead: item?.isRead,
            updatedAt: item?.updatedAt,
          }))
        );
      } else {
        setConversations([
          {
            teacherId: 1,
            teacherName: 'Teacher',
            lastMessage: '',
            isRead: false,
            updatedAt: null,
          },
        ]);
      }
    });

    socket.on('new-message', (message) => {
      setListMessage((prev) => {
        if (prev?.findIndex((item) => item?.id === message?.id) < 0) {
          return prev.concat([
            {
              id: message?.id,
              body: message?.body,
              isRead: true,
              createdAt: message?.createdAt,
              teacher: {
                id: message?.teacher?.id || 0,
              },
            },
          ]);
        }
        return prev;
      });
    });

    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  const messageToTeacher = (message: string) => {
    if (socket) {
      socket.emit('direct-message', {
        teacherId: teacherChoose?.id || 1,
        body: message,
      });
    }
  };

  useEffect(() => {
    if (listMessage?.length <= 20) {
      const studentMessageElement = document.getElementById('student_message');
      (studentMessageElement as HTMLElement).scrollTop = (studentMessageElement as HTMLElement).scrollHeight;
    }
  }, [listMessage]);

  return (
    <div className="space-y-[24px] bg-[#fff] h-[800px] rounded flex gap-x-5">
      <div className="flex flex-col gap-y-5 w-[300px] h-[800px] p-5 overflow-y-auto">
        {conversations?.map((item) => (
          <div className="" key={item?.teacherId} role="presentation">
            <div
              className="cursor-pointer flex items-center gap-x-2"
              onClick={() => {
                setTeacherChoose({ id: item?.teacherId || 0, name: item?.teacherName || '' });
              }}
              role="presentation"
            >
              <div className="rounded-full h-10 w-10 border flex items-center justify-center uppercase font-bold">
                {item?.teacherName?.slice(0, 2)}
              </div>
              <div className="">
                <div className="font-semibold">{item?.teacherName}</div>
                <div className="flex gap-x-2">
                  <div className="text-[11px]">{item?.lastMessage}</div>
                  <div className="text-[11px] ">
                    {item?.updatedAt
                      ? dayjs(item?.updatedAt)
                          .subtract(7, 'hours')
                          .fromNow()
                      : ''}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 pr-6 h-[750] overflow-y-auto" id="student_message">
        <div className="">
          <MessageDetail
            listMessage={listMessage}
            messageToTeacher={messageToTeacher}
            setListMessage={setListMessage}
            teacherChoose={teacherChoose}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentMessageComponents;
