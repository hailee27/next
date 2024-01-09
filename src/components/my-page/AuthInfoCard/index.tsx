/* eslint-disable @typescript-eslint/no-unused-vars */
import { Switch } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import styles from './styles.module.scss';

export default function AuthInfoCard() {
  const { user } = useSelector((store: RootState) => store.auth);

  return (
    <div className=" border-[2px] border-[#333] px-[22px] py-[30px] rounded-[16px] bg-white">
      <div className="flex flex-col gap-[16px]">
        <div className="flex justify-between gap-[12px] items-center">
          <div className="text-main-text">
            <p className="text-[14px] font-bold">X（Twitter）連携</p>
            <div className="h-[8px]" />
            <p className="text-[13px] text-[#777]   w-[196px] overflow-hidden leading-[22px] tracking-[0.39px]">
              キャンペーンに参加される方は
              <br />
              こちらをオンにしてください
            </p>
          </div>
          <Switch className={styles.customSwitch} />
        </div>
        <div className="h-[1px] bg-[#aaa]" />
        <div className="flex justify-between gap-[12px] items-center">
          <div className="text-main-text">
            <p className="text-[14px] font-bold">2段階認証</p>
            <div className="h-[8px]" />
            <p className="text-[13px] text-[#777]   w-[196px] overflow-hidden leading-[22px] tracking-[0.39px]">
              キャンペーンを作成される方は
              <br />
              こちらをオンにしてください
            </p>
          </div>
          <Switch className={styles.customSwitch} />
        </div>
      </div>
    </div>
  );
}
