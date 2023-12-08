import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// eslint-disable-next-line import/no-cycle
// import { RootState } from './store';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.BASE_URL,
  // prepareHeaders: (headers, { getState }) => {
  //   const rootState = getState() as RootState;
  //   const token = rootState.auth.accessToken;
  //   if (token) {
  //     headers.set('Authorization', `Bearer ${token}`);
  //   }
  //   return headers;
  // },
});
export const api = createApi({
  baseQuery,
  endpoints: () => ({}),
});
