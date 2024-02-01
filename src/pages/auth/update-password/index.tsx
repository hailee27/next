/* eslint-disable @typescript-eslint/no-explicit-any */
import CButtonShadow from '@/components/common/CButtonShadow';
import CFormInputShadow from '@/components/common/CFormInputShadow';
import CModalWapper from '@/components/common/CModalWapper';
import { useResetPasswordMutation } from '@/redux/endpoints/auth';
import { getErrorMessage } from '@/utils/func/getErrorMessage';
import toastMessage from '@/utils/func/toastMessage';
import { NewPasswordData, newPasswordSchema } from '@/utils/schema/auth.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function SettingPasswordPage() {
  const [onResetPassword] = useResetPasswordMutation();
  const [isOpenFeedbackModal, setIsOpenFeedbackModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPasswordData>({
    resolver: yupResolver(newPasswordSchema),
    mode: 'onChange',
  });
  const router = useRouter();
  const onUpdatePassword = async (values: NewPasswordData) => {
    try {
      if (router?.query?.token && typeof router?.query?.token === 'string' && values?.newPassword) {
        await onResetPassword({
          password: values.newPassword,
          token: router?.query?.token,
        }).unwrap();
        setIsOpenFeedbackModal(true);
      }
    } catch (err: any) {
      if (err?.data?.statusCode === 401) {
        toastMessage('無効なトークンです。またメールアドレスを入力してください。', 'error');
        return;
      }
      toastMessage(getErrorMessage(err), 'error');
    }
  };

  return (
    <>
      <div
        className={clsx(
          'container-min-height pb-[56px] h-full w-full bg-[#D5FFFF] py-[40px] px-[20px] transition-all duration-300'
        )}
      >
        <form autoComplete="off" className="max-w-[335px] mx-auto" onSubmit={handleSubmit(onUpdatePassword)}>
          <div className="bg-white border-[2px] border-[#333] px-[22px] py-[30px] rounded-[16px]">
            <h1 className="text-[20px] font-bold text-[#04AFAF] tracking-[0.6px] text-center ">
              新しいパスワードを入力
            </h1>
            <div className="h-[16px]" />
            <CFormInputShadow
              errors={errors}
              name="newPassword"
              placeholder="パスワードを入力"
              register={register}
              type="password"
            />
            <div className="h-[8px]" />
            <CFormInputShadow
              errors={errors}
              name="passwordConfirmation"
              placeholder="パスワードを再入力"
              register={register}
              type="password"
            />
          </div>
          <div className="h-[24px]" />
          <div className="flex items-center justify-center">
            <div className="w-[155px] h-[53px] ">
              <CButtonShadow formNoValidate onClick={() => {}} title="保存する" type="submit" />
            </div>
          </div>
        </form>
      </div>
      <CModalWapper
        isOpen={isOpenFeedbackModal}
        onCancel={() => {
          setIsOpenFeedbackModal(false);

          router.push('/auth/sign-in/campaign-implementer');
        }}
      >
        <div className="text-[14px] font-medium">パスワードが正常に更新されました。もう一度ログインしてください</div>
      </CModalWapper>
    </>
  );
}
