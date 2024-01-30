/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ConnectXModal from '@/components/auth/ConnectXModal';
import CButtonShadow from '@/components/common/CButtonShadow';
import CFormInputShadow from '@/components/common/CFormInputShadow';
import ArrowDown from '@/components/common/icons/ArrowDown';
import useAuthEmailPassword from '@/hooks/useAuthEmailPassword';
import { useSignupEmailMutation } from '@/redux/endpoints/auth';
import { setSession } from '@/redux/slices/auth.slice';
import { getErrorMessage } from '@/utils/func/getErrorMessage';
import toastMessage from '@/utils/func/toastMessage';
import { AuthEmailPasswordData } from '@/utils/schema/auth.schema';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ReCAPTCHA from 'react-google-recaptcha';
import { useDispatch } from 'react-redux';

export default function SignupPage() {
  const { register, handleSubmit, errors, isDisableSubmit, onChangeRecaptcha } = useAuthEmailPassword();

  const [signupEmail] = useSignupEmailMutation();

  const router = useRouter();

  const dispatch = useDispatch();

  const onSignupEmail = async (formValue: AuthEmailPasswordData) => {
    try {
      if (formValue.email && formValue.password) {
        const data = await signupEmail(formValue).unwrap();
        if (data?.accessToken && data?.refreshToken && data?.user) {
          dispatch(setSession({ ...data }));
          router.push('/my-page/settings/two-step-auth?from=sign-up');
        }
      }
    } catch (e: any) {
      toastMessage(getErrorMessage(e), 'error');
    }
  };

  return (
    <div className="container-min-height pb-[56px] bg-[#D5FFFF] py-[40px] px-[20px]">
      <h1 className="text-[20px] font-bold tracking-[0.6px] text-center text-[#04AFAF]">新規会員登録</h1>
      <div className="h-[36px]" />
      <div className="max-w-[345px] mx-auto">
        <div>
          <div className="px-[24px] py-[14px] border-[2px] border-[#333] rounded-t-[16px] flex items-center justify-center bg-[#333] text-white text-[18px] font-bold">
            キャンペーン参加者の方
          </div>
          <div className="border-[2px] border-[#333] rounded-b-[16px] px-[22px] py-[38px] bg-white">
            <ConnectXModal buttonLabel="X（twitter）を連携する" />
            <div className="h-[16px]" />
            <p className="text-gray-1 text-[13px] leading-[22px] tracking-[0.39px]">
              ※キャンペーンに参加するにはXでの連携が必要です。
            </p>
          </div>
        </div>
      </div>
      <div className="h-[16px]" />
      <div className="max-w-[345px] mx-auto">
        <div>
          <div className="px-[24px] py-[14px] border-[2px] border-[#333] rounded-t-[16px] flex items-center justify-center bg-[#333] text-white text-[18px] font-bold">
            キャンペーン作成者の方
          </div>

          <div className="border-[2px] border-[#333] rounded-b-[16px] px-[22px] py-[38px] bg-white">
            <form
              autoComplete="off"
              className="flex flex-col gap-[16px] max-w-[327px] mx-auto items-center"
              onSubmit={handleSubmit(onSignupEmail)}
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

              {/* eslint-disable-next-line react/jsx-no-bind */}
              <ReCAPTCHA onChange={onChangeRecaptcha} sitekey={process?.env?.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''} />

              <div className="w-full h-[53px]">
                <CButtonShadow
                  classBgColor={isDisableSubmit ? 'bg-[#c2c2c2]' : 'bg-[#333]'}
                  classBorderColor={isDisableSubmit ? 'border-[#c2c2c2]' : 'border-[#333]'}
                  classShadowColor="bg-[#fff]"
                  isDisable={isDisableSubmit}
                  textClass="text-white text-[14px] font-notoSans"
                  title="同意して登録する"
                  type="submit"
                />
              </div>
              <div>
                <p className="text-[13px] text-gray-1 leading-[22px] tracking-[0.39px]">
                  ※キャンペーンを作成するにはメールアドレス/パスワードでの登録が必要です。
                </p>
                <p className="text-[13px] text-gray-1 leading-[22px] tracking-[0.39px]">
                  ※続行することにより
                  <Link className="font-bold" href="/terms-of-service">
                    利用規約
                  </Link>
                  および
                  <Link className="font-bold" href="/privacy-policy">
                    プライバシーポリシー
                  </Link>
                  に同意したものとみなされます。
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="h-[32px]" />
      <div className="max-w-[345px] mx-auto">
        <div className="flex items-center justify-center">
          <Link
            className="flex items-center justify-center gap-[4px] text-[13px] font-bold pb-[6px] border-b-[2px] border-b-[#333] cursor-pointer"
            href="/auth/sign-in/campaign-implementer"
          >
            ログインの方はこちら
            <ArrowDown className="rotate-[-90deg]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
