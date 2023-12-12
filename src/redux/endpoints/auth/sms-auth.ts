import { SMSLoginAuthRequest, SMSLoginAuthResponse } from '@/types/auth.type';
import { BaseQueryFn, EndpointBuilder } from '@reduxjs/toolkit/query';

export default function smsAuth(build: EndpointBuilder<BaseQueryFn, string, string>) {
  return build.mutation<SMSLoginAuthResponse, SMSLoginAuthRequest>({
    query(body) {
      return {
        url: 'auth/verify/sms',
        method: 'POST',
        body,
      };
    },
  });
}
