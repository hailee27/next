import { BaseQueryFn, EndpointBuilder } from '@reduxjs/toolkit/query';

export default function me(build: EndpointBuilder<BaseQueryFn, string, string>) {
  return build.query<TypeMeResponse, TypeMeParameters>({
    query() {
      return {
        url: 'me',
        method: 'GET',
      };
    },
  });
}
export type TypeMeResponse = void;
export type TypeMeParameters = void;
