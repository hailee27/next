import CButtonShadow from '@/components/common/CButtonShadow';
import CFormInputShadow from '@/components/common/CFormInputShadow';
import clsx from 'clsx';

export default function SettingPasswordPage() {
  return (
    <div className={clsx(' min-h-[100vh] h-full w-full bg-[#D5FFFF] py-[40px] px-[20px] transition-all duration-300')}>
      <div className="bg-white border-[2px] border-[#333] px-[22px] py-[30px] rounded-[16px]">
        <h1 className="text-[20px] font-bold text-[#04AFAF] tracking-[0.6px] text-center ">新しいパスワードを入力</h1>
        <div className="h-[16px]" />
        <CFormInputShadow name="newPassword" placeholder="パスワードを入力" type="text" />
        <div className="h-[8px]" />
        <CFormInputShadow name="confirmNewPassword" placeholder="パスワードを再入力" type="text" />
      </div>
      <div className="h-[24px]" />
      <div className="flex items-center justify-center">
        <div className="w-[155px] h-[53px] ">
          <CButtonShadow onClick={() => {}} title="保存する" type="button" />
        </div>
      </div>
    </div>
  );
}
