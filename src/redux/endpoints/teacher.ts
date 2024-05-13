import { api } from '../api';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMeTeacher: build.query<InforTeacherResponse, InforTeacherParams>({
      query: () => ({
        url: '/teacher/get-me',
        method: 'GET',
      }),
    }),
    createClass: build.mutation<InforClassResponse, InforClassParams>({
      query: (queryArg) => ({
        url: '/teacher/class',
        method: 'POST',
        body: queryArg,
      }),
    }),
  }),
});
export type InforClassResponse = void;
export type InforClassParams = {
  name: string;
  description: string;
};
export type InforTeacherResponse = void;
export type InforTeacherParams = void;

export { injectedRtkApi as TeacherApi };
export const { useGetMeTeacherQuery, useCreateClassMutation } = injectedRtkApi;
