/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-cycle */
import { api } from '../../api';
import { AssignmentType } from '../teacher/assignment';
import { ClassType, MetaDataType } from '../teacher/class';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    studentGetListClass: build.query<StudentGetListClassResponse, StudentGetListClassParams>({
      query: (queryArg) => ({
        url: '/class/me',
        method: 'GET',
        params: queryArg,
      }),
    }),
    studentGetListAssignment: build.query<StudentGetListAssignmentResponse, StudentGetListAssignmentParams>({
      query: (queryArg) => ({
        url: `/class/${queryArg?.classId}`,
        method: 'GET',
        params: queryArg,
      }),
    }),
    studentGetClassAnalysis: build.query<StudentGetClassAnalysisResponse, StudentGetClassAnalysisParams>({
      query: (queryArg) => ({
        url: `/class/analysis/${queryArg?.classId}`,
        method: 'GET',
        params: queryArg,
      }),
    }),
  }),
});

export type ClassAnalysisType = {
  type: number;
  count: number;
  correctCount: number;
};

export type StudentGetClassAnalysisResponse = {
  status: boolean;
  message: string;
  result: ClassAnalysisType[];
};

export type StudentGetClassAnalysisParams = {
  classId?: number;
};

export type StudentGetListAssignmentResponse = {
  message: string;
  status: boolean;
  metadata: MetaDataType;
  result: AssignmentType[];
};

export type SelectType = {
  value: number;
  label: string;
};

export type StudentGetListAssignmentParams = {
  classId?: number;
  status?: number;
  limit?: number;
  page?: number;
  search?: string;
  createdAt?: string;
  class?: SelectType;
};

export type StudentGetListClassResponse = {
  message: string;
  status: boolean;
  metadata: MetaDataType;
  result: ClassType[];
};

export type StudentGetListClassParams = {
  limit?: number;
  page?: number;
  search?: string;
  createdAt?: string;
};

export { injectedRtkApi as StudentClassApi };

export const {
  useStudentGetListClassQuery,
  useLazyStudentGetListClassQuery,
  useStudentGetListAssignmentQuery,
  useLazyStudentGetListAssignmentQuery,
  useStudentGetClassAnalysisQuery,
  useLazyStudentGetClassAnalysisQuery,
} = injectedRtkApi;
