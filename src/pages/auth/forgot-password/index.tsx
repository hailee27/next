import CButtonShadow from '@/components/common/CButtonShadow';
import CFormInputShadow from '@/components/common/CFormInputShadow';
import { useForgotPasswordMutation } from '@/redux/endpoints/auth';
import { getErrorMessage } from '@/utils/func/getErrorMessage';
import toastMessage from '@/utils/func/toastMessage';
import { emailSchema, UpdateEmailData } from '@/utils/schema/auth.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

export default function ForgotPasswordPage() {
  const [onSendMail] = useForgotPasswordMutation();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateEmailData>({
    resolver: yupResolver(emailSchema),
    mode: 'onChange',
  });

  const onSubmitEmail = async (values: UpdateEmailData) => {
    try {
      if (values?.email) {
        await onSendMail({
          email: values.email,
        }).unwrap();
        router.push('/auth/forgot-password/feedback');
      }
    } catch (err) {
      toastMessage(getErrorMessage(err), 'error');
    }
  };
  return (
    <div
      className={clsx(
        'container-min-height pb-[56px] h-full w-full bg-[#D5FFFF] py-[40px] px-[20px] transition-all duration-300'
      )}
    >
      <form autoComplete="off" onSubmit={handleSubmit(onSubmitEmail)}>
        <div className="bg-white border-[2px] border-[#333] px-[22px] py-[30px] rounded-[16px] max-w-[335px] mx-auto">
          <h1 className="text-[20px] font-bold text-[#04AFAF] tracking-[0.6px] text-center ">メールアドレスを入力</h1>
          <div className="h-[16px]" />
          <CFormInputShadow
            errors={errors}
            name="email"
            placeholder="メールアドレスを入力"
            register={register}
            type="text"
          />
          <div className="h-[16px]" />
          <p className="text-[13px] text-[#777] leading-[22px] tracking-[0.39px] w-[275px] mx-auto">
            ご登録されたメールアドレスにパスワード再設定のご案内が送信されます。
          </p>
        </div>
        <div className="h-[24px]" />
        <div className="flex items-center justify-center">
          <div className="w-[259px] h-[53px] ">
            <CButtonShadow title="パスワードをリセットする" type="submit" />
          </div>
        </div>
      </form>
    </div>
  );
}
