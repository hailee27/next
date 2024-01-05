/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CButtonShadow from '@/components/common/CButtonShadow';
import CFormInputShadow from '@/components/common/CFormInputShadow';
import ArrowDown from '@/components/common/icons/ArrowDown';
import { useLoginMutation, useRecaptchaVerifyMutation, useTwitterAuthMutation } from '@/redux/endpoints/auth';
import { SMS_CASE } from '@/utils/constant/enums';
import { getErrorMessage } from '@/utils/func/getErrorMessage';
import toastMessage from '@/utils/func/toastMessage';
import { LoginFormData, loginSchema } from '@/utils/schema/login-email';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';

export default function CampaignImplementerSignin() {
  const [hasCaptchaToken, setHasCaptchaToken] = useState(false);
  const [isDisableSubmit, setIsDisableSubmit] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });
  const [twitterAuth] = useTwitterAuthMutation();

  const router = useRouter();
  const [login] = useLoginMutation();
  const [recaptchaVerify, { data: recaptchaVerifyData, isSuccess: isRecaptchaVerifySuccess }] =
    useRecaptchaVerifyMutation();
  const password = watch('password');
  const email = watch('email');
  async function onChange(token: string | null) {
    if (token) {
      console.log('token', token);
      setHasCaptchaToken(true);
      await recaptchaVerify({
        token,
      });
    } else {
      setHasCaptchaToken(false);
    }
  }
  const onSubmit = async (formValue: LoginFormData) => {
    try {
      if (isRecaptchaVerifySuccess) {
        const body = {
          email: formValue.email,
          password: formValue.password,
        };
        const data = await login(body).unwrap();
        console.log('data', data);
        // if (data?.totpToken && data?.code) {
        //   router.push({
        //     pathname: '/auth/sign-in/campaign-creator/sms-verification',
        //     query: {
        //       totpToken: data?.totpToken,
        //       code: data?.code,
        //       case: SMS_CASE.LOGIN_VERIFICATION,
        //     },
        //   });
        // }
      }
    } catch (err) {
      toastMessage(getErrorMessage(err), 'error');
    }
  };

  const handleClickAuthTwitter = async () => {
    try {
      const resp = await axios.post(`${process?.env?.NEXT_PUBLIC_API_URL}auth/connect/twitter`);

      if (resp?.data?.redirectUrl) {
        localStorage.setItem('oauthRequestTokenSecret', resp?.data?.oauthRequestTokenSecret);
        localStorage.setItem('oauthRequestToken', resp?.data?.oauthRequestToken);
        const width = 576;
        const height = 730;
        const left = window.screen.width / 2 - width / 2;
        const top = window.screen.height / 2 - height / 2;
        window.open(
          resp?.data?.redirectUrl,
          'Twitter Authentication',
          ` width=${width}, height=${height}, top=${top}, left=${left}`
        );

        // menubar=no,location=no,resizable=no,scrollbars=no,status=no,
      } else {
        console.log('auth faield');
      }
      // localStorage.setItem('test', '!2312313');
      // window.open(
      //   '/auth/callback/twitter',
      //   'Twitter Authentication',
      //   ` width=${width}, height=${height}, top=${top}, left=${left}`
      // );
    } catch (error) {
      console.log(error);
    }
  };
  const onChangeLocalStorage = useCallback(async () => {
    try {
      const storageData = JSON.parse(localStorage.getItem('twitter_callback_data') || '{}');
      if (storageData?.error) {
        toastMessage('Something went wrong', 'error');
        return;
      }
      if (storageData?.data) {
        window.removeEventListener('storage', onChangeLocalStorage, false);
        console.log('twitter data', storageData?.data);
        if (storageData?.data?.id && storageData?.data?.email) {
          const data = await twitterAuth({
            twitterId: storageData?.data?.id?.toString(),
            email: storageData?.data?.email,
          }).unwrap();
          console.log(data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
  // finally {
  //   localStorage.removeItem('twitter_callback_data');
  //   localStorage.removeItem('oauthRequestToken');
  //   localStorage.removeItem('oauthRequestTokenSecret');
  // }

  useEffect(() => {
    window.addEventListener('storage', onChangeLocalStorage, false);
    return () => {
      window.removeEventListener('storage', onChangeLocalStorage, false);
    };
  }, []);

  useEffect(() => {
    if (password && email && hasCaptchaToken && recaptchaVerifyData?.status && isRecaptchaVerifySuccess) {
      setIsDisableSubmit(false);
    } else {
      setIsDisableSubmit(true);
    }
  }, [password, email, hasCaptchaToken, isRecaptchaVerifySuccess]);
  return (
    <div className="min-h-[100vh] bg-[#D5FFFF] py-[40px] px-[20px]">
      <h1 className="text-[20xp] font-bold tracking-[0.6px] text-center">ログイン</h1>
      <div className="h-[36px]" />
      <div>
        <div className="px-[24px] py-[14px] border-[2px] border-[#333] rounded-t-[16px] flex items-center justify-center bg-[#333] text-white text-[18px] font-bold">
          キャンペーン参加者の方
        </div>
        <div className="border-[2px] border-[#333] rounded-b-[16px] px-[22px] py-[38px]">
          <div className="h-[53px]">
            <CButtonShadow
              onClick={() => {
                handleClickAuthTwitter?.();
              }}
              title="X（twitter）でログインする"
              type="button"
            />
          </div>
          <div className="h-[16px]" />
          <p className="text-gray-1 text-[13px] leading-[22px] tracking-[0.39px]">
            キャンペーンに参加するにはXでの連携が必要です
          </p>
        </div>
      </div>
      <div className="h-[16px]" />
      <div>
        <div className="px-[24px] py-[14px] border-[2px] border-[#333] rounded-t-[16px] flex items-center justify-center bg-[#333] text-white text-[18px] font-bold">
          キャンペーン参加者の方
        </div>
        <div className="border-[2px] border-[#333] rounded-b-[16px] px-[22px] py-[38px]">
          <form
            autoComplete="off"
            className="flex flex-col gap-[16px] max-w-[327px] mx-auto items-center"
            onSubmit={handleSubmit(onSubmit)}
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

            <p className="  text-main-text font-medium text-[12px] tracking-[0.36px] cursor-pointer pb-[4px] border-b-[1px] border-b-[#333] w-fit">
              パスワードを忘れた方
            </p>
            {/* eslint-disable-next-line react/jsx-no-bind */}
            <ReCAPTCHA onChange={onChange} sitekey={process?.env?.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''} />

            <div className="w-full h-[53px]">
              <CButtonShadow
                isDisable={isDisableSubmit}
                textClass="text-white text-[14px] font-notoSans"
                title="ログインする"
                type="submit"
                // classBgColor={isDisableSubmit ? "#c2c2c2" : "#333"}
                // classBorderColor={isDisableSubmit ? "#c2c2c2" : "#333"}
              />
            </div>
            <p className="text-[13px] text-gray-1 leading-[22px]">
              キャンペーンを作成するにはメールアドレス/パスワードでのログインが必要です
            </p>
          </form>
        </div>
      </div>
      <div className="h-[32px]" />
      <div className="flex items-center justify-center">
        <Link
          className="flex items-center justify-center gap-[4px] text-[13px] font-bold pb-[6px] border-b-[2px] border-b-[#333] cursor-pointer"
          href="/auth/sign-up/campaign-implementer"
        >
          新規会員登録の方はこちら
          <ArrowDown className="rotate-[-90deg]" />
        </Link>
      </div>
    </div>
  );
}
