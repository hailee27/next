/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-cycle */
import { api } from '../../api';
import { AssignmentType } from '../teacher/assignment';
import { QuestionBankType } from '../teacher/questionBank';

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
  }),
});

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

export type StudentGetListAssignmentsResponse = any;

export type StudentGetListAssignmentsParams = {
  limit?: number;
  page?: number;
  search?: string;
  createdAt?: string;
  classId: number;
};

export { injectedRtkApi as StudentAssignmentsApi };

export const {
  useStudentGetListAssignmentsQuery,
  useLazyStudentGetListAssignmentsQuery,
  usePostAssignmentStartMutation,
} = injectedRtkApi;
