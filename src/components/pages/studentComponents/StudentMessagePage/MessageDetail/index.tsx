/* eslint-disable import/no-cycle */
/* eslint-disable no-unsafe-optional-chaining */
import React, { useEffect, useState } from 'react';
import { Input, Spin } from 'antd';
import dayjs from 'dayjs';
import { SendOutlined } from '@ant-design/icons';

import { MessageResponseType } from '@/redux/endpoints/teacher/account';
import { getRandomNumber } from '@/utils';
import { useLazyGetStudentMessageQuery } from '@/redux/endpoints/student/account';

import { TeacherType } from '..';

interface PropsType {
  teacherChoose?: TeacherType;
  messageToTeacher: (v: string) => void;
}

const MessageDetail = ({ teacherChoose, messageToTeacher }: PropsType) => {
  const [getMessage, { data, isFetching }] = useLazyGetStudentMessageQuery();

  const [listMessage, setListMessage] = useState<MessageResponseType[]>([]);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if (teacherChoose?.id) {
      setListMessage([]);
      getMessage({ teacherId: teacherChoose?.id });
    }
  }, [teacherChoose?.id]);

  useEffect(() => {
    if ((data?.result || [])?.length > 0) {
      const res = data?.result || [];
      setListMessage((prev) => prev.concat(res?.map((_, index) => res?.[res?.length - index - 1])));
    }
  }, [data?.result]);

  if (data?.result?.length === 0) return null;

  return (
    <Spin spinning={isFetching}>
      <div className="flex flex-col gap-y-5">
        {listMessage?.map((item) => (
          <div className={`flex ${item?.conversation?.id !== teacherChoose?.id ? 'justify-end' : ''}`} key={item?.id}>
            <div className="flex items-center gap-x-2">
              {item?.conversation?.id === teacherChoose?.id && (
                <div className="rounded-full h-7 w-7 border flex items-center justify-center uppercase text-[11px] font-bold">
                  {teacherChoose?.name?.slice(0, 2)}
                </div>
              )}
              <p className="font-medium">{item?.body}</p>
              {item?.conversation?.id !== teacherChoose?.id && (
                <div className="rounded-full h-7 w-7 border flex items-center justify-center uppercase text-[11px] font-bold">
                  ME
                </div>
              )}
            </div>
          </div>
        ))}

        {listMessage?.length > 0 && (
          <div className="flex gap-x-5 justify-between items-center">
            <Input
              className="flex-1"
              onChange={(e) => setMessage(e.target.value)}
              placeholder="message"
              value={message}
            />
            <div className="w-[20px]">
              <SendOutlined
                className="cursor-pointer"
                onClick={() => {
                  if (message?.length > 0) {
                    setListMessage((prev) =>
                      prev.concat([
                        {
                          id: getRandomNumber(),
                          body: message,
                          isRead: true,
                          createdAt: dayjs().format('YYYY-MM-DD HH:mm'),
                          conversation: { id: 0 },
                        },
                      ])
                    );
                    messageToTeacher(message);
                    setMessage('');
                  }
                }}
              />
            </div>
          </div>
        )}
      </div>
    </Spin>
  );
};

MessageDetail.defaultProps = {
  teacherChoose: undefined,
};

export default MessageDetail;
