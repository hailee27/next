/* eslint-disable import/no-cycle */
/* eslint-disable no-unsafe-optional-chaining */
import React, { useEffect, useState } from 'react';
import { Input, Spin } from 'antd';
import dayjs from 'dayjs';
import { SendOutlined } from '@ant-design/icons';

import { MessageResponseType, useLazyGetTeacherMessageQuery } from '@/redux/endpoints/teacher/account';
import { getRandomNumber } from '@/utils';
import BasicButton from '@/components/common/forms/BasicButton';

import { StudentType } from '..';

interface PropsType {
  studentChoose?: StudentType;
  messageToStudent: (v: string) => void;
  listMessage: MessageResponseType[];
  setListMessage: React.Dispatch<React.SetStateAction<MessageResponseType[]>>;
}

const PAGE_SIZE = 20;

const MessageDetail = ({ studentChoose, messageToStudent, listMessage, setListMessage }: PropsType) => {
  const [getMessage, { data, isFetching }] = useLazyGetTeacherMessageQuery();

  const [message, setMessage] = useState<string>('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (studentChoose?.id) {
      setPage(1);
      setListMessage([]);
      getMessage({ studentId: studentChoose?.id, page: 1, limit: PAGE_SIZE });
    }
  }, [studentChoose?.id]);

  useEffect(() => {
    getMessage({ studentId: studentChoose?.id, page, limit: PAGE_SIZE });
  }, [page]);

  useEffect(() => {
    if ((data?.result || [])?.length > 0) {
      const res = data?.result || [];
      setListMessage((prev) => res?.map((_, index) => res?.[res?.length - index - 1]).concat(prev));
    }
  }, [data?.result]);

  const handleSendMessage = () => {
    if (message?.length > 0) {
      messageToStudent(message);
      setListMessage((prev) =>
        prev.concat([
          {
            id: getRandomNumber(),
            body: message,
            isRead: true,
            createdAt: dayjs().format('YYYY-MM-DD HH:mm'),
            student: { id: 0 },
          },
        ])
      );
      setMessage('');
    }
  };

  if (!studentChoose?.id) return null;

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
          <div className={`flex ${item?.student?.id !== studentChoose?.id ? 'justify-end' : ''}`} key={item?.id}>
            <div className="flex items-center gap-x-2">
              {item?.student?.id === studentChoose?.id && (
                <div className="rounded-full h-7 w-7 border flex items-center justify-center uppercase text-[11px] font-bold">
                  {studentChoose?.name?.slice(0, 2)}
                </div>
              )}
              <p className="font-medium">{item?.body}</p>
              {item?.student?.id !== studentChoose?.id && (
                <div className="rounded-full h-7 w-7 border flex items-center justify-center uppercase text-[11px] font-bold">
                  ME
                </div>
              )}
            </div>
          </div>
        ))}

        {studentChoose?.id && (
          <div className="flex gap-x-5 mb-6 justify-between items-center">
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
  studentChoose: undefined,
};

export default MessageDetail;
