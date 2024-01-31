/* eslint-disable @typescript-eslint/no-explicit-any */
import SmsVerificationForm from '@/components/auth/sms-verification-form';
import { useAuthVerificationMutation, useSmsVerifyMutation } from '@/redux/endpoints/auth';
import { useUpdateMeMutation } from '@/redux/endpoints/me';
import { RootState } from '@/redux/store';
import { getErrorMessage } from '@/utils/func/getErrorMessage';
import toastMessage from '@/utils/func/toastMessage';
import { Spin } from 'antd';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Verification() {
  const { user, accessToken } = useSelector((store: RootState) => store.auth);

  const [verifiSMS, { isLoading: isVerifiSMS, isError: isVerifySMSError }] = useSmsVerifyMutation();

  const [updateMe, { isLoading: isUpdateUser }] = useUpdateMeMutation();

  const [sendVerificationCode, { isLoading: isSendVerificationCode }] = useAuthVerificationMutation();

  const router = useRouter();

  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window?.location?.search) : null;

  const userAction = searchParams?.get('action');
  const urlPhone = searchParams?.get('phoneNumber');
  const urlToken = searchParams?.get('token');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userPhone, setUserPhone] = useState<any>(urlPhone);
  const [totpToken, setTotpToken] = useState<any>(urlToken);

  const onReSendCode = async (sendBy: 'CALL' | 'MESSAGE') => {
    try {
      if (typeof userPhone === 'string' && userPhone) {
        const data = await sendVerificationCode({
          type: 'SMS',
          userId: user?.id,
          sendBy,
          phoneNumber: userPhone,
          isCheckPhone: true,
        }).unwrap();
        setTotpToken(data?.totpToken ?? '');
      }
    } catch (err) {
      toastMessage(getErrorMessage(err), 'error');
    }
  };

  const onUpdatePhone = async (code: string) => {
    try {
      if (code && typeof totpToken === 'string' && totpToken && typeof userPhone === 'string' && userPhone) {
        await verifiSMS({
          code,
          token: totpToken,
        }).unwrap();

        await updateMe(
          userAction === 'disable'
            ? { twoFactorMethod: 'NONE', twoFactorPhone: '' }
            : {
                twoFactorMethod: 'TOTP',
                twoFactorPhone: userPhone,
              }
        ).unwrap();
        toastMessage('Phone number has been updated successfully. ', 'success');
        router.push('/my-page');
      }
    } catch (err) {
      toastMessage(getErrorMessage(err), 'error');
    }
  };

  useEffect(() => {
    if (userAction === 'disable') {
      onReSendCode('MESSAGE');
    }
  }, []);

  const formInputVerifyCodeRender = (
    <div className="mx-auto max-w-[335px]">
      <div className="bg-white border-[2px] border-[#333] px-[22px] py-[30px] rounded-[16px]">
        <h1 className="text-[20px] font-bold text-[#04AFAF] tracking-[0.6px] text-center ">
          携帯電話に届いた認証コード
          <br />
          を入力してください
        </h1>
        <div className="h-[16px]" />

        <SmsVerificationForm isSubmitError={isVerifySMSError} onSubmitCode={onUpdatePhone} />
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
  );
  if (!accessToken) {
    router.replace('/auth/sign-in/campaign-implementer');
  } else {
    return (
      <Spin spinning={isSendVerificationCode || isVerifiSMS || isUpdateUser}>
        <div className="  w-full container-min-height overflow-x-hidden bg-[#D5FFFF]">
          <div
            className={clsx(
              ' container-min-height h-full w-full bg-[#D5FFFF] py-[40px] px-[20px] transition-all duration-300'
            )}
          >
            {formInputVerifyCodeRender}
          </div>
        </div>
      </Spin>
    );
  }
}
