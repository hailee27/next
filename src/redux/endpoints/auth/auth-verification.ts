/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseQueryFn, EndpointBuilder } from '@reduxjs/toolkit/query';

export default function authVerification(build: EndpointBuilder<BaseQueryFn, string, string>) {
  return build.mutation<
    any,
    {
      type: 'SMS' | 'RECAPTCHA';
      token?: string;
      sendBy?: 'MESSAGE' | 'CALL';
      userId?: number;
      phoneNumber?: string;
    }
  >({
    query(body) {
      return {
        url: 'auth/verification',
        method: 'POST',
        body,
      };
    },
  });
}
