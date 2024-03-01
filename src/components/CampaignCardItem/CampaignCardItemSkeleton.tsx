import React from 'react';
import CShadowCard from '../common/CCardShadow';
import styles from './skeleton.module.scss';

export default function CampaignCardItemSkeleton({ viewMode }: { viewMode?: 'HAS_IMAGE' | 'NO_IMAGE' }) {
  return (
    <div className={styles.container}>
      <CShadowCard disableAnimation>
        <div className="font-notoSans px-[24px] py-[32px] flex flex-col gap-[16px] h-full justify-between">
          <div className=" flex flex-col gap-[16px]">
            <div className=" flex gap-[10px] items-center  ">
              <div className="w-[32px] h-[32px] rounded-full  overflow-hidden  skeleton-box" />
              <p className="font-bold text-[14px] tracking-[0.42px] leading-[21px] text-main-text h-[24px]" />
            </div>
            {viewMode === 'HAS_IMAGE' ? (
              <div className="h-[184px] rounded-[5px] overflow-hidden border-[#333] border-[2px] relative   skeleton-box " />
            ) : (
              ''
            )}

            <div>
              <div className="mb-[8px] h-[24px] w-full  skeleton-box" />

              <div className="text-[13px] text-[#777] flex flex-col space-y-[6px]">
                <div className="  h-[25px]  skeleton-box" />
                <div className="  h-[20.5px]  skeleton-box" />
                <div className="  h-[20.5px]  skeleton-box" />
              </div>
            </div>
          </div>

          <div className="min-w-[279px] h-[47px]  skeleton-box" />
        </div>
      </CShadowCard>
    </div>
  );
}
CampaignCardItemSkeleton.defaultProps = {
  viewMode: 'HAS_IMAGE',
};
