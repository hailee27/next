import { BaseQueryFn, EndpointBuilder } from '@reduxjs/toolkit/query';

export default function getCoupons(build: EndpointBuilder<BaseQueryFn, string, string>) {
  return build.query<
    {
      coupons: {
        code: string;
        id: number;
        type: 'AMAZON_GIFT' | 'PAYPAY_GIFT';
        userAwardId: number;
        transactionId: number;
        createdAt: string;
      }[];
      total: number;
    },
    {
      skip?: number;
      take?: number;
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
