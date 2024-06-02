/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '../../api';

import { MetaDataType } from './class';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTeacherInfo: build.query<GetTeacherInfoResponse, GetTeacherInfoParams>({
      query: () => ({
        url: '/teacher/get-me',
        method: 'GET',
      }),
    }),
    getTeacherMessage: build.query<GetTeacherMessageResponse, GetTeacherMessageParams>({
      query: (queryArg) => ({
        url: '/teacher/message',
        method: 'GET',
        params: queryArg,
      }),
    }),
    getTeacherUnreadMessage: build.query<GetTeacherUnreadMessageResponse, GetTeacherUnreadMessageParams>({
      query: () => ({
        url: '/teacher/unread-message',
        method: 'GET',
      }),
    }),
  }),
});

export type MessagesType = {
  studentId?: number;
  studentName?: string;
  teacherId?: number;
  teacherName?: string;
  lastMessage: string;
  isRead: boolean;
  updatedAt: string;
};

export type GetTeacherInfoResponse = any;

export type GetTeacherInfoParams = void;

export type GetTeacherUnreadMessageResponse = any;

export type GetTeacherUnreadMessageParams = void;

export type MessageResponseType = {
  body: string;
  id: number;
  isRead: boolean;
  createdAt: string;
  conversation: {
    id: number;
  };
};

export type GetTeacherMessageResponse = {
  message: string;
  status: boolean;
  metadata: MetaDataType;
  result: MessageResponseType[];
};

export type GetTeacherMessageParams = {
  limit?: number;
  page?: number;
  studentId?: number;
};

export { injectedRtkApi as AccountApi };

export const {
  useGetTeacherInfoQuery,
  useLazyGetTeacherInfoQuery,
  useGetTeacherMessageQuery,
  useLazyGetTeacherMessageQuery,
  useGetTeacherUnreadMessageQuery,
  useLazyGetTeacherUnreadMessageQuery,
} = injectedRtkApi;
