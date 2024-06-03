/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '../../api';
import { MessageResponseType } from '../teacher/account';
import { MetaDataType } from '../teacher/class';
import { CreateUpdateDeleteResponse } from '../teacher/student';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getStudentInfo: build.query<GetStudentInfoResponse, GetStudentInfoParams>({
      query: () => ({
        url: '/student/get-me',
        method: 'GET',
      }),
    }),
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
    postStudentChangePassword: build.mutation<PostStudentChangePasswordResponse, PostStudentChangePasswordParams>({
      query: (params) => ({
        url: '/auth/change-password',
        method: 'POST',
        body: params,
      }),
    }),
  }),
});

export type GetStudentInfoResponse = any;

export type GetStudentInfoParams = void;

export type PostStudentChangePasswordResponse = CreateUpdateDeleteResponse;

export type PostStudentChangePasswordParams = {
  oldPassword: string;
  newPassword: string;
};

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
  useGetStudentInfoQuery,
  useLazyGetStudentInfoQuery,
  useGetStudentMessageQuery,
  useLazyGetStudentMessageQuery,
  useGetStudentUnreadMessageQuery,
  useLazyGetStudentUnreadMessageQuery,
  usePostStudentChangePasswordMutation,
} = injectedRtkApi;
