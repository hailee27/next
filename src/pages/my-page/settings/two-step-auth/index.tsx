/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty */
import SmsVerificationForm from '@/components/auth/sms-verification-form';
import CButtonShadow from '@/components/common/CButtonShadow';
import CFormInputShadow from '@/components/common/CFormInputShadow';
import { useAuthVerificationMutation, useSmsVerifyMutation } from '@/redux/endpoints/auth';

import { useUpdateMeMutation } from '@/redux/endpoints/me';
import { RootState } from '@/redux/store';
import { getErrorMessage } from '@/utils/func/getErrorMessage';
import toastMessage from '@/utils/func/toastMessage';
import { phoneSchema, UpdatePhoneData } from '@/utils/schema/auth.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Spin } from 'antd';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

export default function SettingTwoStepAuthPage() {
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window?.location?.search) : null;

  const userAction = searchParams?.get('action');

  const [userPhone, setUserPhone] = useState<undefined | string>(undefined);
  const [totpToken, setTotpToken] = useState<undefined | string>(undefined);

  const [isPhoneNotMatched, setIsPhoneNotMatched] = useState(false);

  const router = useRouter();

  const { user, accessToken } = useSelector((store: RootState) => store.auth);

  const [sendVerificationCode, { isLoading: isSendVerificationCode }] = useAuthVerificationMutation();
  const [verifiSMS, { isLoading: isVerifiSMS, isError: isVerifySMSError }] = useSmsVerifyMutation();
  const [updateMe, { isLoading: isUpdateUser }] = useUpdateMeMutation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UpdatePhoneData>({
    resolver: yupResolver(phoneSchema),
    mode: 'onChange',
  });
  const phoneInput = watch('phone');

  const onSubmitPhone = async (values: UpdatePhoneData) => {
    try {
      if (values?.phone && user?.id) {
        if (userAction === 'disable' && user?.twoFactorPhone !== values?.phone) {
          setIsPhoneNotMatched(true);
          return;
        }
        setIsPhoneNotMatched(false);
        const data = await sendVerificationCode({
          type: 'SMS',
          userId: user?.id,
          phoneNumber: values?.phone,
        }).unwrap();
        setUserPhone(values.phone);
        setTotpToken(data?.totpToken ?? undefined);
      }
    } catch (err) {
      toastMessage(getErrorMessage(err), 'error');
    }
  };

  const onReSendCode = async (sendBy: 'CALL' | 'MESSAGE') => {
    try {
      if (userPhone) {
        const data = await sendVerificationCode({
          type: 'SMS',
          userId: user?.id,
          sendBy,
          phoneNumber: userPhone,
        }).unwrap();
        setTotpToken(data?.totpToken ?? undefined);
      }
    } catch (err) {
      toastMessage(getErrorMessage(err), 'error');
    }
  };

  const onUpdatePhone = async (code: string) => {
    try {
      if (code && totpToken) {
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
    if (isPhoneNotMatched) setIsPhoneNotMatched(false);
  }, [phoneInput]);

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

  useEffect(() => {
    if (userAction === 'disable' && user?.twoFactorPhone) {
      if (user?.twoFactorPhone !== userPhone) {
        setUserPhone(user?.twoFactorPhone ?? '');
      }

      onReSendCode('MESSAGE');
    }
  }, [userPhone]);

  if (!accessToken) {
    router.replace('/auth/sign-in/campaign-implementer');
  } else if (user?.twoFactorMethod === 'TOTP' && user.twoFactorPhone && userAction !== 'disable') {
    router.push('/my-page');
  } else if (userAction === 'disable') {
    return (
      <Spin spinning={isSendVerificationCode || isVerifiSMS || isUpdateUser}>
        <div className="relative w-full container-min-height overflow-x-hidden bg-[#D5FFFF]">
          <div
            className={clsx(
              'absolute z-[1] container-min-height h-full w-full bg-[#D5FFFF] py-[40px] px-[20px] transition-all duration-300',
              'top-0 left-[0]'
            )}
          >
            {formInputVerifyCodeRender}
          </div>
        </div>
      </Spin>
    );
  } else {
    return (
      <Spin spinning={isSendVerificationCode || isVerifiSMS || isUpdateUser}>
        <div className="relative w-full container-min-height pb-[16px] overflow-x-hidden bg-[#D5FFFF]">
          <div
            className={clsx(
              'absolute z-[1] h-full w-full bg-[#D5FFFF] py-[40px] px-[20px] transition-all duration-300',
              !userPhone || !totpToken ? 'top-0 left-[0]' : 'top-0 left-[-110vw]'
            )}
          >
            <form className="mx-auto max-w-[335px]" onSubmit={handleSubmit(onSubmitPhone)}>
              <div className=" border-[2px] border-[#333] px-[22px] py-[30px] rounded-[16px] bg-white">
                <h1 className="text-[20px] font-bold text-[#04AFAF] tracking-[0.6px] text-center ">
                  携帯電話番号を入力
                </h1>
                <div className="h-[16px]" />
                <CFormInputShadow
                  errors={errors}
                  name="phone"
                  placeholder="090-1234-5678"
                  register={register}
                  type="text"
                />

                {isPhoneNotMatched ? (
                  <>
                    <div className="h-[8px]" />
                    <p className="text-[#FF0000] text-[12px]">
                      The phone number you entered does not match the phone number you have set up.
                    </p>
                  </>
                ) : (
                  ''
                )}
              </div>
              <div className="h-[24px]" />
              <div className="h-[53px] flex gap-[8px]">
                <div className="flex-1">
                  <CButtonShadow
                    classBgColor="bg-white"
                    classShadowColor="bg-[#333]"
                    onClick={() => {
                      router.push('/my-page');
                    }}
                    textClass="text-[#333]"
                    title="キャンセルする"
                    type="button"
                  />
                </div>
                <div className="flex-1">
                  <CButtonShadow title="保存する" type="submit" />
                </div>
              </div>
            </form>
          </div>
          <div
            className={clsx(
              'absolute z-[1]  h-full w-full bg-[#D5FFFF] py-[40px] px-[20px] transition-all duration-300',
              !userPhone || !totpToken ? 'top-0 left-[110vw]' : 'top-0 left-[0]'
            )}
          >
            {formInputVerifyCodeRender}
          </div>
        </div>
      </Spin>
    );
  }
}
