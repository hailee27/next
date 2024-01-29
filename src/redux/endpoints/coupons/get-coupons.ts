/* eslint-disable @typescript-eslint/no-explicit-any */

import { BaseQueryFn, EndpointBuilder } from '@reduxjs/toolkit/query';

export default function getCoupons(build: EndpointBuilder<BaseQueryFn, string, string>) {
  return build.query<
    any,
    {
      skip: number;
      take: number;
      where?: string;
      orderBy?: string;
      q?: string;
      include?: string;
      token?: string;
    }
  >({
    query(params) {
      return {
        url: '/coupons',
        method: 'GET',
        params,
      };
    },
  });
}
