/* eslint-disable no-console */
import SmsAuthForm from '@/components/SmsAuthForm';
import React from 'react';
import { useRouter } from 'next/router';
import { useSmsAuthMutation } from '@/redux/endpoints/auth';
import { SMS_CASE } from '@/utils/constant/enums';
import { getErrorMessage } from '@/utils/func/getErrorMessage';
import toastMessage from '@/utils/func/toastMessage';

export default function SMSVerification() {
  const { query } = useRouter();
  const [smsAuth] = useSmsAuthMutation();
  const handleSubmitSMS = async (code: string) => {
    try {
      if (query?.code && query?.totpToken) {
        if (query?.case === SMS_CASE.LOGIN_VERIFICATION) {
          const data = await smsAuth({
            code,
            token: typeof query?.totpToken === 'string' ? query?.totpToken : '',
          }).unwrap();
          console.log(data);
        }
      }
    } catch (err) {
      toastMessage(getErrorMessage(err), 'error');
    }
  };
  return (
    <div className="w-[400px] bg-white border-[1px] border-solid border-border-base p-[24px_12px] flex item-center justify-center flex-col gap-[26px]">
      <p className="text-center py-[15px] text-[18px] leading-[18px]">Log in</p>
      <div className="h-[1px] w-full bg-border-base" />
      <SmsAuthForm onSubmitCode={handleSubmitSMS} />
    </div>
  );
}
