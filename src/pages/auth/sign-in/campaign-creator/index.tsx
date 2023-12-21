/* eslint-disable no-console */
import SignUpFormInput from '@/components/SignUpFormInput';
import { useLoginMutation } from '@/redux/endpoints/auth';
import { LoginFormData, loginSchema } from '@/utils/schema/login-email';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { SMS_CASE } from '@/utils/constant/enums';
import { getErrorMessage } from '@/utils/func/getErrorMessage';
import toastMessage from '@/utils/func/toastMessage';

/*
dvhai@yopmail.com
12345678
*/

export default function CampaignCreatorSigninPage() {
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
  const router = useRouter();
  const [login] = useLoginMutation();
  const password = watch('password');
  const email = watch('email');

  function onChange(token: string | null) {
    if (token) {
      console.log('token', token);
      setHasCaptchaToken(true);
    } else {
      setHasCaptchaToken(false);
    }
  }

  const onSubmit = async (formValue: LoginFormData) => {
    try {
      const body = {
        email: formValue.email,
        password: formValue.password,
      };
      const data = await login(body).unwrap();

      if (data?.totpToken && data?.code) {
        console.log(data?.code);
        router.push({
          pathname: '/auth/sign-in/campaign-creator/sms-verification',
          query: {
            totpToken: data?.totpToken,
            code: data?.code,
            case: SMS_CASE.LOGIN_VERIFICATION,
          },
        });
      }
    } catch (err) {
      toastMessage(getErrorMessage(err), 'error');
    }
  };

  useEffect(() => {
    if (password && email && hasCaptchaToken) {
      setIsDisableSubmit(false);
    } else {
      setIsDisableSubmit(true);
    }
  }, [password, email, hasCaptchaToken]);

  return (
    <div className="bg-white border-[1px] border-solid border-border-base  p-[24px_12px] flex item-center justify-center">
      <div className="md:flex-1 flex justify-center items-center gap-[26px] flex-col text-text-dark max-w-[400px] px-[8px]">
        <p className="text-center py-[15px] text-[18px] leading-[18px]">Log in</p>
        <div className="h-[1px] w-full bg-border-base" />
        <form
          autoComplete="off"
          className="flex flex-col gap-[26px] max-w-[327px] mx-auto items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <SignUpFormInput errors={errors} label="Email" name="email" register={register} />
          <SignUpFormInput errors={errors} label="Password" name="password" register={register} type="password" />
          <p className="w-full text-primary-base text-[16px] leading-[16px] cursor-pointer">パスワードを忘れた方</p>

          {/* eslint-disable-next-line react/jsx-no-bind */}
          <ReCAPTCHA onChange={onChange} sitekey={process?.env?.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''} />
          <p className=" text-[16px] leading-[16px] ">
            続行することにより、利用規約およびプライバシーポリシーに同意したものとみなされます。
          </p>

          <button
            className={clsx(
              'w-full   text-white text-[16px] font-medium h-[48px] rounded-full max-w-[327px]  hover:opacity-80 transition-all duration-100',
              isDisableSubmit ? 'pointer-events-none bg-[#00000014]' : 'bg-primary-base'
            )}
            disabled={isDisableSubmit}
            type="submit"
          >
            ログイン
          </button>
        </form>
        <div className="h-[1px] w-full bg-border-base" />
        <div className="text-center text-[16px] leading-[16px]">
          メールアドレス・パスワード・2段階認証を <br />
          未設定の方
        </div>
        <button
          className="w-full bg-primary-base text-white text-[16px] font-medium h-[48px] rounded-full max-w-[327px]  hover:opacity-80 transition-all duration-100"
          type="button"
        >
          マイページで設定
        </button>
        <div className="h-[1px] w-full bg-border-base" />
        <p className=" text-[16px] leading-[16px] ">アカウントをお持ちでない方</p>
        <button
          className="w-full bg-primary-base text-white text-[16px] font-medium h-[48px] rounded-full max-w-[327px]  hover:opacity-80 transition-all duration-100"
          type="button"
        >
          会員登録
        </button>
      </div>
    </div>
  );
}
