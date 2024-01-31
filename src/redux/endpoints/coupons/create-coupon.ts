/* eslint-disable @typescript-eslint/no-explicit-any */

import { BaseQueryFn, EndpointBuilder } from '@reduxjs/toolkit/query';

export default function createCoupon(build: EndpointBuilder<BaseQueryFn, string, string>) {
  return build.mutation<
    {
      code: string;
      type: 'AMAZON_GIFT' | 'PAYPAY_GIFT';
      userAwardId: number;
      transactionId: number;
      updatedAt: Date;
      createdAt: Date;
    },
    {
      couponType: 'AMAZON_GIFT' | 'PAYPAY_GIFT';
      campaignId: string;
    }
  >({
    query(body) {
      return {
        url: '/coupons',
        method: 'POST',
        body,
      };
    },
  });
}
