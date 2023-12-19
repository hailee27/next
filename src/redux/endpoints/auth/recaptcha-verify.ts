import { RecaptchaVerifyRequest, RecaptchaVerifyResponse } from '@/types/auth.type';
import { BaseQueryFn, EndpointBuilder } from '@reduxjs/toolkit/query';

export default function recaptchaVerify(build: EndpointBuilder<BaseQueryFn, string, string>) {
  return build.mutation<RecaptchaVerifyResponse, RecaptchaVerifyRequest>({
    query(body) {
      return {
        url: 'auth/verify/recaptcha',
        method: 'POST',
        body,
      };
    },
  });
}
