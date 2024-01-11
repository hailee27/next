import SmsVerificationForm from '@/components/auth/sms-verification-form';
import CButtonShadow from '@/components/common/CButtonShadow';
import CFormInputShadow from '@/components/common/CFormInputShadow';
import { useAuthVerificationMutation, useSmsVerifyMutation } from '@/redux/endpoints/auth';

import { useUpdateMeMutation } from '@/redux/endpoints/me';
import { logout } from '@/redux/slices/auth.slice';
import { RootState } from '@/redux/store';
import { getErrorMessage } from '@/utils/func/getErrorMessage';
import toastMessage from '@/utils/func/toastMessage';
import { phoneSchema, UpdatePhoneData } from '@/utils/schema/auth.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Spin } from 'antd';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

export default function SettingTwoStepAuthPage() {
  const [userPhone, setUserPhone] = useState<undefined | string>(undefined);
  const [totpToken, setTotpToken] = useState<undefined | string>(undefined);
  const dispatch = useDispatch();
  const router = useRouter();

  const { user, accessToken } = useSelector((store: RootState) => store.auth);

  const [sendVerificationCode, { isLoading: isSendVerificationCode }] = useAuthVerificationMutation();
  const [verifiSMS, { isLoading: isVerifiSMS }] = useSmsVerifyMutation();
  const [updateMe, { isLoading: isUpdateUser }] = useUpdateMeMutation();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<UpdatePhoneData>({
    resolver: yupResolver(phoneSchema),
    mode: 'onChange',
  });

  const onSubmitPhone = async (values: UpdatePhoneData) => {
    try {
      if (values?.phone && user?.id) {
        const data = await sendVerificationCode({ type: 'SMS', userId: user?.id }).unwrap();
        setUserPhone(values.phone);
        setTotpToken(data?.totpToken ?? undefined);
      }
    } catch (err) {
      toastMessage(getErrorMessage(err), 'error');
    }
  };

  const onReSendCode = async (sendBy: 'CALL' | 'MESSAGE') => {
    try {
      const data = await sendVerificationCode({ type: 'SMS', userId: user?.id, sendBy }).unwrap();
      setTotpToken(data?.totpToken ?? undefined);
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

        await updateMe({
          twoFactorMethod: 'TOTP',
          twoFactorPhone: userPhone,
        }).unwrap();
        if (router?.query?.from === 'sign-up') {
          toastMessage('Phone number has been updated successfully. ');
          router.push('/my-page');
        } else {
          toastMessage('Phone number has been updated successfully. Please login again');
          dispatch(logout());
          router.replace('/auth/sign-in/campaign-implementer');
        }
      }
    } catch (err) {
      toastMessage(getErrorMessage(err), 'error');
    }
  };
  if (!accessToken) {
    router.replace('/auth/sign-in/campaign-implementer');
  } else if (user?.twoFactorMethod === 'TOTP' && user.twoFactorPhone) {
    router.push('/my-page');
  } else {
    return (
      <Spin spinning={isSendVerificationCode || isVerifiSMS || isUpdateUser}>
        <div className="relative w-full min-h-[100vh] overflow-x-hidden bg-[#D5FFFF]">
          <div
            className={clsx(
              'absolute z-[1] min-h-[100vh] h-full w-full bg-[#D5FFFF] py-[40px] px-[20px] transition-all duration-300',
              !userPhone || !totpToken ? 'top-0 left-[0]' : 'top-0 left-[-110vw]'
            )}
          >
            <form onSubmit={handleSubmit(onSubmitPhone)}>
              <div className=" border-[2px] border-[#333] px-[22px] py-[30px] rounded-[16px]">
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
              'absolute z-[1] min-h-[100vh] h-full w-full bg-[#D5FFFF] py-[40px] px-[20px] transition-all duration-300',
              !userPhone || !totpToken ? 'top-0 left-[110vw]' : 'top-0 left-[0]'
            )}
          >
            <div className="bg-white border-[2px] border-[#333] px-[22px] py-[30px] rounded-[16px]">
              <h1 className="text-[20px] font-bold text-[#04AFAF] tracking-[0.6px] text-center ">
                携帯電話に届いた認証コード
                <br />
                を入力してください
              </h1>
              <div className="h-[16px]" />

              <SmsVerificationForm onSubmitCode={onUpdatePhone} />
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
        </div>
      </Spin>
    );
  }
}
