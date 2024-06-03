/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '../../api';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    postTeacherComment: build.mutation<PostTeacherCommentResponse, PostTeacherCommentParams>({
      query: (params) => ({
        url: '/teacher/comment',
        method: 'POST',
        body: params,
      }),
    }),
    putTeacherComment: build.mutation<PutTeacherCommentResponse, PutTeacherCommentParams>({
      query: (params) => ({
        url: `/teacher/comment/${params?.id}`,
        method: 'PATCH',
        body: params,
      }),
    }),
    deleteTeacherComment: build.mutation<DeleteTeacherCommentResponse, DeleteTeacherCommentParams>({
      query: (params) => ({
        url: `/teacher/comment/${params?.id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export type DeleteTeacherCommentResponse = any;

export type DeleteTeacherCommentParams = {
  id: number;
};

export type PutTeacherCommentResponse = any;

export type PutTeacherCommentParams = {
  id: number;
  body: string;
};

export type PostTeacherCommentResponse = any;

export type PostTeacherCommentParams = {
  assignmentSessionId: number;
  body: string;
};

export { injectedRtkApi as TeacherCommentApi };

export const { usePostTeacherCommentMutation, usePutTeacherCommentMutation, useDeleteTeacherCommentMutation } =
  injectedRtkApi;
