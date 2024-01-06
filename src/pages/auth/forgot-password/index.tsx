import CButtonShadow from '@/components/common/CButtonShadow';
import CFormInputShadow from '@/components/common/CFormInputShadow';
import clsx from 'clsx';

export default function ForgotPasswordPage() {
  return (
    <div className={clsx(' min-h-[100vh] h-full w-full bg-[#D5FFFF] py-[40px] px-[20px] transition-all duration-300')}>
      <div className="bg-white border-[2px] border-[#333] px-[22px] py-[30px] rounded-[16px]">
        <h1 className="text-[20px] font-bold text-[#04AFAF] tracking-[0.6px] text-center ">メールアドレスを入力</h1>
        <div className="h-[16px]" />
        <CFormInputShadow name="email" placeholder="メールアドレスを入力" type="text" />
        <div className="h-[16px]" />
        <p className="text-[13px] text-[#777] leading-[22px] tracking-[0.39px] w-[275px] mx-auto">
          ご登録されたメールアドレスにパスワード再設定のご案内が送信されます。
        </p>
      </div>
      <div className="h-[24px]" />
      <div className="flex items-center justify-center">
        <div className="w-[259px] h-[53px] ">
          <CButtonShadow onClick={() => {}} title="パスワードをリセットする" type="button" />
        </div>
      </div>
    </div>
  );
}
