/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-cycle */
import { api } from '../../api';
import { QuestionBankType } from '../teacher/questionBank';
import { CreateUpdateDeleteResponse } from '../teacher/student';

import { SessionType } from './assignment';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getListPracticeRoom: build.query<GetListPracticeRoomResponse, GetListPracticeRoomParams>({
      query: (queryArg) => ({
        url: '/practice-room',
        method: 'GET',
        params: queryArg,
      }),
    }),
    getPracticeQuestion: build.query<GetPracticeQuestionResponse, GetPracticeQuestionParams>({
      query: (queryArg) => ({
        url: '/practice-room/question',
        method: 'GET',
        params: queryArg,
      }),
    }),
    putPracticeQuestion: build.mutation<PutPracticeQuestionResponse, PutPracticeQuestionParams>({
      query: (queryArg) => ({
        url: '/practice-room/question',
        method: 'PATCH',
        body: queryArg,
      }),
    }),
    postPracticeStart: build.mutation<PostPracticeStartResponse, PostPracticeStartParams>({
      query: (queryArg) => ({
        url: '/practice-room/start',
        method: 'POST',
        body: queryArg,
      }),
    }),
    savePractice: build.mutation<SavePracticeResponse, SavePracticeParams>({
      query: (queryArg) => ({
        url: '/practice-room/save',
        method: 'POST',
        body: queryArg,
      }),
    }),
    submitPractice: build.mutation<SubmitPracticeResponse, SubmitPracticeParams>({
      query: (queryArg) => ({
        url: '/practice-room/submit',
        method: 'POST',
        body: queryArg,
      }),
    }),
  }),
});

export { injectedRtkApi as PracticeApi };

export type SubmitPracticeResponse = CreateUpdateDeleteResponse;

export type SubmitPracticeParams = any;

export type SavePracticeResponse = CreateUpdateDeleteResponse;

export type SavePracticeParams = {
  assignmentSessionId: number;
  answers: any;
};

export type PostPracticeStartResponse = {
  message: string;
  status: boolean;
  result: {
    session: SessionType;
    questions: QuestionBankType[];
    response?: {
      id: number;
      mark: string;
    };
  };
};

export type PostPracticeStartParams = {
  assignmentId?: number;
  timeAllow?: number;
  questionCount?: number;
  type?: number;
};

export type PutPracticeQuestionResponse = CreateUpdateDeleteResponse;

export type PutPracticeQuestionParams = {
  assignmentId?: number;
  questionId: number;
  answers: any;
};

export type GetPracticeQuestionResponse = any;

export type GetPracticeQuestionParams = {
  assignmentId: number;
  questionId: number;
};

export type ListPracticeRoomType = {
  id?: number;
  name?: string;
  createdAt?: string;
  questionCount?: string;
  totalMark?: string;
  timeAllow?: string;
  type?: number;
  status?: boolean;
};

export type GetListPracticeRoomResponse = {
  message: string;
  status: boolean;
  result: ListPracticeRoomType[];
};

export type GetListPracticeRoomParams = {
  limit?: number;
  page?: number;
  search?: string;
  createdAt?: string;
  updatedAt?: string;
};

export const {
  useGetListPracticeRoomQuery,
  useLazyGetListPracticeRoomQuery,
  useGetPracticeQuestionQuery,
  useLazyGetPracticeQuestionQuery,
  usePutPracticeQuestionMutation,
  usePostPracticeStartMutation,
  useSavePracticeMutation,
  useSubmitPracticeMutation,
} = injectedRtkApi;
