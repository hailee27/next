/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '../api';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getListStudent: build.query<GetListStudentResponse, GetListStudentParams>({
      query: (queryArg) => ({
        url: '/teacher/student/list',
        method: 'GET',
        params: queryArg,
      }),
    }),
  }),
});

export type GetListStudentResponse = any;

export type GetListStudentParams = {
  limit: number;
  page: number;
  search?: string;
};

export { injectedRtkApi as StudentApi };

export const { useGetListStudentQuery, useLazyGetListStudentQuery } = injectedRtkApi;
