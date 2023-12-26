import { api } from '@/redux/api';
import login from './login';
import smsVerify from './sms-verify';
import recaptchaVerify from './recaptcha-verify';
import twitterAuth from './twitter-auth';
import twitterSignup from './twitter-signup';

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: login(build),
    smsVerify: smsVerify(build),
    recaptchaVerify: recaptchaVerify(build),
    twitterAuth: twitterAuth(build),
    twitterSignup: twitterSignup(build),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useSmsVerifyMutation,
  useRecaptchaVerifyMutation,
  useTwitterAuthMutation,
  useTwitterSignupMutation,
} = authApi;
