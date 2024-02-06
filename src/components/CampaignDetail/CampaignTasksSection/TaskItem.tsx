/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import CShadowCard from '@/components/common/CCardShadow';
import ArrowDown from '@/components/common/icons/ArrowDown';
import ArrowUpRightFormIcon from '@/components/common/icons/ArrowUpRightFormIcon';
import { TasksConvert } from '@/utils/func/convertCampaign';
import clsx from 'clsx';

import { useImplementTaskMutation } from '@/redux/endpoints/me';
import { RootState } from '@/redux/store';
import { getErrorMessage } from '@/utils/func/getErrorMessage';
import { openWindowPopup } from '@/utils/func/openWindowPopup';
import toastMessage from '@/utils/func/toastMessage';
import { Spin } from 'antd';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { CampaignDetailContext } from '../CampainContext';
import ModalChooseMultiple from './ModalChooseMultiple';
import ModalChooseOne from './ModalChooseOne';
import ModalConnectX from './ModalConnectX';
import ModalFreeTextContent from './ModalFreeTextContent';

export default function TaskItem({
  task,
  isLoggedUserImplementedTask,
}: {
  task: TasksConvert;
  isLoggedUserImplementedTask: boolean;
}) {
  const [onImplementTask] = useImplementTaskMutation();
  const router = useRouter();
  const { accessToken, user } = useSelector((state: RootState) => state.auth);
  const { onRefetchCampaignTasks, onFetchCampaignInfo } = useContext(CampaignDetailContext);

  const [isLoading, setIsLoading] = useState(false);
  const [modalState, setModalState] = useState<{
    isOpenModal: boolean;
    content: 'FAQ_FREE_TEXT' | 'FAQ_CHOOSE_ONE' | 'FAQ_CHOOSE_MULTIPLE' | 'CONNECT_X' | undefined;
  }>({
    isOpenModal: false,
    content: undefined,
  });

  const handleOpenPopup = (url: string) => {
    openWindowPopup(url, 'CLOUT', 1280, 768);
  };

  const onClickCard = async () => {
    try {
      setIsLoading(true);
      if (!accessToken || !user || (user && !user?.id)) {
        router.push('/auth/sign-in/campaign-implementer');
        return;
      }
      if (isLoggedUserImplementedTask) {
        return;
      }

      const infoCampaign = await onFetchCampaignInfo?.();

      const now = moment();
      const nowClone = now.clone().toISOString();

      if (
        !infoCampaign ||
        infoCampaign?.status !== 'PUBLIC' ||
        (moment(infoCampaign?.expiredTime)?.isValid() && moment(infoCampaign?.expiredTime)?.isSameOrBefore(nowClone))
      ) {
        router?.reload();
        return;
      }

      if (user?.identities && user?.identities?.length > 0) {
        switch (task?.type) {
          case 'OPEN_LINK': {
            if (task?.link) handleOpenPopup(task?.link);
            setTimeout(async () => {
              try {
                await onImplementTask({
                  taskId: task?.id ?? '',
                });
                await onRefetchCampaignTasks();
              } catch (e) {
                toastMessage(getErrorMessage(e), 'error');
              }
            }, 5000);

            break;
          }
          case 'FAQ_FREE_TEXT':
          case 'FAQ_CHOOSE_ONE':
          case 'FAQ_CHOOSE_MULTIPLE': {
            setModalState({
              isOpenModal: true,
              content: task?.type,
            });
            break;
          }

          default:
            break;
        }
      } else {
        setModalState({
          isOpenModal: true,
          content: 'CONNECT_X',
        });
      }
    } catch (err: any) {
      toastMessage(getErrorMessage(err), 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Spin spinning={isLoading}>
      <CShadowCard onClickCard={onClickCard}>
        <div className="p-[24px] flex gap-[8px] flex-col">
          <div
            className={clsx(
              'flex gap-[16px] items-center ',
              task?.type === 'OPEN_LINK' ? 'pb-[16px] border-b-[#AAA] border-b-[1px] ' : ''
            )}
          >
            <div className="w-[24px] h-[24px]">
              {isLoggedUserImplementedTask ? (
                <Image
                  alt="campaign image"
                  className="w-full h-full object-cover"
                  height="0"
                  sizes="100vw"
                  src="/assets/images/CheckedIcon.png"
                  width="0"
                />
              ) : (
                <Image
                  alt="campaign image"
                  className="w-full h-full object-cover"
                  height="0"
                  sizes="100vw"
                  src="/assets/images/NotCheckIcon.png"
                  width="0"
                />
              )}
            </div>
            <div className="flex-1">
              <div className="text-[16px] font-bold tracking-[0.48px] flex items-center gap-[4px] flex-wrap">
                <span>{task?.title ?? ''}</span>
                {task?.type === 'OPEN_LINK' ? (
                  <ArrowUpRightFormIcon />
                ) : (
                  <ArrowDown className=" rotate-[-90deg] w-[14px] h-[14px]" />
                )}
              </div>
            </div>
          </div>
          <div className="text-[14px]">{task?.description ?? ''}</div>
        </div>
      </CShadowCard>
      <ModalFreeTextContent
        isOpen={modalState?.isOpenModal && modalState?.content === 'FAQ_FREE_TEXT'}
        onCancel={() => {
          setModalState({
            isOpenModal: false,
            content: undefined,
          });
        }}
        task={task}
      />
      <ModalChooseOne
        isOpen={modalState?.isOpenModal && modalState?.content === 'FAQ_CHOOSE_ONE'}
        onCancel={() => {
          setModalState({
            isOpenModal: false,
            content: undefined,
          });
        }}
        task={task}
      />
      <ModalChooseMultiple
        isOpen={modalState?.isOpenModal && modalState?.content === 'FAQ_CHOOSE_MULTIPLE'}
        onCancel={() => {
          setModalState({
            isOpenModal: false,
            content: undefined,
          });
        }}
        task={task}
      />
      <ModalConnectX
        isOpen={modalState?.isOpenModal && modalState?.content === 'CONNECT_X'}
        onCancel={() => {
          setModalState({
            isOpenModal: false,
            content: undefined,
          });
        }}
      />
    </Spin>
  );
}
