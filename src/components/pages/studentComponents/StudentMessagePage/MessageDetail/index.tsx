/* eslint-disable import/no-cycle */
/* eslint-disable no-unsafe-optional-chaining */
import React, { useEffect, useState } from 'react';
import { Input, Spin } from 'antd';
import dayjs from 'dayjs';
import { SendOutlined } from '@ant-design/icons';

import { getRandomNumber } from '@/utils';
import { useLazyGetStudentMessageQuery } from '@/redux/endpoints/student/account';
import { MessageResponseType } from '@/redux/endpoints/teacher/account';
import BasicButton from '@/components/common/forms/BasicButton';

import { TeacherType } from '..';

interface PropsType {
  teacherChoose?: TeacherType;
  messageToTeacher: (v: string) => void;
  listMessage: MessageResponseType[];
  setListMessage: React.Dispatch<React.SetStateAction<MessageResponseType[]>>;
}

const PAGE_SIZE = 20;

const MessageDetail = ({ teacherChoose, messageToTeacher, listMessage, setListMessage }: PropsType) => {
  const [getMessage, { data, isFetching }] = useLazyGetStudentMessageQuery();

  const [message, setMessage] = useState<string>('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (teacherChoose?.id) {
      setPage(1);
      setListMessage([]);
      getMessage({ teacherId: teacherChoose?.id, page: 1, limit: PAGE_SIZE });
    }
  }, [teacherChoose?.id]);

  useEffect(() => {
    getMessage({ teacherId: teacherChoose?.id, page, limit: PAGE_SIZE });
  }, [page]);

  useEffect(() => {
    if ((data?.result || [])?.length > 0) {
      const res = data?.result || [];
      setListMessage((prev) => res?.map((_, index) => res?.[res?.length - index - 1]).concat(prev));
    }
  }, [data?.result]);

  const handleSendMessage = () => {
    if (message?.length > 0) {
      setListMessage((prev) =>
        prev.concat([
          {
            id: getRandomNumber(),
            body: message,
            isRead: true,
            createdAt: dayjs().format('YYYY-MM-DD HH:mm'),
            teacher: { id: 0 },
          },
        ])
      );
      messageToTeacher(message);
      setMessage('');
    }
  };

  if (!teacherChoose?.id) return null;

  return (
    <Spin spinning={isFetching}>
      <div className="flex flex-col gap-y-5">
        {page < Number(data?.metadata?.totalPage) && (
          <BasicButton
            className="font-[700]"
            onClick={() => {
              setPage((prev) => prev + 1);
            }}
            styleType="link"
          >
            See More
          </BasicButton>
        )}
        {listMessage?.map((item) => (
          <div className={`flex ${item?.teacher?.id !== teacherChoose?.id ? 'justify-end' : ''}`} key={item?.id}>
            <div className="flex items-center gap-x-2">
              {item?.teacher?.id === teacherChoose?.id && (
                <div className="rounded-full h-7 w-7 border flex items-center justify-center uppercase text-[11px] font-bold">
                  {teacherChoose?.name?.slice(0, 2)}
                </div>
              )}

              <div className="">
                <p className="font-medium">{item?.body}</p>
                <p className="text-[10px]">{dayjs(item?.createdAt).fromNow()}</p>
              </div>

              {item?.teacher?.id !== teacherChoose?.id && (
                <div className="rounded-full h-7 w-7 border flex items-center justify-center uppercase text-[11px] font-bold">
                  ME
                </div>
              )}
            </div>
          </div>
        ))}

        {teacherChoose?.id && (
          <div className="flex gap-x-5  mb-6 justify-between items-center">
            <Input
              className="flex-1"
              onChange={(e) => setMessage(e.target.value)}
              onPressEnter={() => handleSendMessage()}
              placeholder="message"
              value={message}
            />
            <div className="w-[20px]">
              <SendOutlined
                className="cursor-pointer"
                onClick={() => {
                  handleSendMessage();
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
