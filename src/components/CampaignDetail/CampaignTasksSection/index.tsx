/* eslint-disable no-console */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines */
import CButtonShadow from '@/components/common/CButtonShadow';
import CModalWapper from '@/components/common/CModalWapper';
import ArrowDown from '@/components/common/icons/ArrowDown';
import { useCreateGachaMutation } from '@/redux/endpoints/users';
import { RootState } from '@/redux/store';
import { convertCampaignTask, TasksConvert } from '@/utils/func/convertCampaign';
import { getErrorMessage } from '@/utils/func/getErrorMessage';
import toastMessage from '@/utils/func/toastMessage';
import { Spin } from 'antd';
import { useRouter } from 'next/router';
import { useContext, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import clsx from 'clsx';
import { CampaignDetailContext } from '../CampainContext';
import TaskItem from './TaskItem';

export default function CampaignTasksSection() {
  const { accessToken, user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const [isOpenModalSetupAuthEmail, setIsOpenModalSetupAuthEmail] = useState(false);
  const [onRegisterCampaign] = useCreateGachaMutation();

  const { campaignDetail, campaignTasks, isFetchingCampaignTasks, onFetchCampaignInfo } =
    useContext(CampaignDetailContext);

  const [isLoading, setIsLoading] = useState(false);

  const isDisableRegisterBtn = useMemo(() => {
    if (!user?.id) {
      return true;
    }

    const hasTaskNotDone = campaignTasks?.some(
      (item) =>
        !Object.prototype.hasOwnProperty.call(item, 'UserTask') ||
        !item?.UserTask ||
        (item?.UserTask && !Array.isArray(item?.UserTask)) ||
        (item?.UserTask && Array.isArray(item?.UserTask) && !item?.UserTask?.length)
    );

    if (user?.id && hasTaskNotDone === true) {
      return true;
    }
    return false;
  }, [user?.id, campaignDetail, campaignTasks]);

  const handleRegisterCampaign = async () => {
    try {
      setIsLoading(true);
      if (user?.id) {
        const infoCampaign = await onFetchCampaignInfo?.();

        if (!infoCampaign || infoCampaign?.status !== 'PUBLIC') {
          router?.reload();
          return;
        }

        const camapignId = router?.query?.slug?.[0] ?? '';
        if (campaignDetail?.methodOfselectWinners === 'MANUAL_SELECTION' && (!user?.emailId || !user?.havePassword)) {
          setIsOpenModalSetupAuthEmail(true);
          return;
        }
        const gacha = await onRegisterCampaign({
          campaignId: camapignId,
          userId: user?.id ?? '',
        }).unwrap();

        if (onFetchCampaignInfo) {
          await onFetchCampaignInfo?.();
        }

        if (gacha?.isWin === true && campaignDetail?.methodOfselectWinners === 'MANUAL_SELECTION') {
          router.push(`/campaigns/${camapignId}/completion`);
          return;
        }
        if (gacha?.isWin === false && campaignDetail?.methodOfselectWinners === 'AUTO_PRIZEE_DRAW') {
          router.push(`/campaigns/${camapignId}/losing`);
          return;
        }
        if (gacha?.isWin === true && campaignDetail?.methodOfselectWinners === 'AUTO_PRIZEE_DRAW') {
          router.push(`/campaigns/${camapignId}/winning`);
        }
      } else {
        router.push('/auth/sign-in/campaign-implementer');
      }
    } catch (e) {
      toastMessage(getErrorMessage(e), 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const isUserLogged = useMemo(() => {
    let result = true;
    if (
      !accessToken ||
      !user ||
      (user && !user?.id) ||
      !(user && user?.identities && Array.isArray(user?.identities) && user?.identities?.length > 0)
    ) {
      result = false;
    }
    return result;
  }, [accessToken, user]);

  return (
    <Spin spinning={isLoading || isFetchingCampaignTasks}>
      <div className="py-[56px] px-[20px] md:py-[100px] md:px-[160px] xl:px-[35px]">
        <h3 className="text-[24px] font-bold tracking-[0.72px] text-center md:text-[28px] ">タスク</h3>
        <div className="h-[24px] md:h-[64px]" />

        {isUserLogged === false ? (
          <div className="mb-[8px]">
            <TaskItem isLoggedUserImplementedTask={false} task={{} as TasksConvert} type="CONNECT_X" />
          </div>
        ) : (
          ''
        )}
        <div
          className={clsx('flex flex-col gap-[8px]', isUserLogged === false ? 'opacity-40 pointer-events-none' : '')}
        >
          {campaignTasks &&
            Array.isArray(campaignTasks) &&
            campaignTasks?.length > 0 &&
            campaignTasks?.map((item) => {
              const result = convertCampaignTask(item);
              if (result) {
                return (
                  <TaskItem
                    isLoggedUserImplementedTask={Boolean(
                      user?.id && item?.UserTask && Array.isArray(item?.UserTask) && item?.UserTask?.length
                    )}
                    key={item?.id}
                    task={result}
                  />
                );
              }
              return '';
            })}
        </div>
        <div className="h-[40px] md:h-[64px]" />

        <div className=" flex items-center justify-center">
          <div className="w-[262px] h-[53px]">
            <CButtonShadow
              classBgColor={isDisableRegisterBtn ? 'bg-[#c2c2c2]' : 'bg-[#333]'}
              classBorderColor={isDisableRegisterBtn ? 'border-[#c2c2c2]' : 'border-[#333]'}
              classShadowColor="bg-[#fff]"
              isDisable={isDisableRegisterBtn}
              onClick={handleRegisterCampaign}
              textClass="text-white text-[14px] font-bold tracking-[0.42px]"
              title={
                campaignDetail?.methodOfselectWinners === 'MANUAL_SELECTION'
                  ? 'キャンペーンに応募する'
                  : '報酬を受け取る'
              }
              withIcon={{
                position: 'right',
                icon: <ArrowDown className="rotate-[-90deg]" />,
              }}
            />
          </div>
        </div>
        <div className="h-[40px] " />
        <p className="text-gray-2 text-[13px] leading-[22px] tracking-[0.39px]">
          利用規約の短縮版文言を入れる想定利用規約の短縮版文言を入れる想定
          <br />
          利用規約の短縮版文言を入れる想定利用規約の短縮版文言を入れる想定利用規約の短縮版文言を入れる想定
        </p>
      </div>
      <CModalWapper
        isOpen={isOpenModalSetupAuthEmail}
        onCancel={() => {
          setIsOpenModalSetupAuthEmail(false);
        }}
      >
        <div>
          <h3 className="text-[24px] font-bold text-center">メール・パスワード登録</h3>
          <div className="h-[24px]" />
          <p>キャンペーンの応募にはメールアドレス・パスワードの登録が必要になります。</p>
          <div className="h-[24px]" />
          <div className="w-[206px] h-[53px] mx-auto">
            <CButtonShadow
              onClick={() => {
                router.push('/my-page');
              }}
              title="設定"
              type="button"
            />
          </div>
        </div>
      </CModalWapper>
    </Spin>
  );
}
