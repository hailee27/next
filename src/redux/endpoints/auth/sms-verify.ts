import { SMSVerifyRequest, SMSVerifyResponse } from '@/types/auth.type';
import { BaseQueryFn, EndpointBuilder } from '@reduxjs/toolkit/query';

export default function smsVerify(build: EndpointBuilder<BaseQueryFn, string, string>) {
  return build.mutation<SMSVerifyResponse, SMSVerifyRequest>({
    query(body) {
      return {
        url: 'auth/verify/sms',
        method: 'POST',
        body,
      };
    },
  });
}
