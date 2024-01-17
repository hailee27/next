/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */

import SmsVerificationForm from '@/components/auth/sms-verification-form';
import { useAuthVerificationMutation, useSmsVerifyMutation } from '@/redux/endpoints/auth';
import { setSession } from '@/redux/slices/auth.slice';
import { getErrorMessage } from '@/utils/func/getErrorMessage';
import toastMessage from '@/utils/func/toastMessage';
import { Spin } from 'antd';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

export default function VerificationPage() {
  const { query, push } = useRouter();
  const [sendVerificationCode, { isLoading: isSendVerificationCode }] = useAuthVerificationMutation();

  const [smsAuth, { isLoading }] = useSmsVerifyMutation();
  const dispatch = useDispatch();
  const handleSubmitSMS = async (code: string) => {
    try {
      if (query?.code && query?.totpToken) {
        const data = await smsAuth({
          code,
          token: typeof query?.totpToken === 'string' ? query?.totpToken : '',
        }).unwrap();

        if (data?.accessToken && data?.refreshToken && data?.user) {
          localStorage.setItem('USER_LOGIN_FROM', 'CREATOR');
          dispatch(setSession({ ...data }));
          push('/');
        }
      }
    } catch (err) {
      toastMessage(getErrorMessage(err), 'error');
    }
  };

  const onReSendCode = async (sendBy: 'CALL' | 'MESSAGE') => {
    try {
      if (query?.userId && !isNaN(Number(query?.userId))) {
        await sendVerificationCode({ type: 'SMS', userId: Number(query?.userId), sendBy }).unwrap();
      }
    } catch (err) {
      toastMessage(getErrorMessage(err), 'error');
    }
  };

  return (
    <Spin spinning={isLoading || isSendVerificationCode}>
      <div className="bg-[#D5FFFF] border-[2px] border-[#333] rounded-[16px] px-[16px] xxl:px-[56px] py-[48px] text-[#333] ">
        <h3 className="text-center text-[#04AFAF]  text-[30px] font-bold tracking-[0.9px]">ログイン</h3>
        <div className="h-[8px]" />
        <p className="text-[13px] text-center">携帯電話に届いた認証コードを入力してください</p>
        <div className="h-[32px]" />
        <div className="bg-[#fff] border-[2px] border-[#333] rounded-[16px] p-[16px] xxl:px-[24px] xxl:py-[32px] text-[#333] xxl:min-w-[625px] ">
          <p className="text-center font-bold text-[16px]">携帯電話に届いた認証コードを入力してください</p>
          <div className="h-[16px]" />
          <SmsVerificationForm onSubmitCode={handleSubmitSMS} />
        </div>
        <div className="h-[24px]" />
        <p className="font-bold text-[12px]">SMSが届いていませんか？下記のいずれかをお試しください</p>
        <div className="h-[16px]" />
        <div>
          <p
            aria-hidden
            className="w-fit pb-[4px] border-b-[#333] border-b-[1px] text-[12px] font-medium cursor-pointer"
            onClick={onReSendCode.bind(null, 'CALL')}
          >
            自動音声案内で認証コードを受け取る
          </p>
          <div className="h-[8px]" />

          <p
            aria-hidden
            className="w-fit pb-[4px] border-b-[#333] border-b-[1px] text-[12px] font-medium cursor-pointer "
            onClick={onReSendCode.bind(null, 'MESSAGE')}
          >
            認証コードを再送する
          </p>
        </div>
      </div>
    </Spin>
  );
}
