import CButtonShadow from '@/components/common/CButtonShadow';
import CModalWapper from '@/components/common/CModalWapper';
import { logout } from '@/redux/slices/auth.slice';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

export default function LogoutModal({ isOpen, onCancel }: { isOpen: boolean; onCancel: () => void }) {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <CModalWapper isOpen={isOpen} onCancel={onCancel}>
      <div className="font-notoSans">
        <h3 className="text-[20px] font-bold tracking-[0.6px] leading-[30px] text-center">ログアウトします</h3>

        <div className="h-[24px]" />
        <p className="text-[14px] font-bold tracking-[0.42px] leading-[21px] text-center">
          ログアウトしてもよろしいですか？
        </p>

        <div className="h-[24px]" />

        <div className="w-[206px] h-[53px] mx-auto">
          <CButtonShadow
            onClick={() => {
              dispatch(logout());
              router.push('/auth/sign-in/campaign-implementer');
              onCancel();
            }}
            title="ログアウトする"
            type="button"
          />
        </div>
      </div>
    </CModalWapper>
  );
}
