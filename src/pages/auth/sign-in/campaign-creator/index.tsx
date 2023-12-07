/* eslint-disable no-console */
import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { REGEX_EMAIL } from '@/utils/constant/regex';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import SignUpFormInput from '@/components/SignUpFormInput';

const schema = yup.object({
  email: yup
    .string()
    .required('email is requied')
    .email('please enter valid email address')
    .matches(REGEX_EMAIL, 'please enter valid email address'),
  password: yup.string().required('password is required').min(8, ' passwords must be at least 8 characters'),
  rememberMe: yup.boolean(),
});
type FormData = yup.InferType<typeof schema>;

export default function CampaignCreatorSignin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  function onChange(token: string | null) {
    console.log('Captcha value:', token);
  }

  const onSubmit = (data: FormData) => {
    console.log('login form: ', data);

    const body = {
      email: data.email,
      password: data.password,
    };

    console.log(body);
  };

  return (
    <div className="bg-white border-[1px] border-solid border-border-base  p-[24px_12px]">
      <div className="flex justify-center items-center gap-[26px] flex-col text-text-dark">
        <p className="text-center py-[15px] text-[18px] leading-[18px]">Log in</p>
        <div className="h-[1px] w-full bg-border-base" />
        <form className="flex flex-col gap-[26px] px-[11px]" onSubmit={handleSubmit(onSubmit)}>
          <SignUpFormInput errors={errors} label="Email" name="email" register={register} />
          <SignUpFormInput errors={errors} label="Password" name="password" register={register} />
          <p>パスワードを忘れた方</p>

          {/* eslint-disable-next-line react/jsx-no-bind */}
          <ReCAPTCHA onChange={onChange} sitekey={process?.env?.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''} />
          <p>続行することにより、利用規約およびプライバシーポリシーに同意したものとみなされます。</p>

          <button
            className="w-full bg-primary-base text-white text-[16px] font-medium h-[48px] rounded-full max-w-[327px]  hover:opacity-80 transition-all duration-100"
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
