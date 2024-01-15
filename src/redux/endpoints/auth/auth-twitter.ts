/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseQueryFn, EndpointBuilder } from '@reduxjs/toolkit/query';

export function connectTwitter(build: EndpointBuilder<BaseQueryFn, string, string>) {
  return build.mutation<any, any>({
    query({ body, params }) {
      return {
        url: 'accounts',
        method: 'POST',
        body,
        params,
      };
    },
  });
}

export function disconnectTwitter(build: EndpointBuilder<BaseQueryFn, string, string>) {
  return build.mutation<any, any>({
    query({ id }) {
      return {
        url: `accounts/${id}`,
        method: 'DELETE',
      };
    },
  });
}
