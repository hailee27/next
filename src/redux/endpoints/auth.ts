import { api } from '../api';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    loginTeacher: build.mutation<LoginResponse, LoginParams>({
      query: (queryArg) => {
        const { role, ...other } = queryArg;
        return {
          url: role === 'teacher' ? '/teacher/auth/login' : '/auth/login',
          method: 'POST',
          body: other,
        };
      },
    }),
    signUpStudent: build.mutation<SignUpResponse, SignUpParams>({
      query: (queryArg) => ({
        url: '/auth/register',
        method: 'POST',
        body: queryArg,
      }),
    }),
  }),
});

export type SignUpParams = {
  email: string;
  password: string;
  name: string;
  gender: string;
  address: string;
};

export type SignUpResponse = {
  status: boolean;
  message: string;
  result: {
    id: number;
    email: string;
  };
};

export type LoginResponse = {
  status: boolean;
  message: string;
  result: {
    teacher?: Person;
    student?: Person;
    token: {
      accessToken: string;
      refreshToken: string;
    };
  };
};
export type LoginParams = {
  email: string;
  password: string;
  role: 'student' | 'teacher';
};

export type Person = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  email: string;
  password: string;
  name: string;
  avatar: string | null;
  role: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    name: string;
  };
};
export { injectedRtkApi as AuthApi };
export const { useLoginTeacherMutation, useSignUpStudentMutation } = injectedRtkApi;
