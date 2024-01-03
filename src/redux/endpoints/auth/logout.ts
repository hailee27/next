import { BaseQueryFn, EndpointBuilder } from '@reduxjs/toolkit/query';

export default function logout(build: EndpointBuilder<BaseQueryFn, string, string>) {
  return build.mutation<LogoutData, LogoutRequest>({
    query() {
      return {
        url: 'auth/logout',
        method: 'POST',
      };
    },
  });
}
export type LogoutData = void;
export type LogoutRequest = void;
