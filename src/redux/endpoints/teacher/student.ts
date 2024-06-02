/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-cycle */
import { api } from '../../api';

import { MetaDataType } from './class';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getListStudent: build.query<GetListStudentResponse, GetListStudentParams>({
      query: (queryArg) => ({
        url: '/teacher/student/list',
        method: 'GET',
        params: queryArg,
      }),
    }),
    getDetailStudent: build.query<GetDetailStudentResponse, GetDetailStudentParams>({
      query: (queryArg) => ({
        url: `/teacher/student/detail/${queryArg?.id}`,
        method: 'GET',
      }),
    }),
    getListAssignmentStudent: build.query<GetListAssignmentStudentResponse, GetListAssignmentStudentParams>({
      query: (queryArg) => ({
        url: '/teacher/student/list-assignment',
        method: 'GET',
        params: queryArg,
      }),
    }),
    getDetailAssignmentStudent: build.query<GetDetailAssignmentStudentResponse, GetDetailAssignmentStudentParams>({
      query: (queryArg) => ({
        url: '/teacher/student/assignment',
        method: 'GET',
        params: queryArg,
      }),
    }),
    deleteStudent: build.mutation<DeleteStudentResponse, DeleteStudentParams>({
      query: (queryArg) => ({
        url: `/teacher/student/${queryArg?.id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export type GetDetailAssignmentStudentResponse = any;

export type GetDetailAssignmentStudentParams = {
  studentId: number;
  assignmentId: number;
};

export type ListAssignmentStudentType = {
  id: number;
  mark: string;
  answerCount: number;
  assignment: {
    id: number;
    name: string;
    totalMark: string;
    timeAllow: number;
    questionCount: number;
    timeStart: string;
    timeEnd: string;
    class: {
      id: number;
      name: string;
    };
  };
};

export type GetListAssignmentStudentResponse = {
  status: boolean;
  message: string;
  result: ListAssignmentStudentType[];
};

export type GetListAssignmentStudentParams = {
  studentId: number;
};

export type GetDetailStudentResponse = {
  message: string;
  success: boolean;
  metadata: MetaDataType;
  result: StudentType;
};

export type GetDetailStudentParams = { id: number };

export type CreateUpdateDeleteResponse = {
  data: {
    message: string;
    status: boolean;
    result: true;
  };
};

export type DeleteStudentResponse = CreateUpdateDeleteResponse;

export type DeleteStudentParams = { id: number };

export type StudentSearchObj = {
  limit?: number;
  page?: number;
  search?: string;
  createdAt?: string;
};

export type StudentType = {
  id?: number;
  name?: string;
  email?: string;
  gender?: string;
  address?: string;
  updatedAt?: string;
  createdAt?: string;
};

export type GetListStudentResponse = {
  message: string;
  success: boolean;
  metadata: MetaDataType;
  result: StudentType[];
};

export type GetListStudentParams = {
  limit: number;
  page: number;
  search?: string;
};

export { injectedRtkApi as StudentApi };

export const {
  useGetListStudentQuery,
  useLazyGetListStudentQuery,
  useGetListAssignmentStudentQuery,
  useLazyGetListAssignmentStudentQuery,
  useGetDetailAssignmentStudentQuery,
  useLazyGetDetailAssignmentStudentQuery,
  useGetDetailStudentQuery,
  useLazyGetDetailStudentQuery,
  useDeleteStudentMutation,
} = injectedRtkApi;
