import { api } from '@/redux/api';
import smsVerify from './sms-verify';
import me from './me';
import logout from './logout';
import signupEmail from './email-signup';
import { connectTwitter, disconnectTwitter } from './auth-twitter';
import signinEmail from './email-signin';
import authVerification from './auth-verification';
import { forgotPassword, resetPassword } from './forgot-password';

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    logout: logout(build),
    smsVerify: smsVerify(build),

    me: me(build),

    signupEmail: signupEmail(build),
    signinEmail: signinEmail(build),
    authVerification: authVerification(build),
    connectTwitter: connectTwitter(build),
    disconnectTwitter: disconnectTwitter(build),
    forgotPassword: forgotPassword(build),
    resetPassword: resetPassword(build),
  }),
  overrideExisting: false,
});

export const {
  useSmsVerifyMutation,
  useLogoutMutation,
  useLazyMeQuery,
  useMeQuery,
  useSignupEmailMutation,
  useSigninEmailMutation,
  useAuthVerificationMutation,
  useConnectTwitterMutation,
  useDisconnectTwitterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
