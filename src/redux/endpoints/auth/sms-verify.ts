/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseQueryFn, EndpointBuilder } from '@reduxjs/toolkit/query';

export default function smsVerify(build: EndpointBuilder<BaseQueryFn, string, string>) {
  return build.mutation<any, any>({
    query(body) {
      return {
        url: 'auth/sms',
        method: 'POST',
        body,
      };
    },
  });
}
