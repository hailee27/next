/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-cycle */
import { api } from '../../api';
import { AssignmentType } from '../teacher/assignment';
import { QuestionBankType } from '../teacher/questionBank';
import { CreateUpdateDeleteResponse } from '../teacher/student';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    studentGetListAssignments: build.query<StudentGetListAssignmentsResponse, StudentGetListAssignmentsParams>({
      query: (queryArg) => ({
        url: '/assignments/me',
        method: 'GET',
        params: queryArg,
      }),
    }),
    postAssignmentStart: build.mutation<PostAssignmentStartResponse, PostAssignmentStartParams>({
      query: (queryArg) => ({
        url: '/assignment/start',
        method: 'POST',
        body: queryArg,
      }),
    }),
    getAssignmentQuestion: build.query<GetAssignmentQuestionResponse, GetAssignmentQuestionParams>({
      query: (queryArg) => ({
        url: '/assignment/question',
        method: 'GET',
        params: queryArg,
      }),
    }),
    saveAssignmentQuestion: build.mutation<SaveAssignmentQuestionResponse, SaveAssignmentQuestionParams>({
      query: (queryArg) => ({
        url: '/assignment/save',
        method: 'POST',
        body: queryArg,
      }),
    }),
    submitAssignmentQuestion: build.mutation<SubmitAssignmentQuestionResponse, SubmitAssignmentQuestionParams>({
      query: (queryArg) => ({
        url: '/assignment/submit',
        method: 'POST',
        body: queryArg,
      }),
    }),
    putAssignmentQuestion: build.mutation<PutAssignmentQuestionResponse, PutAssignmentQuestionParams>({
      query: (queryArg) => ({
        url: '/assignment/question',
        method: 'PATCH',
        body: queryArg,
      }),
    }),
  }),
});

export type SubmitAssignmentQuestionResponse = CreateUpdateDeleteResponse;

export type SubmitAssignmentQuestionParams = {
  assignmentSessionId: number;
  answers: any;
};

export type SaveAssignmentQuestionResponse = CreateUpdateDeleteResponse;

export type SaveAssignmentQuestionParams = {
  assignmentSessionId: number;
  answers: any;
};

export type GetAssignmentQuestionResponse = CreateUpdateDeleteResponse;

export type GetAssignmentQuestionParams = {
  assignmentId: number;
  questionId: number;
};

export type PutAssignmentQuestionResponse = CreateUpdateDeleteResponse;

export type PutAssignmentQuestionParams = {
  assignmentId: number;
  questionId: number;
  answers: any;
};

export type SessionType = {
  id: number;
  invalidAt: string;
  timeStart: string;
  assignment: AssignmentType;
};

export type PostAssignmentStartResponse = {
  message: string;
  status: boolean;
  result: {
    session: SessionType;
    questions: QuestionBankType[];
  };
};

export type PostAssignmentStartParams = {
  assignmentId: number;
};

export type StudentGetListAssignmentsResponse = CreateUpdateDeleteResponse;

export type StudentGetListAssignmentsParams = {
  limit?: number;
  page?: number;
  search?: string;
  createdAt?: string;
  classId: number;
};

export type AnswerSubmitType = {
  id: number;
  answer: any;
};

export { injectedRtkApi as StudentAssignmentsApi };

export const {
  useStudentGetListAssignmentsQuery,
  useLazyStudentGetListAssignmentsQuery,
  useGetAssignmentQuestionQuery,
  useLazyGetAssignmentQuestionQuery,
  usePostAssignmentStartMutation,
  usePutAssignmentQuestionMutation,
  useSaveAssignmentQuestionMutation,
  useSubmitAssignmentQuestionMutation,
} = injectedRtkApi;
