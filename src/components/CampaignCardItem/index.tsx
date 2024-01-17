/* eslint-disable no-nested-ternary */
import React from 'react';
import { useRouter } from 'next/router';
import { TypeCampaign } from '@/redux/endpoints/campaign';
import Image from 'next/image';
import moment from 'moment';
import CShadowCard from '../common/CCardShadow';
import ArrowDown from '../common/icons/ArrowDown';
import CButtonClassic from '../common/CButtonClassic';

export default function CampaignCardItem({
  item,
  viewMode,
}: {
  item: TypeCampaign;
  viewMode?: 'HAS_IMAGE' | 'NO_IMAGE';
}) {
  const router = useRouter();
  const sortCampaignReward = Array.isArray(item?.CampaignReward)
    ? item?.CampaignReward?.sort((a, b) => a.amountOfMoney - b.amountOfMoney)
    : [];
  return (
    <CShadowCard onClickCard={() => router.push(`/campaigns/${item?.id}`)}>
      <div className="font-notoSans px-[24px] py-[32px] flex flex-col gap-[16px]   ">
        <div className=" flex gap-[10px] items-center  ">
          <div className="w-[32px] h-[32px] rounded-full  overflow-hidden">
            <Image
              alt="company logo"
              className="w-full h-full object-cover"
              height="0"
              sizes="100vw"
              src={item?.company?.image?.imageUrl ?? '/assets/images/ImagePlaceholder.png'}
              width="0"
            />
          </div>
          <p className="font-bold text-[14px] tracking-[0.42px] leading-[21px] text-main-text ">
            {item?.company?.code ?? '-'}
          </p>
        </div>
        {viewMode === 'HAS_IMAGE' ? (
          <div className="h-[184px] rounded-[5px] overflow-hidden">
            <Image
              alt="campaign image"
              className="w-full h-full object-cover"
              height="0"
              sizes="100vw"
              src={item?.image?.imageUrl ?? '/assets/images/ImagePlaceholder.png'}
              width="0"
            />
          </div>
        ) : (
          ''
        )}

        <div>
          <h3 className="font-bold text-[16px] tracking-[0.48px] leading-[24px] mb-[8px] text-main-text line-clamp-2 text-ellipsis">
            {item?.title ?? '-'}
          </h3>
          {item?.methodOfselectWinners === 'MANUAL_SELECTION' && (
            <div
              className="text-[13px] line-clamp-2 text-ellipsis  mb-[8px]"
              dangerouslySetInnerHTML={{ __html: item?.description?.replace(/\r?\n/g, '<br/>') ?? '' }}
            />
          )}
          <div className="text-[13px] text-[#777] flex flex-col space-y-[6px]">
            {item.methodOfselectWinners !== 'MANUAL_SELECTION' && (
              <>
                <span>
                  報酬：
                  <span>
                    {sortCampaignReward?.length >= 2 ? (
                      <>
                        <span>
                          <span className="font-montserrat">{sortCampaignReward[0]?.amountOfMoney ?? '--'}</span>円
                        </span>
                        <span> 〜 </span>
                        <span>
                          <span className="font-montserrat">
                            {sortCampaignReward[sortCampaignReward.length - 1]?.amountOfMoney ?? '--'}
                          </span>
                          円
                        </span>
                      </>
                    ) : sortCampaignReward?.length === 1 ? (
                      <span>
                        <span className="font-montserrat">{sortCampaignReward[0]?.amountOfMoney ?? '--'}</span>円
                      </span>
                    ) : (
                      '--'
                    )}
                  </span>
                </span>
                <span>
                  当選者枠： <span className="font-montserrat">{item?.numberOfPrizes ?? '---'}</span>名
                </span>
              </>
            )}
            <span>
              報酬：
              <span className="font-montserrat">
                {moment(item?.startTime)?.isValid() ? moment(item?.startTime)?.format('MM/DD hh:mm') : '--/-- --:--'}
                <span> 〜 </span>
                {moment(item?.expiredTime)?.isValid()
                  ? moment(item?.expiredTime)?.format('MM/DD hh:mm')
                  : '--/-- --:--'}
              </span>
            </span>
          </div>
        </div>
        <div className="min-w-[279px] h-[47px]">
          <CButtonClassic
            customClassName="!bg-btn-gradation !text-[14px] !text-main-text"
            tagLabel={item.methodOfselectWinners !== 'MANUAL_SELECTION' ? '即時抽選' : ''}
            title="キャンペーンの詳細をみる"
            withIcon={{
              position: 'right',
              icon: <ArrowDown className="rotate-[-90deg]" />,
            }}
          />
        </div>
      </div>
    </CShadowCard>
  );
}

CampaignCardItem.defaultProps = {
  viewMode: 'HAS_IMAGE',
};
