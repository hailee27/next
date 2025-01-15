/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-cycle */
import { api } from '../../api';

import { CreateUpdateDeleteResponse, StudentType } from './student';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getListClass: build.query<GetListClassResponse, GetListClassParams>({
      query: (queryArg) => ({
        url: '/teacher/class/list',
        method: 'GET',
        params: queryArg,
      }),
    }),
    getDetailClass: build.query<GetDetailClassResponse, GetDetailClassParams>({
      query: (queryArg) => ({
        url: `/teacher/class/detail/${queryArg?.id}`,
        method: 'GET',
      }),
    }),
    postClass: build.mutation<PostClassResponse, PostClassParams>({
      query: (queryArg) => ({
        url: '/teacher/class',
        method: 'POST',
        body: queryArg,
      }),
    }),
    putClass: build.mutation<PostClassResponse, PutClassParams>({
      query: (queryArg) => ({
        url: `/teacher/class/${queryArg?.id}`,
        method: 'PATCH',
        body: queryArg,
      }),
    }),
    deleteClass: build.mutation<DeleteClassResponse, DeleteClassParams>({
      query: (queryArg) => ({
        url: `/teacher/class/${queryArg?.id}`,
        method: 'DELETE',
      }),
    }),
    getListStudentClass: build.query<GetListStudentClassResponse, GetListStudentClassParams>({
      query: (queryArg) => ({
        url: '/teacher/class/list-student',
        method: 'GET',
        params: queryArg,
      }),
    }),
    postAddStudent: build.mutation<PostAddStudentResponse, PostAddStudentParams>({
      query: (queryArg) => ({
        url: '/teacher/class/add-student',
        method: 'POST',
        body: queryArg,
      }),
    }),
    postDeleteStudent: build.mutation<PostDeleteStudentResponse, PostDeleteStudentParams>({
      query: (queryArg) => ({
        url: '/teacher/class/remove-student',
        method: 'POST',
        body: queryArg,
      }),
    }),
    postImportStudents: build.mutation({
      query: (queryArg) => ({
        url: '/teacher/class/import-students',
        method: 'POST',
        body: queryArg,
      }),
    }),
  }),
});

export type GetListStudentClassResponse = {
  message: string;
  status: boolean;
  metadata: MetaDataType;
  result: StudentType[];
};

export type GetListStudentClassParams = {
  classId: number;
  page?: number;
  limit?: number;
};

export type PostDeleteStudentResponse = CreateUpdateDeleteResponse;

export type PostDeleteStudentParams = {
  classId: number;
  studentId: number;
};

export type PostAddStudentResponse = CreateUpdateDeleteResponse;

export type PostAddStudentParams = {
  classId: number;
  studentIds: number[];
};

export type ClassSearchObj = {
  search?: string | null;
  createdAt?: string | null;
};

export type DeleteClassResponse = CreateUpdateDeleteResponse;

export type DeleteClassParams = {
  id: number;
};

export type PutClassParams = {
  id: number;
  name: string;
  description: string;
};

export type GetDetailClassResponse = {
  message: string;
  status: boolean;
  result: {
    id: number;
    name: string;
    description: string;
  };
};

export type GetDetailClassParams = {
  id: number;
};

export type PostClassResponse = {
  data: {
    message: string;
    status: boolean;
    result: {
      id: number;
      name: string;
      description: string;
    };
  };
};

export type PostClassParams = {
  name: string;
  description: string;
};

export type GetListClassParams = {
  search?: string | null;
  limit?: number;
  page?: number;
  createdAt?: string | null;
  startDate?: string;
  endDate?: string;
};

export type MetaDataType = {
  total?: number;
  totalPage?: number;
  page?: number;
};

export type ClassType = {
  id?: number;
  name?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type GetListClassResponse = {
  message?: string;
  status?: boolean;
  metadata?: MetaDataType;
  result?: ClassType[];
};

export { injectedRtkApi as ClassApi };

export const {
  useGetListClassQuery,
  useLazyGetListClassQuery,
  useGetDetailClassQuery,
  useLazyGetDetailClassQuery,
  usePostClassMutation,
  usePutClassMutation,
  useDeleteClassMutation,
  useGetListStudentClassQuery,
  useLazyGetListStudentClassQuery,
  usePostAddStudentMutation,
  usePostDeleteStudentMutation,
  usePostImportStudentsMutation,
} = injectedRtkApi;
