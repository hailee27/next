import { api } from '@/redux/api';
import login from './login';
import smsAuth from './sms-auth';

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: login(build),
    smsAuth: smsAuth(build),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useSmsAuthMutation } = authApi;
