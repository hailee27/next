import { api } from '@/redux/api';
import getCoupons from './get-coupons';
import createCoupon from './create-coupon';

export const couponsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCoupons: getCoupons(build),
    createCoupon: createCoupon(build),
  }),
  overrideExisting: false,
});

export type RequestJoinCompaniesResponse = void;
export type RequestJoinCompaniesParam = {
  companyCode: string;
};
export const { useGetCouponsQuery, useLazyGetCouponsQuery, useCreateCouponMutation } = couponsApi;
