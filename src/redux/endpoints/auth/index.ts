import { api } from '@/redux/api';
import smsVerify from './sms-verify';
import me from './me';
import logout from './logout';
import signupEmail from './email-signup';
import authTwitter from './auth-twitter';
import signinEmail from './email-signin';
import authVerification from './auth-verification';

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    logout: logout(build),
    smsVerify: smsVerify(build),

    me: me(build),

    signupEmail: signupEmail(build),
    signinEmail: signinEmail(build),
    authTwitter: authTwitter(build),
    authVerification: authVerification(build),
  }),
  overrideExisting: false,
});

export const {
  useSmsVerifyMutation,
  useLogoutMutation,
  useLazyMeQuery,
  useMeQuery,
  useSignupEmailMutation,
  useLazyAuthTwitterQuery,
  useSigninEmailMutation,
  useAuthVerificationMutation,
} = authApi;
