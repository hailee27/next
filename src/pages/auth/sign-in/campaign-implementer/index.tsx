/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ConnectXModal from '@/components/auth/ConnectXModal';
import CButtonShadow from '@/components/common/CButtonShadow';
import CFormInputShadow from '@/components/common/CFormInputShadow';
import ArrowDown from '@/components/common/icons/ArrowDown';
import useAuthEmailPassword from '@/hooks/useAuthEmailPassword';
import { useSigninEmailMutation } from '@/redux/endpoints/auth';
import { setSession } from '@/redux/slices/auth.slice';
import { RootState } from '@/redux/store';
import { getErrorMessage } from '@/utils/func/getErrorMessage';
import toastMessage from '@/utils/func/toastMessage';
import { AuthEmailPasswordData } from '@/utils/schema/auth.schema';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useDispatch, useSelector } from 'react-redux';

export default function CampaignImplementerSignin() {
  const { register, handleSubmit, errors, isDisableSubmit, onChangeRecaptcha } = useAuthEmailPassword();
  const { accessToken, user } = useSelector((state: RootState) => state.auth);
  console.log(accessToken, user);
  const [isShowMsg, setIsShowMsg] = useState(false);

  const [signinEmail] = useSigninEmailMutation();

  const router = useRouter();

  const dispatch = useDispatch();

  const onSigninEmail = async (formValue: AuthEmailPasswordData) => {
    try {
      if (formValue.email && formValue.password) {
        const data = await signinEmail(formValue).unwrap();
        if (data?.accessToken && data?.refreshToken && data?.user) {
          dispatch(setSession({ ...data }));
          setIsShowMsg(true);
          setTimeout(() => {
            router.replace('/my-page');
          }, 2000);
        } else if (data?.user && data?.totpToken) {
          router.push(
            `/auth/sign-in/campaign-implementer/verification?code=${data?.code ?? undefined}&totpToken=${
              data?.totpToken ?? undefined
            }&userId=${data?.user?.id ?? undefined}`
          );
        }
      }
    } catch (err) {
      console.log(err, 'Errrrrrrrrrrrrrrrrrr');
      toastMessage(getErrorMessage(err), 'error');
    }
  };

  return (
    <div className="min-h-[100vh] bg-[#D5FFFF] py-[40px] px-[20px]">
      <h1 className="text-[20px] text-[#04AFAF] font-bold tracking-[0.6px] text-center">ログイン</h1>
      <div className="h-[36px]" />
      <div className="max-w-[345px] mx-auto">
        <div className="px-[24px] py-[14px] border-[2px] border-[#333] rounded-t-[16px] flex items-center justify-center bg-[#333] text-white text-[18px] font-bold">
          キャンペーン参加者の方
        </div>
        <div className="border-[2px] border-[#333] rounded-b-[16px] px-[22px] py-[38px] bg-white">
          <ConnectXModal buttonLabel="X（twitter）でログインする" />

          <div className="h-[16px]" />
          <p className="text-gray-1 text-[13px] leading-[22px] tracking-[0.39px]">
            ※キャンペーンに参加するにはXでの連携が必要です。
          </p>
        </div>
      </div>
      <div className="h-[16px]" />
      <div className="max-w-[345px] mx-auto">
        <div className="px-[24px] py-[14px] border-[2px] border-[#333] rounded-t-[16px] flex items-center justify-center bg-[#333] text-white text-[18px] font-bold">
          キャンペーン作成者の方
        </div>
        <div className="border-[2px] border-[#333] rounded-b-[16px] px-[22px] py-[38px] bg-white">
          <form
            autoComplete="off"
            className="flex flex-col gap-[16px] max-w-[327px] mx-auto items-center"
            onSubmit={handleSubmit(onSigninEmail)}
          >
            <div className="w-full">
              <CFormInputShadow errors={errors} name="email" placeholder="メールアドレスを入力" register={register} />
              <div className="h-[8px]" />
              <CFormInputShadow
                errors={errors}
                name="password"
                placeholder="パスワードを入力"
                register={register}
                type="password"
              />
            </div>

            <Link
              className="  text-main-text font-medium text-[12px] tracking-[0.36px] cursor-pointer pb-[4px] border-b-[1px] border-b-[#333] w-fit"
              href="/auth/forgot-password"
            >
              パスワードを忘れた方
            </Link>
            {/* eslint-disable-next-line react/jsx-no-bind */}
            <ReCAPTCHA onChange={onChangeRecaptcha} sitekey={process?.env?.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''} />

            <div className="w-full h-[53px]">
              <CButtonShadow
                classBgColor={isDisableSubmit ? 'bg-[#c2c2c2]' : 'bg-[#333]'}
                classBorderColor={isDisableSubmit ? 'border-[#c2c2c2]' : 'border-[#333]'}
                classShadowColor="bg-[#fff]"
                isDisable={isDisableSubmit}
                textClass="text-white text-[14px] font-notoSans"
                title="ログインする"
                type="submit"
              />
            </div>
            <div>
              <p className="text-[13px] text-gray-1 leading-[22px]">
                ※キャンペーンを作成するにはメールアドレス/パスワードでのログインが必要です。
              </p>
              {isShowMsg ? (
                <p className="ml-[10px] text-[12px] text-[#FF0000] leading-[22px]">
                  2段階認証をマイページより設定する必要があります。約2秒後に自動的にマイページに遷移します。
                </p>
              ) : (
                ''
              )}
            </div>
          </form>
        </div>
      </div>
      <div className="h-[32px]" />
      <div className="flex items-center justify-center">
        <Link
          className="flex items-center justify-center gap-[4px] text-[13px] font-bold pb-[6px] border-b-[2px] border-b-[#333] cursor-pointer"
          href="/auth/sign-up"
        >
          新規会員登録の方はこちら
          <ArrowDown className="rotate-[-90deg]" />
        </Link>
      </div>
    </div>
  );
}
