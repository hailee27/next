/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { REHYDRATE } from 'redux-persist';
import { HYDRATE } from 'next-redux-wrapper';
// eslint-disable-next-line import/no-cycle
import { RootState } from './store';

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState, endpoint }) => {
    const isServer = typeof window === 'undefined';

    if (!isServer) {
      const { user } = getState() as RootState;

      if (user && user?.accessToken && endpoint !== 'refresh') {
        headers.set('Authorization', `Bearer ${user?.accessToken}`);
      }
    }

    return headers;
  },
});

const baseQueryWithInterceptor: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const isServer = typeof window === 'undefined';
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  // if (result.error && result.error.status === 401) {
  //   // checking whether the mutex is locked
  //   if (!mutex.isLocked()) {
  //     const release = await mutex.acquire();
  //     try {
  //       const auth = (api.getState() as RootState)?.auth;
  //       if (auth?.accessToken && auth?.refreshToken) {
  //         const refreshResult  = await baseQuery(
  //           {
  //             url: 'auth/refresh',
  //             method: 'POST',
  //             body: { token: auth?.refreshToken },
  //           },
  //           api,
  //           extraOptions
  //         );
  //         if (refreshResult?.data?.accessToken && refreshResult?.data?.refreshToken) {
  //           // handle update new toke
  //           api.dispatch({
  //             type: 'auth/tokenReceived',
  //             payload: {
  //               accessToken: refreshResult.data.accessToken,
  //               refreshToken: refreshResult.data.refreshToken,
  //             },
  //           });
  //           // retry the initial query
  //           result = await baseQuery(args, api, extraOptions);
  //         } else {
  //           // handle logout
  //           api.dispatch({ type: 'auth/logout' });
  //           window.location.pathname = '/login';
  //         }
  //       }
  //     } finally {
  //       // release must be called once the mutex should be released again.
  //       release();
  //     }
  //   } else {
  //     // wait until the mutex is available without locking it
  //     await mutex.waitForUnlock();
  //     result = await baseQuery(args, api, extraOptions);
  //   }
  // }
  if (result.error && result.error.status === 401) {
    // api.dispatch({ type: 'auth/logout' });
    window.location.pathname = '/login';
  }
  return result;
};
export const api = createApi({
  baseQuery: baseQueryWithInterceptor,

  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE) {
      return (action?.payload as any)?.[reducerPath];
    }
    if (action.type === HYDRATE) {
      return (action?.payload as any)[reducerPath];
    }
    return undefined;
  },
  endpoints: () => ({}),
});
