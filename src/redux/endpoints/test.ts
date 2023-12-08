import { api } from '../api';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTest: build.query<TestResponse, TestParams>({
      query: (queryArg) => ({
        url: '/test',
        method: 'GET',
        body: queryArg,
      }),
    }),
  }),
});

export type TestResponse = void;
export type TestParams = void;

export { injectedRtkApi as TestApi };
export const { useGetTestQuery, useLazyGetTestQuery } = injectedRtkApi;
