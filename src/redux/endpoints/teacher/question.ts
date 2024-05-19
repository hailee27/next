/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '../../api';

import { MetaDataType } from './class';
import { QuestionBankType } from './questionBank';
import { CreateUpdateDeleteResponse } from './student';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getQuestionAssignment: build.query<GetQuestionAssignmentResponse, GetQuestionAssignmentParams>({
      query: (queryArg) => ({
        url: `/teacher/question/list/${queryArg?.assignmentId}`,
        method: 'GET',
      }),
    }),
    getQuestionDetailAssignment: build.query<GetQuestionDetailAssignmentResponse, GetQuestionDetailAssignmentParams>({
      query: (queryArg) => ({
        url: `/teacher/question/detail/${queryArg?.id}`,
        method: 'GET',
      }),
    }),
    putQuestionAssignment: build.mutation<PutQuestionDetailAssignmentResponse, PutQuestionDetailAssignmentParams>({
      query: (queryArg) => ({
        url: `/teacher/question/${queryArg?.id}`,
        method: 'PATCH',
      }),
    }),
    deleteQuestionAssignment: build.mutation<
      DeleteQuestionDetailAssignmentResponse,
      DeleteQuestionDetailAssignmentParams
    >({
      query: (queryArg) => ({
        url: `/teacher/question/${queryArg?.id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export type DeleteQuestionDetailAssignmentResponse = CreateUpdateDeleteResponse;

export type DeleteQuestionDetailAssignmentParams = {
  id: number;
};

export type PutQuestionDetailAssignmentResponse = CreateUpdateDeleteResponse;

export type PutQuestionDetailAssignmentParams = {
  id: number;
  body: string;
  choices: string;
  instruction: string;
  response: string;
};

export type GetQuestionDetailAssignmentResponse = any;

export type GetQuestionDetailAssignmentParams = {
  id: number;
};

export type GetQuestionAssignmentResponse = {
  result: QuestionBankType[];
  metadata: MetaDataType;
  message: string;
  status: boolean;
};

export type GetQuestionAssignmentParams = {
  assignmentId: number;
};

export { injectedRtkApi as QuestionApi };

export const {
  useGetQuestionAssignmentQuery,
  useLazyGetQuestionAssignmentQuery,
  useGetQuestionDetailAssignmentQuery,
  useLazyGetQuestionDetailAssignmentQuery,
  usePutQuestionAssignmentMutation,
  useDeleteQuestionAssignmentMutation,
} = injectedRtkApi;
