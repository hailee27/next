import AuthCheck from '@/components/AuthCheck';
import CButtonShadow from '@/components/common/CButtonShadow';
import CFormInputShadow from '@/components/common/CFormInputShadow';
import { useUpdateMeMutation } from '@/redux/endpoints/me';
import { getErrorMessage } from '@/utils/func/getErrorMessage';
import toastMessage from '@/utils/func/toastMessage';
import { emailSchema, UpdateEmailData } from '@/utils/schema/auth.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Spin } from 'antd';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

export default function SettingEmailPage() {
  const router = useRouter();

  const [updateMe, { isLoading }] = useUpdateMeMutation();

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<UpdateEmailData>({
    resolver: yupResolver(emailSchema),
  });

  const onUpdateEmail = async (data: UpdateEmailData) => {
    try {
      if (data?.email) {
        await updateMe({
          email: data?.email,
        }).unwrap();
        toastMessage('Email has been updated successfully', 'error');
        router.push('/my-page');
      }
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
            <div className="bg-white border-[2px] border-[#333] px-[22px] py-[30px] rounded-[16px]">
              <h1 className="text-[20px] font-bold text-[#04AFAF] tracking-[0.6px] text-center ">
                新しいメールアドレスを入力
              </h1>
              <div className="h-[16px]" />
              <CFormInputShadow
                errors={errors}
                name="email"
                placeholder="メールアドレスを入力"
                register={register}
                type="text"
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
                <CButtonShadow title="保存する" type="submit" />
              </div>
            </div>
          </div>
        </Spin>
      </form>
    </AuthCheck>
  );
}
