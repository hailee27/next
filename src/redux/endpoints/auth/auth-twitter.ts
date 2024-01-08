/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseQueryFn, EndpointBuilder } from '@reduxjs/toolkit/query';

export default function authTwitter(build: EndpointBuilder<BaseQueryFn, string, string>) {
  return build.query<any, any>({
    query(params) {
      return {
        url: 'auth/twitter',
        method: 'get',
        params,
      };
    },
  });
}
