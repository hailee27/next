/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { REGEX_EMAIL } from '@/utils/constant/regex';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import SignUpFormInput from '@/components/SignUpFormInput';
import clsx from 'clsx';
import { FORM_FIELD_ERROR_FEEDBACK } from '@/utils/constant/feedback-message';

const schema = yup.object({
  email: yup
    .string()
    .required(FORM_FIELD_ERROR_FEEDBACK.emailRequired)
    .email(FORM_FIELD_ERROR_FEEDBACK.emailInvalid)
    .matches(REGEX_EMAIL, FORM_FIELD_ERROR_FEEDBACK.emailInvalid),
  password: yup
    .string()
    .required(FORM_FIELD_ERROR_FEEDBACK.passwordRequied)
    .min(8, FORM_FIELD_ERROR_FEEDBACK.passwordShortLength),
});
type FormData = yup.InferType<typeof schema>;

export default function CampaignCreatorSignin() {
  const [hasCaptchaToken, setHasCaptchaToken] = useState(false);
  const [isDisableSubmit, setIsDisableSubmit] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const password = watch('password');
  const email = watch('email');
  function onChange(token: string | null) {
    if (token) {
      setHasCaptchaToken(true);
    } else {
      setHasCaptchaToken(false);
    }
  }

  const onSubmit = (data: FormData) => {
    console.log('login form: ', data);

    const body = {
      email: data.email,
      password: data.password,
    };

    console.log(body);
  };

  useEffect(() => {
    if (password && email && hasCaptchaToken) {
      setIsDisableSubmit(false);
    } else {
      setIsDisableSubmit(true);
    }
    console.log(password, email, hasCaptchaToken);
  }, [password, email, hasCaptchaToken]);

  return (
    <div className="bg-white border-[1px] border-solid border-border-base  p-[24px_12px] flex item-center justify-center">
      <div className="flex justify-center items-center gap-[26px] flex-col text-text-dark max-w-[400px]">
        <p className="text-center py-[15px] text-[18px] leading-[18px]">Log in</p>
        <div className="h-[1px] w-full bg-border-base" />
        <form className="flex flex-col gap-[26px] px-[11px] items-center" onSubmit={handleSubmit(onSubmit)}>
          <SignUpFormInput errors={errors} label="Email" name="email" register={register} />
          <SignUpFormInput errors={errors} label="Password" name="password" register={register} type="password" />
          <p className="w-full text-primary-base text-[16px] leading-[16px]">パスワードを忘れた方</p>

          {/* eslint-disable-next-line react/jsx-no-bind */}
          <ReCAPTCHA onChange={onChange} sitekey={process?.env?.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''} />
          <p>続行することにより、利用規約およびプライバシーポリシーに同意したものとみなされます。</p>

          <button
            className={clsx(
              'w-full bg-primary-base text-white text-[16px] font-medium h-[48px] rounded-full max-w-[327px]  hover:opacity-80 transition-all duration-100',
              isDisableSubmit ? 'pointer-events-none bg-[#00000014]' : 'bg-primary-base'
            )}
            disabled={isDisableSubmit}
            type="submit"
          >
            ログイン
          </button>
        </form>
        <div className="h-[1px] w-full bg-border-base" />
        <div className="text-center">
          メールアドレス・パスワード・2段階認証を <br />
          未設定の方
        </div>
        <button
          className="w-full bg-primary-base text-white text-[16px] font-medium h-[48px] rounded-full max-w-[327px]  hover:opacity-80 transition-all duration-100"
          type="button"
        >
          ログイン
        </button>
        <div className="h-[1px] w-full bg-border-base" />
        <p>アカウントをお持ちでない方</p>
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
