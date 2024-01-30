import { api } from '@/redux/api';
import getCoupons from './get-coupons';

export const couponsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCoupons: getCoupons(build),
  }),
  overrideExisting: false,
});

export type RequestJoinCompaniesResponse = void;
export type RequestJoinCompaniesParam = {
  companyCode: string;
};
export const { useGetCouponsQuery, useLazyGetCouponsQuery } = couponsApi;
