/* eslint-disable @typescript-eslint/no-unused-vars */
import AuthCheck from '@/components/AuthCheck';
import CButtonShadow from '@/components/common/CButtonShadow';
import CFormInputShadow from '@/components/common/CFormInputShadow';
import useAuthEmailPassword from '@/hooks/useAuthEmailPassword';
import { useUpdateMeMutation } from '@/redux/endpoints/me';
import { getErrorMessage } from '@/utils/func/getErrorMessage';
import toastMessage from '@/utils/func/toastMessage';
import { LoginFormData } from '@/utils/schema/login-email';
import { Spin } from 'antd';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import ReCAPTCHA from 'react-google-recaptcha';

export default function SettingAuthEmailPage() {
  const router = useRouter();

  const [updateMe, { isLoading }] = useUpdateMeMutation();

  const { register, handleSubmit, errors, isDisableSubmit, onChangeRecaptcha } = useAuthEmailPassword();

  const onUpdateEmail = async (data: LoginFormData) => {
    try {
      //   if (data?.email) {
      //     await updateMe({
      //       email: data?.email,
      //     }).unwrap();
      //     toastMessage('Email has been updated successfully', 'error');
      //     router.push('/my-page');
      //   }
    } catch (err) {
      toastMessage(getErrorMessage(err), 'error');
    }
  };

  return (
    <AuthCheck>
      <form onSubmit={handleSubmit(onUpdateEmail)}>
        <Spin spinning={isLoading}>
          <div
            className={clsx(
              ' min-h-[100vh] h-full w-full bg-[#D5FFFF] py-[40px] px-[20px] transition-all duration-300'
            )}
          >
            <h1 className="text-[20px] font-bold text-[#04AFAF] tracking-[0.6px] text-center ">
              新しいメールアドレスを入力
            </h1>
            <p className="text-gray-1 text-[13px] leading-[22px] tracking-[0.39px]">
              ※キャンペーンの応募にはメールアドレス/パスワードの登録が必要です。
            </p>
            <div className="h-[32px]" />
            <div className="bg-white border-[2px] border-[#333] px-[24px] py-[40px] rounded-[16px]">
              <div className="w-full flex flex-col items-center">
                <CFormInputShadow errors={errors} name="email" placeholder="メールアドレスを入力" register={register} />
                <div className="h-[8px]" />
                <CFormInputShadow
                  errors={errors}
                  name="password"
                  placeholder="パスワードを入力"
                  register={register}
                  type="password"
                />
                <div className="h-[16px]" />
                <ReCAPTCHA onChange={onChangeRecaptcha} sitekey={process?.env?.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ''} />
              </div>
              <div className="h-[24px]" />
              <div className="h-[53px] flex gap-[8px]">
                <div className="flex-1">
                  <CButtonShadow title="保存する" type="submit" />
                </div>
              </div>
            </div>
          </div>
        </Spin>
      </form>
    </AuthCheck>
  );
}
