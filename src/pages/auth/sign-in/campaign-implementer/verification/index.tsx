/* eslint-disable no-restricted-globals */
/* eslint-disable no-console */

import SmsVerificationForm from '@/components/auth/sms-verification-form';
import { useAuthVerificationMutation, useSmsVerifyMutation } from '@/redux/endpoints/auth';
import { setSession } from '@/redux/slices/auth.slice';
import { getErrorMessage } from '@/utils/func/getErrorMessage';
import toastMessage from '@/utils/func/toastMessage';
import { Spin } from 'antd';
import clsx from 'clsx';
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
          dispatch(setSession({ ...data }));
          localStorage.setItem('USER_LOGIN_FROM', 'IMPLEMENTER');
          push('/campaign');
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
      <div
        className={clsx(' min-h-[100vh] h-full w-full bg-[#D5FFFF] py-[40px] px-[20px] transition-all duration-300')}
      >
        <div className="bg-white border-[2px] border-[#333] px-[22px] py-[30px] rounded-[16px]">
          <h1 className="text-[20px] font-bold text-[#04AFAF] tracking-[0.6px] text-center ">
            携帯電話に届いた認証コード
            <br />
            を入力してください
          </h1>
          <div className="h-[16px]" />

          <SmsVerificationForm onSubmitCode={handleSubmitSMS} />
        </div>
        <div className="h-[24px]" />
        <p className="text-[12px] font-bold">
          SMSが届いていませんか？ <br />
          下記のいずれかをお試しください
        </p>
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
