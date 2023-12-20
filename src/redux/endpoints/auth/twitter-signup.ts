import { TwitterAuthResponse, TwitterSignupRequest } from '@/types/auth.type';
import { BaseQueryFn, EndpointBuilder } from '@reduxjs/toolkit/query';

export default function twitterSignup(build: EndpointBuilder<BaseQueryFn, string, string>) {
  return build.mutation<TwitterAuthResponse, TwitterSignupRequest>({
    query(body) {
      return {
        url: 'auth/register/twitter',
        method: 'POST',
        body,
      };
    },
  });
}
