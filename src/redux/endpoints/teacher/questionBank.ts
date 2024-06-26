/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '../../api';

import { MetaDataType } from './class';
import { CreateUpdateDeleteResponse } from './student';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getListQuestionBank: build.query<GetListQuestionBankResponse, GetListQuestionBankParams>({
      query: (queryArg) => ({
        url: '/teacher/question-bank/list',
        method: 'GET',
        params: {
          page: queryArg.page,
          limit: queryArg.limit,
          search: queryArg.search,
          createdAt: queryArg.createdAt,
        },
      }),
    }),
    getDetailQuestionBank: build.query<GetDetailQuestionBankResponse, GetDetailQuestionBankParams>({
      query: (queryArg) => ({
        url: `/teacher/question-bank/detail/${queryArg?.id}`,
        method: 'GET',
      }),
    }),
    postQuestionBank: build.mutation<PostQuestionBankResponse, PostQuestionBankParams>({
      query: (queryArg) => ({
        url: '/teacher/question-bank',
        method: 'POST',
        body: queryArg,
      }),
    }),
    putQuestionBank: build.mutation<PutQuestionBankResponse, PutQuestionBankParams>({
      query: (queryArg) => ({
        url: `/teacher/question-bank/${queryArg?.id}`,
        method: 'PATCH',
        body: queryArg,
      }),
    }),
    deleteQuestionBank: build.mutation<DeleteQuestionBankResponse, DeleteQuestionBankParams>({
      query: (queryArg) => ({
        url: `/teacher/question-bank/${queryArg?.id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export type DeleteQuestionBankResponse = CreateUpdateDeleteResponse;

export type DeleteQuestionBankParams = {
  id: number;
};

export type PutQuestionBankResponse = {
  body: string;
  choices: string;
  instruction: string;
  response: string;
};

export type PutQuestionBankParams = {
  id: number;
  body: string;
  choices: string;
  instruction: string;
  response: string;
};

export type PostQuestionBankResponse = CreateUpdateDeleteResponse;

export type FormListType = {
  key: number;
};

export type QuestionBankType = {
  id?: number;
  questionBankId?: number;
  parentId?: number;
  isParent?: boolean;
  body?: string;
  choices?: string;
  instruction?: string;
  response?: string;
  type: number;
  answer: string | null;
  isCorrect?: boolean;
};

export type PostQuestionBankParams = {
  questions: QuestionBankType[];
};

export type GetDetailQuestionBankResponse = any;

export type GetDetailQuestionBankParams = {
  id: number;
};

export type GetListQuestionBankResponse = {
  result: QuestionBankType[];
  metadata: MetaDataType;
  message: string;
  status: boolean;
};

export type GetListQuestionBankParams = {
  page: number;
  limit: number;
  search?: string;
  createdAt?: string;
};

export type QuestionBankSearchObj = {
  search?: string;
  createdAt?: string;
};

export { injectedRtkApi as QuestionBankApi };

export const {
  useGetListQuestionBankQuery,
  useLazyGetListQuestionBankQuery,
  useGetDetailQuestionBankQuery,
  useLazyGetDetailQuestionBankQuery,
  usePostQuestionBankMutation,
  usePutQuestionBankMutation,
  useDeleteQuestionBankMutation,
} = injectedRtkApi;
