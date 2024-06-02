/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '../../api';
import { MessageResponseType } from '../teacher/account';
import { MetaDataType } from '../teacher/class';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getStudentMessage: build.query<GetStudentMessageResponse, GetStudentMessageParams>({
      query: (queryArg) => ({
        url: '/student/message',
        method: 'GET',
        params: queryArg,
      }),
    }),
    getStudentUnreadMessage: build.query<GetStudentUnreadMessageResponse, GetStudentUnreadMessageParams>({
      query: () => ({
        url: '/student/unread-message',
        method: 'GET',
      }),
    }),
  }),
});

export type GetStudentUnreadMessageResponse = any;

export type GetStudentUnreadMessageParams = void;

export type GetStudentMessageResponse = {
  message: string;
  status: boolean;
  metadata: MetaDataType;
  result: MessageResponseType[];
};

export type GetStudentMessageParams = {
  limit?: number;
  page?: number;
  teacherId?: number;
};

export { injectedRtkApi as StudentAccountApi };

export const {
  useGetStudentMessageQuery,
  useLazyGetStudentMessageQuery,
  useGetStudentUnreadMessageQuery,
  useLazyGetStudentUnreadMessageQuery,
} = injectedRtkApi;
