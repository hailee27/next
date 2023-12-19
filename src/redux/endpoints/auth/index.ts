import { api } from '@/redux/api';
import login from './login';
import smsVerify from './sms-verify';
import recaptchaVerify from './recaptcha-verify';

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: login(build),
    smsVerify: smsVerify(build),
    recaptchaVerify: recaptchaVerify(build),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useSmsVerifyMutation, useRecaptchaVerifyMutation } = authApi;
