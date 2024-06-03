/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '../../api';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    postStudentComment: build.mutation<PostStudentCommentResponse, PostStudentCommentParams>({
      query: (params) => ({
        url: '/comment',
        method: 'POST',
        body: params,
      }),
    }),
    putStudentComment: build.mutation<PutStudentCommentResponse, PutStudentCommentParams>({
      query: (params) => ({
        url: `/comment/${params?.id}`,
        method: 'PATCH',
        body: params,
      }),
    }),
    deleteStudentComment: build.mutation<DeleteStudentCommentResponse, DeleteStudentCommentParams>({
      query: (params) => ({
        url: `/comment/${params?.id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export type DeleteStudentCommentResponse = any;

export type DeleteStudentCommentParams = {
  id: number;
};

export type PutStudentCommentResponse = any;

export type PutStudentCommentParams = {
  id: number;
  body: string;
};

export type PostStudentCommentResponse = any;

export type PostStudentCommentParams = {
  assignmentSessionId: number;
  body: string;
};

export { injectedRtkApi as StudentCommentApi };

export const { usePostStudentCommentMutation, usePutStudentCommentMutation, useDeleteStudentCommentMutation } =
  injectedRtkApi;
