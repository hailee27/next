import { api } from '../api';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    postPayment: build.mutation<PaymentResponse, PaymentParams>({
      query: (queryArg) => ({
        url: '/payments',
        method: 'POST',
        body: queryArg,
      }),
    }),
    getPayment: build.query<PaymentListResponse, PaymentListParams>({
      query: (queryArg) => ({
        url: '/payments',
        method: 'GET',
        params: queryArg,
      }),
    }),
  }),
});

export type PaymentListResponse = {
  payments: {
    id: string;
    amount: number;
    trace_id: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    extra: any;
    userId: number;
    companyId: number;
    campaignId: string;
    campaignName: string;
    updatedAt: string;
    createdAt: string;
    type: string;
    amountAfterTransaction: number;
  }[];
  total: number;
};
export type PaymentListParams = {
  skip: number;
  take: number;
  where?: string;
  orderBy?: string;
  q?: string;
  include?: string;
  token?: 'user';
  actionFrom?: string;
};

export type PaymentResponse = void;
export type PaymentParams = {
  campaignId: string;
  price: number;
  priceWithTax: number;
  usePoint?: boolean;
  pointUse?: number;
};

export { injectedRtkApi as PaymentApi };
export const { usePostPaymentMutation, useGetPaymentQuery, useLazyGetPaymentQuery } = injectedRtkApi;
