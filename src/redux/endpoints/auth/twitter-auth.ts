import { TwitterAuthRequest, TwitterAuthResponse } from '@/types/auth.type';
import { BaseQueryFn, EndpointBuilder } from '@reduxjs/toolkit/query';

export default function twitterAuth(build: EndpointBuilder<BaseQueryFn, string, string>) {
  return build.mutation<TwitterAuthResponse, TwitterAuthRequest>({
    query(body) {
      return {
        url: 'auth/login/email',
        method: 'POST',
        body,
      };
    },
  });
}
