import CButtonShadow from '@/components/common/CButtonShadow';
import CModalWapper from '@/components/common/CModalWapper';
import { RootState } from '@/redux/store';
import { REDIRECT_QUERY_KEY } from '@/utils/constant/enums';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export default function ModalConnectX({ isOpen, onCancel }: { isOpen: boolean; onCancel: () => void }) {
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  return (
    <CModalWapper isOpen={isOpen} onCancel={onCancel}>
      <div className="font-notoSans">
        <h3 className="text-[20px] font-bold tracking-[0.6px] leading-[30px] text-center">コネクトX（Twitter） </h3>

        <div className="h-[24px]" />
        <p className="text-[14px] font-bold tracking-[0.42px] leading-[21px]">
          キャンペーンを開始する前に、アカウントをTwitterに接続する必要があります。
        </p>

        <div className="h-[24px]" />

        <div className="w-[206px] h-[53px] mx-auto">
          <CButtonShadow
            onClick={() => {
              if (accessToken) {
                const ops = {
                  [`${REDIRECT_QUERY_KEY}`]: router.asPath,
                };
                const qs = new URLSearchParams(ops).toString();
                router.push(`/my-page?${qs}`);
              }
            }}
            title="設定"
            type="button"
          />
        </div>
      </div>
    </CModalWapper>
  );
}
