/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthCheck from '@/components/AuthCheck';
import CButtonShadow from '@/components/common/CButtonShadow';
import CFormInputShadow from '@/components/common/CFormInputShadow';
import { useUpdateMeMutation } from '@/redux/endpoints/me';
import { RootState } from '@/redux/store';
import { getErrorMessage } from '@/utils/func/getErrorMessage';
import toastMessage from '@/utils/func/toastMessage';
import { newPasswordSchema, updatePasswordSchema } from '@/utils/schema/auth.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Spin } from 'antd';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

export default function SettingPasswordPage() {
  const { user } = useSelector((store: RootState) => store.auth);
  const router = useRouter();
  const [updateMe, { isLoading }] = useUpdateMeMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: user?.havePassword ? yupResolver(updatePasswordSchema) : yupResolver(newPasswordSchema),
  });

  const onUpdatePassword = async (data: any) => {
    try {
      if (data?.newPassword) {
        const requestBody: {
          newPassword: string;
          password?: string;
        } = {
          newPassword: data.newPassword,
        };
        if (user?.havePassword) {
          requestBody.password = data?.password ?? '';
        }
        await updateMe(requestBody).unwrap();
        toastMessage('Password has been updated successfully', 'error');
        router.push('/my-page');
      }
    } catch (err) {
      toastMessage(getErrorMessage(err), 'error');
    }
  };

  return (
    <AuthCheck>
      <form onSubmit={handleSubmit(onUpdatePassword)}>
        <Spin spinning={isLoading}>
          <div
            className={clsx(
              ' min-h-[100vh] h-full w-full bg-[#D5FFFF] py-[40px] px-[20px] transition-all duration-300'
            )}
          >
            {user?.havePassword ? (
              <>
                <div className="bg-white border-[2px] border-[#333] px-[22px] py-[30px] rounded-[16px]">
                  <h1 className="text-[20px] font-bold text-[#04AFAF] tracking-[0.6px] text-center ">
                    現在のパスワードを入力
                  </h1>
                  <div className="h-[16px]" />
                  <CFormInputShadow
                    errors={errors}
                    name="password"
                    placeholder="パスワードを入力"
                    register={register}
                    type="password"
                  />
                  <div className="h-[16px]" />
                  <div className="flex items-center justify-center">
                    <Link
                      className="flex items-center justify-center gap-[4px] text-[12px] font-medium pb-[3px] border-b-[1px] border-b-[#333] cursor-pointer"
                      href="/auth/forgot-password"
                    >
                      パスワードを忘れた方
                    </Link>
                  </div>
                </div>
                <div className="h-[16px]" />
              </>
            ) : (
              ''
            )}

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
            <div className="h-[53px] flex gap-[8px]">
              <div className="flex-1">
                <CButtonShadow
                  classBgColor="bg-white"
                  classShadowColor="bg-[#333]"
                  onClick={() => {
                    router.back();
                  }}
                  textClass="text-[#333] text-[16px] font-notoSans"
                  title="キャンセルする"
                  type="button"
                />
              </div>
              <div className="flex-1">
                <CButtonShadow onClick={() => {}} title="保存する" type="submit" />
              </div>
            </div>
          </div>
        </Spin>
      </form>
    </AuthCheck>
  );
}
