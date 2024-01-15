/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Spin, Switch } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useEffect, useMemo, useState } from 'react';
import { useUpdateMeMutation } from '@/redux/endpoints/me';
import { useLazyMeQuery } from '@/redux/endpoints/auth';
import toastMessage from '@/utils/func/toastMessage';
import { getErrorMessage } from '@/utils/func/getErrorMessage';
import { setUser } from '@/redux/slices/auth.slice';
import { useRouter } from 'next/router';
import styles from './styles.module.scss';

export default function AuthInfoCard() {
  const { user } = useSelector((store: RootState) => store.auth);
  const [twoStepAuthState, setTwoStepAuthState] = useState(false);

  const router = useRouter();

  const [updateMe, { isLoading: isUpdateUser }] = useUpdateMeMutation();

  const [triggerGetMe, { isLoading: isFetchingUser }] = useLazyMeQuery();

  const dispatch = useDispatch();

  const onDisableTwoStepAuth = async () => {
    try {
      await updateMe({
        twoFactorMethod: 'NONE',
        twoFactorPhone: null,
      }).unwrap();
      const data = await triggerGetMe().unwrap();
      if (data as any) {
        dispatch(setUser(data));
      }
      toastMessage('Two step authentication has been disabled successfully');
    } catch (err) {
      toastMessage(getErrorMessage(err), 'error');
    }
  };

  const onUpdateTwoStepAuthState = async (newState: boolean) => {
    if (newState === false) {
      // await onDisableTwoStepAuth();
      router.push('/my-page/settings/two-step-auth?action=disable');
    } else {
      router.push('/my-page/settings/two-step-auth');
    }
  };
  useEffect(() => {
    setTwoStepAuthState(Boolean(user?.twoFactorMethod === 'TOTP' && user?.twoFactorPhone));
  }, [user?.twoFactorMethod, user?.twoFactorPhone]);
  return (
    <Spin spinning={isFetchingUser || isUpdateUser}>
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
            <Switch className={styles.customSwitch} onChange={onUpdateTwoStepAuthState} value={twoStepAuthState} />
          </div>
        </div>
      </div>
    </Spin>
  );
}
