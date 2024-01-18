/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseQueryFn, EndpointBuilder } from '@reduxjs/toolkit/query';

export function forgotPassword(build: EndpointBuilder<BaseQueryFn, string, string>) {
  return build.mutation<
    any,
    {
      email: string;
    }
  >({
    query(body) {
      return {
        url: 'auth/forgot/password',
        method: 'POST',
        body,
      };
    },
  });
}

export function resetPassword(build: EndpointBuilder<BaseQueryFn, string, string>) {
  return build.mutation<
    any,
    {
      token: string;
      password: string;
    }
  >({
    query(body) {
      return {
        url: 'auth/reset/password',
        method: 'POST',
        body,
      };
    },
  });
}
