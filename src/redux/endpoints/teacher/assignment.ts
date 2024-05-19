import { api } from '../../api';

import { MetaDataType } from './class';
import { QuestionBankType } from './questionBank';
import { CreateUpdateDeleteResponse } from './student';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getListAssignment: build.query<GetListAssignmentResponse, GetListAssignmentParams>({
      query: (queryArg) => ({
        url: `/teacher/assignment/list/${queryArg?.classId}`,
        method: 'GET',
        params: {
          page: queryArg.page,
          limit: queryArg.limit,
          createdAt: queryArg.createdAt,
        },
      }),
    }),
    getDetailAssignment: build.query<GetDetailAssignmentResponse, GetDetailAssignmentParams>({
      query: (queryArg) => ({
        url: `/teacher/assignment/detail/${queryArg?.id}`,
        method: 'GET',
      }),
    }),
    postAssignment: build.mutation<PostAssignmentResponse, PostAssignmentParams>({
      query: (queryArg) => ({
        url: '/teacher/assignment',
        method: 'POST',
        body: queryArg,
      }),
    }),
    putAssignment: build.mutation<PutAssignmentResponse, PutAssignmentParams>({
      query: (queryArg) => ({
        url: `/teacher/assignment/${queryArg?.id}`,
        method: 'PATCH',
        body: queryArg,
      }),
    }),
    deleteAssignment: build.mutation<DeleteAssignmentResponse, DeleteAssignmentParams>({
      query: (queryArg) => ({
        url: `/teacher/assignment/${queryArg?.id}`,
        method: 'DELETE',
      }),
    }),

    postQuestionAssignment: build.mutation<PostQuestionAssignmentResponse, PostQuestionAssignmentParams>({
      query: (queryArg) => ({
        url: '/teacher/question',
        method: 'POST',
        body: queryArg,
      }),
    }),
  }),
});

export type PostQuestionAssignmentParams = { assignmentId: number; questions: QuestionBankType[] };

export type PostQuestionAssignmentResponse = CreateUpdateDeleteResponse;

export type AssignmentSearchObj = {
  classId?: number;
  class?: {
    value: number;
    label: string;
  };
  createdAt?: string;
};

export type DeleteAssignmentResponse = CreateUpdateDeleteResponse;

export type DeleteAssignmentParams = { id: number };

export type PutAssignmentResponse = {
  data: {
    message: string;
    status: boolean;
  };
};

export type PutAssignmentParams = {
  id: number;
  name: string;
  totalMark: number;
  timeAllow: number;
  timeStart: string;
  timeEnd: string;
};

export type PostAssignmentResponse = {
  data: {
    message: string;
    status: boolean;
  };
};

export type PostAssignmentParams = {
  name: string;
  classId: number;
  totalMark: number;
  timeAllow: number;
  timeStart: string;
  timeEnd: string;
};

export type GetDetailAssignmentResponse = {
  message: string;
  status: boolean;
  result: {
    assignment: AssignmentType;
  };
};

export type GetDetailAssignmentParams = { id: number };

export type AssignmentType = {
  id?: number;
  name?: string;
  classId?: number;
  totalMark?: number;
  timeAllow?: number;
  timeStart?: string;
  timeEnd?: string;
};

export type GetListAssignmentResponse = {
  message?: string;
  status?: boolean;
  metadata?: MetaDataType;
  result?: AssignmentType[];
};

export type GetListAssignmentParams = {
  classId: number;
  limit: number;
  page: number;
  createdAt?: string;
};

export { injectedRtkApi as AssignmentApi };

export const {
  useGetListAssignmentQuery,
  useLazyGetListAssignmentQuery,
  useGetDetailAssignmentQuery,
  useLazyGetDetailAssignmentQuery,
  usePostAssignmentMutation,
  usePutAssignmentMutation,
  useDeleteAssignmentMutation,

  usePostQuestionAssignmentMutation,
} = injectedRtkApi;
