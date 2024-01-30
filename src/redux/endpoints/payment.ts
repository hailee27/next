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
  }),
});
export type PaymentResponse = void;
export type PaymentParams = {
  campaignId: string;
  price: number;
  priceWithTax: number;
  usePoint: boolean;
};

export { injectedRtkApi as PaymentApi };
export const { usePostPaymentMutation } = injectedRtkApi;
