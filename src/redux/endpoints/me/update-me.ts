/* eslint-disable @typescript-eslint/no-explicit-any */

import { BaseQueryFn, EndpointBuilder } from '@reduxjs/toolkit/query';

export default function updateMe(build: EndpointBuilder<BaseQueryFn, string, string>) {
  return build.mutation<
    any,
    {
      password?: string;
      newPassword?: string;
      twoFactorMethod?: 'NONE' | 'TOTP';
      twoFactorPhone?: string;
      email?: string;
    }
  >({
    query(body) {
      return {
        url: '/me',
        method: 'PATCH',
        body,
      };
    },
  });
}
