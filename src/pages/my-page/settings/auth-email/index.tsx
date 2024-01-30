import AuthCheck from '@/components/AuthCheck';
import CButtonShadow from '@/components/common/CButtonShadow';
import CFormInputShadow from '@/components/common/CFormInputShadow';
import useAuthEmailPassword from '@/hooks/useAuthEmailPassword';
import { useUpdateMeMutation } from '@/redux/endpoints/me';
import { getErrorMessage } from '@/utils/func/getErrorMessage';
import toastMessage from '@/utils/func/toastMessage';
import { AuthEmailPasswordData } from '@/utils/schema/auth.schema';
import { Spin } from 'antd';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import ReCAPTCHA from 'react-google-recaptcha';

export default function SettingAuthEmailPage() {
  const router = useRouter();

  const [updateMe, { isLoading }] = useUpdateMeMutation();

  const { register, handleSubmit, errors, isDisableSubmit, onChangeRecaptcha } = useAuthEmailPassword();

  const onUpdateEmail = async (data: AuthEmailPasswordData) => {
    try {
      if (data?.email && data?.password) {
        await updateMe({
          email: data?.email,
          newPassword: data?.password,
        }).unwrap();
        toastMessage('Email, password has been updated successfully', 'success');
        router.push('/my-page');
      }
    } catch (err) {
      toastMessage(getErrorMessage(err), 'error');
    }
  };

  return (
    <AuthCheck>
      <div
        className={clsx(
          'container-min-height pb-[56px] h-full w-full bg-[#D5FFFF] py-[40px] px-[20px] transition-all duration-300'
        )}
      >
        <Spin spinning={isLoading}>
          <form className="max-w-[335px] mx-auto" onSubmit={handleSubmit(onUpdateEmail)}>
            <h1 className="text-[20px] font-bold text-[#04AFAF] tracking-[0.6px] text-center ">
              メール・パスワード登録
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
                  <CButtonShadow
                    classBgColor={isDisableSubmit ? 'bg-[#c2c2c2]' : 'bg-[#333]'}
                    classBorderColor={isDisableSubmit ? 'border-[#c2c2c2]' : 'border-[#333]'}
                    classShadowColor="bg-[#fff]"
                    isDisable={isDisableSubmit}
                    textClass="text-white text-[14px] font-notoSans"
                    title="登録する"
                    type="submit"
                  />
                </div>
              </div>
            </div>
          </form>
        </Spin>
      </div>
    </AuthCheck>
  );
}
