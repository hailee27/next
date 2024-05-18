/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '../api';

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
    postAddStudent: build.mutation<PostAddStudentResponse, PostAddStudentParams>({
      query: (queryArg) => ({
        url: '/teacher/class/add-student',
        method: 'POST',
        body: queryArg,
      }),
    }),
  }),
});

export type PostAddStudentResponse = {
  data: {
    message: string;
    status: boolean;
    result: true;
  };
};
export type PostAddStudentParams = {
  classId: number;
  studentIds: number[];
};

export type ClassSearchObj = {
  search?: string | null;
  createdAt?: string | null;
};

export type DeleteClassResponse = {
  data: {
    message: string;
    status: boolean;
    result: true;
  };
};

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
  usePostAddStudentMutation,
} = injectedRtkApi;
