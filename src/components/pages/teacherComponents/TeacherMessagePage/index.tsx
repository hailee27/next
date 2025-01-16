/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { UserAddOutlined } from '@ant-design/icons';
import { Divider } from 'antd';

import { MessageResponseType, MessagesType } from '@/redux/endpoints/teacher/account';
import { ValueSelect } from '@/redux/endpoints/auth';
import { useSocketContext } from '@/context/SocketContext';

import MessageDetail from './MessageDetail';
import AddNewMessageModal from './Modal/AddNewMessageModal';

dayjs.extend(relativeTime);

export interface StudentType {
  id: number;
  name: string;
}

const TeacherMessageComponents = () => {
  const { socket } = useSocketContext();

  const [conversations, setConversations] = useState<MessagesType[]>([]);
  const [studentChoose, setStudentChoose] = useState<StudentType>({ id: 0, name: '' });
  const [listMessage, setListMessage] = useState<MessageResponseType[]>([]);
  const [addNewMessage, setAddNewMessage] = useState<boolean>(false);

  useEffect(() => {
    socket.emit('get-conversations', { page: 1, limit: 100 });

    socket.on('refresh-conversations', (res) => {
      setConversations(
        res?.data?.map((item) => ({
          studentId: item?.conversation?.student?.id,
          studentName: item?.conversation?.student?.name,
          lastMessage: item?.body,
          isRead: item?.isRead,
          updatedAt: item?.updatedAt,
        }))
      );
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
              student: {
                id: message?.student?.id || 0,
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

  const messageToStudent = (message: string) => {
    if (socket) {
      socket.emit('direct-message', {
        studentId: studentChoose?.id,
        body: message,
      });
    }
  };

  const handleAddMessage = (value: ValueSelect | null) => {
    if (!value?.value) {
      setAddNewMessage(false);
    } else {
      setConversations((prev) =>
        [
          {
            studentId: value?.value,
            studentName: value?.label,
            lastMessage: '',
            isRead: false,
            updatedAt: null,
            createdAt: null,
          },
        ].concat(prev as any)
      );
      setAddNewMessage(false);
    }
  };

  useEffect(() => {
    if (listMessage?.length <= 20) {
      const teacherMessageElement = document.querySelector('#teacher_message');
      (teacherMessageElement as HTMLElement).scrollTop = (teacherMessageElement as HTMLElement).scrollHeight;
    }
  }, [listMessage]);

  return (
    <div className="space-y-[24px] bg-[#fff] h-[800px] rounded flex gap-x-5">
      <div className="flex flex-col gap-y-4 w-[300px] bg-slate-100 h-[800px] p-5 overflow-y-auto">
        <div className="flex items-center justify-end ">
          <div
            className="border w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
            onClick={() => {
              setAddNewMessage(true);
            }}
            role="presentation"
          >
            <UserAddOutlined />
          </div>
        </div>
        <Divider />
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
                  <div className="text-[11px] ">{item?.updatedAt ? dayjs(item?.updatedAt).fromNow() : ''}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1 pr-6 h-[750px] overflow-y-auto" id="teacher_message">
        <div className="">
          <MessageDetail
            listMessage={listMessage}
            messageToStudent={messageToStudent}
            setListMessage={setListMessage}
            studentChoose={studentChoose}
          />
        </div>
      </div>

      {addNewMessage && (
        <AddNewMessageModal
          handleAddMessage={handleAddMessage}
          openModal={addNewMessage}
          setOpenModal={setAddNewMessage}
          studentIds={conversations?.map((item) => Number(item?.studentId)) || []}
        />
      )}
    </div>
  );
};

export default TeacherMessageComponents;
