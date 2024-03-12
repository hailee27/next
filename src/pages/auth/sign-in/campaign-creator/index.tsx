/* eslint-disable no-console */

import ConnectXModal from '@/components/auth/ConnectXModal';
import CButtonShadow from '@/components/common/CButtonShadow';
import CFormInputShadow from '@/components/common/CFormInputShadow';
import ArrowDown from '@/components/common/icons/ArrowDown';
import useAuthEmailPassword from '@/hooks/useAuthEmailPassword';
import { useSigninEmailMutation } from '@/redux/endpoints/auth';
import { setSession } from '@/redux/slices/auth.slice';
import { getErrorMessage } from '@/utils/func/getErrorMessage';
import toastMessage from '@/utils/func/toastMessage';
import { AuthEmailPasswordData } from '@/utils/schema/auth.schema';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useDispatch } from 'react-redux';
import { pickBy } from 'lodash';

export default function CampaignCreatorSigninPage() {
  const { register, handleSubmit, errors, isDisableSubmit, onChangeRecaptcha } = useAuthEmailPassword();

  const [isShowMsg, setIsShowMsg] = useState(false);

  const [signinEmail] = useSigninEmailMutation();

  const router = useRouter();

  const dispatch = useDispatch();

  const onSigninEmail = async (formValue: AuthEmailPasswordData) => {
    try {
      if (formValue.email && formValue.password && !isDisableSubmit) {
        const data = await signinEmail(formValue).unwrap();
        if (data?.accessToken && data?.refreshToken && data?.user) {
          dispatch(setSession({ ...data }));
          setIsShowMsg(true);
          setTimeout(() => {
            router.replace('/my-page');
          }, 2000);
        } else if (data?.user && data?.totpToken) {
          const query = {
            code: data?.code ?? undefined,
            totpToken: data?.totpToken ?? undefined,
            userId: data?.user?.id ?? undefined,
          };

          const qs = new URLSearchParams(pickBy(query)).toString();

          router.push(`/auth/sign-in/campaign-creator/verification?${qs}`);
        }
      }
    } catch (err) {
      toastMessage(getErrorMessage(err), 'error');
    }
  };
  return (
    <div className="xxl:bg-[#D5FFFF] xxl:border-[2px] xxl:border-[#333] xxl:rounded-[16px] xxl:px-[56px] xxl:py-[48px] text-[#333]">
      <h3 className="text-[30px] font-bold text-[#04AFAF] tracking-[0.9px] text-center ">ログイン</h3>
      <div className="h-[8px]" />
      <p className="text-[13px] text-center">キャンペーン作成にはメールアドレスでのログインと2段階認証が必要です</p>
      <div className="h-[24px]" />

      <div className="bg-[#D5FFFF] xxl:bg-white border-[2px] border-[#333] rounded-[16px] p-[16px] xxl:p-[24px] xxl:pt-[32px]">
        <form
          autoComplete="off"
          className="flex flex-col gap-[16px]  mx-auto items-center"
          onSubmit={handleSubmit(onSigninEmail)}
        >
          <div className="flex flex-col xxl:flex-row items-start gap-[8px]">
            <div className="w-[287px]">
              <CFormInputShadow errors={errors} name="email" placeholder="メールアドレスを入力" register={register} />
            </div>
            <div className="w-[287px]">
              <CFormInputShadow
                errors={errors}
                name="password"
                placeholder="パスワードを入力"
                register={register}
                type="password"
              />
            </div>
          </div>

          <Link
            className="  text-main-text font-medium text-[12px] tracking-[0.36px] cursor-pointer pb-[4px] border-b-[1px] border-b-[#333] w-fit"
            href="/auth/forgot-password"
          >
            パスワードを忘れた方
          </Link>
          {/* eslint-disable-next-line react/jsx-no-bind */}
          <ReCAPTCHA onChange={onChangeRecaptcha} sitekey={process?.env?.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''} />

          <div className="w-[287px] h-[53px] mt-[8px]">
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
              ※続行することにより、
              <Link className="font-bold" href="/terms-of-service?view=creator">
                利用規約
              </Link>
              および
              <Link className="font-bold" href="/privacy-policy">
                プライバシーポリシー
              </Link>
              に同意したものとみなされます。
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
      <div className="h-[16px]" />
      <div className="bg-[#D5FFFF] xxl:bg-white border-[2px] border-[#333] rounded-[16px] p-[24px]  ">
        <p className="text-[16px]  font-bold">X連携済であるが、メールアドレス・パスワード・2段階認証を未設定の方</p>
        <div className="h-[24px]" />
        <div className="w-[287px] mx-auto">
          <ConnectXModal buttonLabel="マイページで設定する" />
        </div>
      </div>
      <div className="h-[24px]" />
      <div className="  flex items-center justify-center">
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
