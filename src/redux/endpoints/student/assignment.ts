/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-cycle */
import { api } from '../../api';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    studentGetListAssignments: build.query<StudentGetListAssignmentsResponse, StudentGetListAssignmentsParams>({
      query: (queryArg) => ({
        url: '/assignments/me',
        method: 'GET',
        params: queryArg,
      }),
    }),
  }),
});

export type StudentGetListAssignmentsResponse = any;

export type StudentGetListAssignmentsParams = {
  limit?: number;
  page?: number;
  search?: string;
  createdAt?: string;
  classId: number;
};

export { injectedRtkApi as StudentAssignmentsApi };

export const { useStudentGetListAssignmentsQuery, useLazyStudentGetListAssignmentsQuery } = injectedRtkApi;
