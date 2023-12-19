/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { REHYDRATE } from 'redux-persist';
import { HYDRATE } from 'next-redux-wrapper';
import type { RootState } from './store';

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  // credentials: 'include',
  prepareHeaders: (headers, { getState, endpoint }) => {
    const isServer = typeof window === 'undefined';
    headers.set('Access-Control-Allow-Origin', '*');
    if (!isServer) {
      const { auth } = getState() as RootState;
      if (auth && auth?.accessToken && endpoint !== 'refresh') {
        headers.set('Authorization', `Bearer ${auth?.accessToken}`);
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

  if (result.error && result.error.status === 401) {
    if (!isServer) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
        try {
          const auth = (api.getState() as RootState)?.auth;
          if (auth?.accessToken && auth?.refreshToken) {
            const refreshResult: any = await baseQuery(
              {
                url: 'auth/refresh',
                method: 'POST',
                body: { token: auth?.refreshToken },
              },
              api,
              extraOptions
            );
            if (refreshResult?.data?.accessToken && refreshResult?.data?.refreshToken) {
              // handle update new toke
              api.dispatch({
                type: 'auth/tokenReceived',
                payload: {
                  accessToken: refreshResult.data.accessToken,
                  refreshToken: refreshResult.data.refreshToken,
                },
              });
              // retry the initial query
              result = await baseQuery(args, api, extraOptions);
            } else {
              // handle logout
              api.dispatch({ type: 'auth/logout' });
              window.location.pathname = '/login';
            }
          }
        } finally {
          // release must be called once the mutex should be released again.
          release();
        }
      } else {
        // wait until the mutex is available without locking it
        await mutex.waitForUnlock();
        result = await baseQuery(args, api, extraOptions);
      }
    }
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
      return (action?.payload as any)?.[reducerPath];
    }
    return undefined;
  },
  endpoints: () => ({}),
});
