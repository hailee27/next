import { LoginData, LoginRequest } from '@/types/auth.type';
import { BaseQueryFn, EndpointBuilder } from '@reduxjs/toolkit/query';

export default function login(build: EndpointBuilder<BaseQueryFn, string, string>) {
  return build.mutation<LoginData, LoginRequest>({
    query(body) {
      return {
        url: 'auth/login',
        method: 'POST',
        body,
      };
    },
  });
}
