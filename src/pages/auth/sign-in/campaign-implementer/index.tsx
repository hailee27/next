/* eslint-disable no-console */
/* eslint-disable react/require-default-props */
import { useLoginMutation, useTwitterAuthMutation } from '@/redux/endpoints/auth';
import { RootState } from '@/redux/store';
import { getErrorMessage } from '@/utils/func/getErrorMessage';
import toastMessage from '@/utils/func/toastMessage';
import { LoginFormData, loginSchema } from '@/utils/schema/login-email';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useLayoutEffect, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

export default function CampaignImplementerSigninPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const router = useRouter();

  const { accessToken } = useSelector((store: RootState) => store.auth);

  const [hasCaptchaToken, setHasCaptchaToken] = useState(false);
  const [isDisableSubmit, setIsDisableSubmit] = useState(true);
  const [isUserClickedLoginTwitter, setIsUserClickedLoginTwitter] = useState(false);

  const [login] = useLoginMutation();
  const [twitterAuth] = useTwitterAuthMutation();

  const password = watch('password');
  const email = watch('email');

  const { data: session } = useSession();

  const onSubmit = async (formValue: LoginFormData) => {
    try {
      const body = {
        email: formValue.email,
        password: formValue.password,
      };
      const data = await login(body).unwrap();
      console.log('data', data);
    } catch (err) {
      console.log(err);
    }
  };
  function onChange(token: string | null) {
    if (token) {
      setHasCaptchaToken(true);
    } else {
      setHasCaptchaToken(false);
    }
  }

  const handleRedirectTwitterAuth = async () => {
    setIsUserClickedLoginTwitter(true);
    const width = 450;
    const height = 730;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const newWindow = window.open(
      '/auth/popup/twitter',
      'Twitter Signin',
      `menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=${width}, height=${height}, top=${top}, left=${left}`
    );

    newWindow?.focus();
  };

  const handleTwitterAuthCallback = async (twitterId: string, userEmail: string) => {
    try {
      const data = await twitterAuth({ twitterId, email: userEmail }).unwrap();
      console.log(data);
    } catch (error) {
      toastMessage(getErrorMessage(error), 'error');
    }
  };
  useLayoutEffect(() => {
    if (accessToken) {
      router.push('/');
    }
  }, []);

  useEffect(() => {
    if (password && email && hasCaptchaToken) {
      setIsDisableSubmit(false);
    } else {
      setIsDisableSubmit(true);
    }
  }, [password, email, hasCaptchaToken]);

  useEffect(() => {
    if (isUserClickedLoginTwitter === false && session) {
      signOut();
    }
    if (session?.user?.userProfile?.id && session?.user?.userProfile?.email && isUserClickedLoginTwitter) {
      console.log('session?.user?.userProfile?.id', session?.user?.userProfile?.id);
      handleTwitterAuthCallback(session?.user?.userProfile?.id, session?.user?.userProfile?.email);
    }
  }, [session, isUserClickedLoginTwitter]);

  return (
    <div className="bg-white w-full py-[48px] font-mPlus1 ">
      <h3 className="text-[18px] font-medium leading-[18px] text-center">ログイン</h3>
      <div className="my-[32px] border-solid border-[1px] border-[#646464] p-[40px_16px] flex flex-col gap-[29px] items-center">
        <button
          className="bg-[#D9D9D9] w-[303px] h-[40px] text-[15px] font-medium"
          onClick={() => handleRedirectTwitterAuth()}
          type="button"
        >
          X（twitter）でログイン
        </button>
        <button
          onClick={() => {
            signOut();
          }}
          type="button"
        >
          signOut
        </button>
        <p className=" text-[12px] leading-[16px] text-center">※ キャンペーンに参加するにはXでの連携が必要です</p>
        <form autoComplete="off" className="flex flex-col gap-[29px] items-center" onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-[#646464] h-[1px] w-[calc(100%-12px)] " />
          <p className=" text-[12px] leading-[16px] text-center">
            ※ キャンペーンを作成するにはメールアドレス/パスワードでの <br />
            ログインが必要です。
          </p>
          <div className=" w-[303px] flex flex-col gap-[8px]">
            <span className=" text-[14px] leading-[16px] font-medium  "> メールアドレス</span>
            <input
              {...register('email')}
              className="border-solid border-[1px] border-[#646464] outline-none h-[40px] px-[16px]"
            />
            <ErrorMessage
              errors={errors}
              name={'email' ?? ''}
              render={({ message }: { message?: string }) => (
                <p className="  text-text-error text-[12px] font-normal">{message}</p>
              )}
            />
          </div>
          <div className=" w-[303px] flex flex-col gap-[8px]">
            <span className=" text-[14px] leading-[16px] font-medium "> パスワード</span>
            <input
              {...register('password')}
              className="border-solid border-[1px] border-[#646464] outline-none h-[40px] px-[16px] "
            />
            <ErrorMessage
              errors={errors}
              name={'password' ?? ''}
              render={({ message }: { message?: string }) => (
                <p className="  text-text-error text-[12px] font-normal">{message}</p>
              )}
            />
          </div>
          <p className="w-full  text-[12px] leading-[16px] cursor-pointer text-center">パスワードを忘れた方</p>
          <div className=" w-[303px] ">
            {/* eslint-disable-next-line react/jsx-no-bind */}
            <ReCAPTCHA onChange={onChange} sitekey={process?.env?.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''} />
          </div>
          <button
            className={clsx(
              'bg-[#D9D9D9] w-[303px] h-[40px] text-[15px] font-medium',
              isDisableSubmit ? 'pointer-events-none ' : ' '
            )}
            disabled={isDisableSubmit}
            type="submit"
          >
            {' '}
            ログイン
          </button>
          <div className="bg-[#646464] h-[1px] w-[calc(100%-12px)] " />
        </form>
        <p className=" text-[16px] leading-[16px] font-medium ">アカウントをお持ちでない方</p>
        <button className="bg-[#D9D9D9] w-[303px] h-[40px] text-[15px] font-medium" type="button">
          会員登録
        </button>
      </div>
    </div>
  );
}
