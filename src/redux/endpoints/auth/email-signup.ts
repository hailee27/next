import { LoginData } from '@/types/auth.type';
import { BaseQueryFn, EndpointBuilder } from '@reduxjs/toolkit/query';

export default function login(build: EndpointBuilder<BaseQueryFn, string, string>) {
  return build.mutation<
    LoginData,
    {
      email: string;
      password: string;
    }
  >({
    query(body) {
      return {
        url: 'auth/register/email',
        method: 'POST',
        body,
      };
    },
  });
}
