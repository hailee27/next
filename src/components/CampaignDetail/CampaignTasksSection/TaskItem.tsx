/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import CShadowCard from '@/components/common/CCardShadow';
import ArrowUpRightFormIcon from '@/components/common/icons/ArrowUpRightFormIcon';
import { TasksConvert } from '@/utils/func/convertCampaign';

import Image from 'next/image';

export default function TaskItem({ task }: { task: TasksConvert }) {
  return (
    <CShadowCard>
      <div className="p-[24px] flex gap-[8px] flex-col">
        <div className="pb-[16px] flex gap-[16px] items-center border-b-[#AAA] border-b-[1px]">
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
              <span>task item</span>
              <ArrowUpRightFormIcon />
            </div>
          </div>
        </div>
        <div className="text-[14px]">task descriptionnnnnnn</div>
      </div>
    </CShadowCard>
  );
}
