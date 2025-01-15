/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '../../api';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    postTeacherComment: build.mutation<PostTeacherCommentResponse, PostTeacherCommentParams>({
      query: (params) => {
        const formData = new FormData();
        formData.append('assignmentSessionId', String(params.assignmentSessionId));
        formData.append('body', params.body);
        formData.append('document', params.document);

        return {
          url: '/teacher/comment',
          method: 'POST',
          body: formData,
        };
      },
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
  document?: any;
};

export { injectedRtkApi as TeacherCommentApi };

export const { usePostTeacherCommentMutation, usePutTeacherCommentMutation, useDeleteTeacherCommentMutation } =
  injectedRtkApi;
