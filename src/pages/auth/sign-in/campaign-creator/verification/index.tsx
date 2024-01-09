/* eslint-disable no-console */
import SmsAuthForm from '@/components/SmsAuthForm';
import { useSmsVerifyMutation } from '@/redux/endpoints/auth';
import { setSession } from '@/redux/slices/auth.slice';
import { SMS_CASE } from '@/utils/constant/enums';
import { getErrorMessage } from '@/utils/func/getErrorMessage';
import toastMessage from '@/utils/func/toastMessage';
import { Spin } from 'antd';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

export default function VerificationPage() {
  const { query, push } = useRouter();
  const [smsAuth, { isLoading }] = useSmsVerifyMutation();
  const dispatch = useDispatch();
  const handleSubmitSMS = async (code: string) => {
    try {
      console.log(code, query?.code && query?.totpToken, query?.case === SMS_CASE.LOGIN_VERIFICATION);
      if (query?.code && query?.totpToken) {
        if (query?.case === SMS_CASE.LOGIN_VERIFICATION) {
          const data = await smsAuth({
            code,
            token: typeof query?.totpToken === 'string' ? query?.totpToken : '',
          }).unwrap();
          console.log(data?.accessToken, data?.refreshToken, data?.user);
          if (data?.accessToken && data?.refreshToken && data?.user) {
            dispatch(setSession({ ...data }));
            push('/');
          }
        }
      }
    } catch (err) {
      toastMessage(getErrorMessage(err), 'error');
    }
  };
  return (
    <Spin spinning={isLoading}>
      <div className="w-[400px] bg-white border-[1px] border-solid border-border-base p-[24px_12px] flex item-center justify-center flex-col gap-[26px]">
        <p className="text-center py-[15px] text-[18px] leading-[18px]">Log in</p>
        <div className="h-[1px] w-full bg-border-base" />
        <SmsAuthForm onSubmitCode={handleSubmitSMS} />
      </div>
    </Spin>
  );
}
