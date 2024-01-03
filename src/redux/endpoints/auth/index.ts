import { api } from '@/redux/api';
import login from './login';
import smsVerify from './sms-verify';
import recaptchaVerify from './recaptcha-verify';
import twitterAuth from './twitter-auth';
import twitterSignup from './twitter-signup';
import me from './me';
import logout from './logout';

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: login(build),
    logout: logout(build),
    smsVerify: smsVerify(build),
    recaptchaVerify: recaptchaVerify(build),
    twitterAuth: twitterAuth(build),
    twitterSignup: twitterSignup(build),
    me: me(build),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useSmsVerifyMutation,
  useRecaptchaVerifyMutation,
  useTwitterAuthMutation,
  useTwitterSignupMutation,
  useLogoutMutation,
  useLazyMeQuery,
  useMeQuery,
} = authApi;
