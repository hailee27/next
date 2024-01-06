import CButtonShadow from '@/components/common/CButtonShadow';
import CFormInputShadow from '@/components/common/CFormInputShadow';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function SettingPasswordPage() {
  const router = useRouter();
  return (
    <div className={clsx(' min-h-[100vh] h-full w-full bg-[#D5FFFF] py-[40px] px-[20px] transition-all duration-300')}>
      <div className="bg-white border-[2px] border-[#333] px-[22px] py-[30px] rounded-[16px]">
        <h1 className="text-[20px] font-bold text-[#04AFAF] tracking-[0.6px] text-center ">現在のパスワードを入力</h1>
        <div className="h-[16px]" />
        <CFormInputShadow name="currentPassword" placeholder="パスワードを入力" type="text" />
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

      <div className="bg-white border-[2px] border-[#333] px-[22px] py-[30px] rounded-[16px]">
        <h1 className="text-[20px] font-bold text-[#04AFAF] tracking-[0.6px] text-center ">新しいパスワードを入力</h1>
        <div className="h-[16px]" />
        <CFormInputShadow name="newPassword" placeholder="パスワードを入力" type="text" />
        <div className="h-[8px]" />
        <CFormInputShadow name="confirmNewPassword" placeholder="パスワードを再入力" type="text" />
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
          <CButtonShadow onClick={() => {}} title="保存する" type="button" />
        </div>
      </div>
    </div>
  );
}
