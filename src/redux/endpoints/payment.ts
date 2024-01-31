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

export type PaymentListResponse = void;
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
  usePoint: boolean;
};

export { injectedRtkApi as PaymentApi };
export const { usePostPaymentMutation } = injectedRtkApi;
