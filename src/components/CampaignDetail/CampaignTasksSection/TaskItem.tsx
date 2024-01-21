/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import CShadowCard from '@/components/common/CCardShadow';
import ArrowDown from '@/components/common/icons/ArrowDown';
import ArrowUpRightFormIcon from '@/components/common/icons/ArrowUpRightFormIcon';
import { TasksConvert } from '@/utils/func/convertCampaign';
import clsx from 'clsx';

import Image from 'next/image';
import { useState } from 'react';
import ModalFreeTextContent from './ModalFreeTextContent';

export default function TaskItem({ task }: { task: TasksConvert }) {
  const [modalState, setModalState] = useState<{
    isOpenModal: boolean;
    content: 1 | 2 | 3 | undefined;
  }>({
    isOpenModal: false,
    content: undefined,
  });

  const handleOpenPopup = (url: string) => {
    const dualScreenLeft = window.screenLeft ?? window.screenX;
    const dualScreenTop = window.screenTop ?? window.screenY;
    const width = window.innerWidth ?? document.documentElement.clientWidth ?? 475;

    const height = window.innerHeight ?? document.documentElement.clientHeight ?? 768;

    const systemZoom = width / window.screen.availWidth;

    const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
    const top = (height - 550) / 2 / systemZoom + dualScreenTop;

    const newWindow = window.open(
      url,
      'CLOUT',
      `width=${500 / systemZoom},height=${550 / systemZoom},top=${top},left=${left}`
    );

    newWindow?.focus();
  };
  console.log('asdasd', modalState);
  const onClickCard = () => {
    switch (task?.type) {
      case 'OPEN_LINK': {
        if (task?.link) handleOpenPopup(task?.link);
        break;
      }
      case 'FAQ_FREE_TEXT': {
        setModalState({
          isOpenModal: true,
          content: 1,
        });
        break;
      }
      default:
        break;
    }
  };

  return (
    <>
      <CShadowCard onClickCard={onClickCard}>
        <div className="p-[24px] flex gap-[8px] flex-col">
          <div
            className={clsx(
              'flex gap-[16px] items-center ',
              task?.type === 'OPEN_LINK' ? 'pb-[16px] border-b-[#AAA] border-b-[1px] ' : ''
            )}
          >
            <div className="w-[24px] h-[24px]">
              <Image
                alt="campaign image"
                className="w-full h-full object-cover"
                height="0"
                sizes="100vw"
                src="/assets/images/NotCheckIcon.png"
                width="0"
              />
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
        isOpen={modalState?.isOpenModal && modalState?.content === 1}
        onCancel={() => {
          setModalState({
            isOpenModal: false,
            content: undefined,
          });
        }}
      />
    </>
  );
}
