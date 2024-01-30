import CButtonShadow from '@/components/common/CButtonShadow';
import CModalWapper from '@/components/common/CModalWapper';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export default function ModalConnectX({ isOpen, onCancel }: { isOpen: boolean; onCancel: () => void }) {
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  return (
    <CModalWapper isOpen={isOpen} onCancel={onCancel}>
      <div className="font-notoSans">
        <h3 className="text-[20px] font-bold tracking-[0.6px] leading-[30px] text-center">Connect X (Twitter)</h3>

        <div className="h-[24px]" />
        <p className="text-[14px] font-bold tracking-[0.42px] leading-[21px]">
          You must connect your account to Twitter before doing the campaign mission
        </p>

        <div className="h-[24px]" />

        <div className="w-[206px] h-[53px] mx-auto">
          <CButtonShadow
            onClick={() => {
              if (accessToken) {
                router.push('/my-page');
              }
            }}
            title="Go Setting"
            type="button"
          />
        </div>
      </div>
    </CModalWapper>
  );
}
