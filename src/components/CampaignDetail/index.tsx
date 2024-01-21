/* eslint-disable react/no-danger */
/* eslint-disable no-nested-ternary */

import { TypeCampaign } from '@/redux/endpoints/campaign';
import { useGetMasterDataQuery } from '@/redux/endpoints/masterData';
import moment from 'moment';
import Image from 'next/image';
import { useMemo } from 'react';
import { getMasterDataLabel } from '@/utils/func/convertCampaign';
import CalendarIcon from '../common/icons/CalendarIcon';
import YenIcon from '../common/icons/YenIcon';
import CampaignRewardSection from './CampaignRewardSection';
import CampaignTasksSection from './CampaignTasksSection';

export default function CampaignDetail({ campaign }: { campaign: TypeCampaign | null }) {
  const { data } = useGetMasterDataQuery();

  const campaignCategory = getMasterDataLabel(data, 'CATEGORY_CAMPAIGN', campaign?.category ?? '');

  const sortCampaignRewardPrice = useMemo(
    () =>
      Array.isArray(campaign?.CampaignReward)
        ? campaign?.CampaignReward?.sort((a, b) => a.amountOfMoney - b.amountOfMoney)
        : [],
    [campaign?.CampaignReward]
  );

  return (
    <>
      <CampaignTasksSection campaign={campaign} />
      <div className="bg-white px-[20px] pt-[48px] pb-[56px] ">
        <div className="flex flex-col gap-[16px] ">
          <div className=" flex gap-[10px] items-center  ">
            <div className="w-[32px] h-[32px] rounded-full  overflow-hidden">
              <Image
                alt="company logo"
                className="w-full h-full object-cover"
                height="0"
                sizes="100vw"
                src={campaign?.company?.image?.imageUrl ?? '/assets/images/ImagePlaceholder.png'}
                width="0"
              />
            </div>
            <p className="font-bold text-[14px] tracking-[0.42px] leading-[21px] text-main-text ">
              {campaign?.company?.name ?? '-'}
            </p>
          </div>
          <div>
            <h3 className="font-bold text-[20px] tracking-[0.6px] text-main-text ">{campaign?.title ?? '-'}</h3>
            <div className="h-[8px]" />
            {campaignCategory ? (
              <span className="inline-flex justify-center items-center rounded-full px-[12px] py-[3px] border-gray-1 border-[1px]">
                <span className="text-[12px] tracking-[0.36px] leading-[18px]  text-gray-1">{campaignCategory}</span>
              </span>
            ) : (
              ''
            )}
          </div>
          <div className="h-[335px] flex items-center justify-center overflow-hidden">
            <Image
              alt="campaign image"
              //   className="w-full h-full object-contain"
              height={335}
              sizes="100vw"
              src={campaign?.image?.imageUrl ?? '/assets/images/ImagePlaceholder.png'}
              width={335}
            />
          </div>
          <div className=" flex flex-col gap-[6px] text-main-text">
            {campaign?.methodOfselectWinners === 'MANUAL_SELECTION' && (
              <p
                className="text-[14px]   mb-[2px]"
                dangerouslySetInnerHTML={{ __html: campaign?.noteReward?.replace(/\r?\n/g, '<br/>') ?? '' }}
              />
            )}
            <p className="flex gap-[12px] items-center text-[14px] tracking-[0.42px] ">
              <CalendarIcon className="w-[16px]" />
              <span className="font-montserrat">
                {moment(campaign?.startTime)?.isValid()
                  ? moment(campaign?.startTime)?.format('MM/DD hh:mm')
                  : '--/-- --:--'}
                <span> 〜 </span>
                {moment(campaign?.expiredTime)?.isValid()
                  ? moment(campaign?.expiredTime)?.format('MM/DD hh:mm')
                  : '--/-- --:--'}
              </span>
            </p>
            {campaign?.methodOfselectWinners !== 'MANUAL_SELECTION' && (
              <p className="flex gap-[12px] items-center text-[14px] tracking-[0.42px] ">
                <YenIcon className="w-[16px]" />
                <span>
                  {sortCampaignRewardPrice && sortCampaignRewardPrice?.length >= 2 ? (
                    <>
                      <span>
                        <span className="font-montserrat">{sortCampaignRewardPrice[0]?.amountOfMoney ?? '--'}</span>円
                      </span>
                      <span> 〜 </span>
                      <span>
                        <span className="font-montserrat">
                          {sortCampaignRewardPrice[sortCampaignRewardPrice.length - 1]?.amountOfMoney ?? '--'}
                        </span>
                        円
                      </span>
                    </>
                  ) : sortCampaignRewardPrice?.length === 1 ? (
                    <span>
                      <span className="font-montserrat">{sortCampaignRewardPrice[0]?.amountOfMoney ?? '--'}</span>円
                    </span>
                  ) : (
                    '--'
                  )}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
      <div className=" bg-[url('/assets/images/campaign_bg.png')] bg-no-repeat bg-cover bg-center rounded-[32px] px-[20px] py-[56px] flex flex-col gap-[48px]">
        <div
          className="display-text-editer-content"
          dangerouslySetInnerHTML={{ __html: campaign?.description ?? '' }}
        />
        {campaign ? <CampaignRewardSection campaign={campaign} /> : ''}
      </div>
      {Array.isArray(campaign?.Task) && campaign?.Task?.length ? <CampaignTasksSection campaign={campaign} /> : ''}
    </>
  );
}
