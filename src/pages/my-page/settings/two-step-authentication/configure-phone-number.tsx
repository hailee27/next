import AuthCheck from '@/components/AuthCheck';
import CButtonShadow from '@/components/common/CButtonShadow';
import CFormInputShadow from '@/components/common/CFormInputShadow';
import { useAuthVerificationMutation } from '@/redux/endpoints/auth';
import { RootState } from '@/redux/store';
import { getErrorMessage } from '@/utils/func/getErrorMessage';
import toastMessage from '@/utils/func/toastMessage';
import { phoneSchema, UpdatePhoneData } from '@/utils/schema/auth.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Spin } from 'antd';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

export default function ConfigurePhoneNumber() {
  const { user } = useSelector((store: RootState) => store.auth);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<UpdatePhoneData>({
    resolver: yupResolver(phoneSchema),
    mode: 'onChange',
  });
  const [sendVerificationCode, { isLoading: isSendVerificationCode }] = useAuthVerificationMutation();
  const router = useRouter();

  const onSubmitPhone = async (values: UpdatePhoneData) => {
    try {
      if (values?.phone && user?.id) {
        const data = await sendVerificationCode({
          type: 'SMS',
          userId: user?.id,
          phoneNumber: values?.phone?.replaceAll('-', ''),
          isCheckPhone: true,
        }).unwrap();

        router.push(
          `/my-page/settings/two-step-authentication/verification?phoneNumber=${values.phone}&token=${
            data?.totpToken ?? ''
          }`
        );
      }
    } catch (err) {
      toastMessage(getErrorMessage(err), 'error');
    }
  };

  useEffect(() => {
    if (user?.twoFactorMethod === 'TOTP' && user.twoFactorPhone) {
      router.push('/my-page');
    }
  }, [user]);

  return (
    <AuthCheck>
      <Spin spinning={isSendVerificationCode}>
        <div className="  w-full container-min-height pb-[16px] overflow-x-hidden bg-[#D5FFFF]">
          <div className={clsx(' h-full w-full bg-[#D5FFFF] py-[40px] px-[20px] transition-all duration-300')}>
            <form className="mx-auto max-w-[335px]" onSubmit={handleSubmit(onSubmitPhone)}>
              <div className=" border-[2px] border-[#333] px-[22px] py-[30px] rounded-[16px] bg-white">
                <h1 className="text-[20px] font-bold text-[#04AFAF] tracking-[0.6px] text-center ">
                  携帯電話番号を入力
                </h1>
                <div className="h-[16px]" />
                <CFormInputShadow
                  errors={errors}
                  name="phone"
                  placeholder="090-1234-5678"
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
                      router.push('/my-page');
                    }}
                    textClass="text-[#333]"
                    title="キャンセルする"
                    type="button"
                  />
                </div>
                <div className="flex-1">
                  <CButtonShadow title="保存する" type="submit" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </Spin>
    </AuthCheck>
  );
}
