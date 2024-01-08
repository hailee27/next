import { SignupResponse } from '@/types/auth.type';
import { BaseQueryFn, EndpointBuilder } from '@reduxjs/toolkit/query';

export default function signupEmail(build: EndpointBuilder<BaseQueryFn, string, string>) {
  return build.mutation<
    SignupResponse,
    {
      email: string;
      password: string;
    }
  >({
    query(body) {
      return {
        url: 'auth/register',
        method: 'POST',
        body,
      };
    },
  });
}
