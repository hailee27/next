/* eslint-disable react/no-danger */
/* eslint-disable no-nested-ternary */

import { useGetMasterDataQuery } from '@/redux/endpoints/masterData';
import { getMasterDataLabel } from '@/utils/func/convertCampaign';
import moment from 'moment';
import Image from 'next/image';
import { useContext, useMemo } from 'react';
import CalendarIcon from '@/components/common/icons/CalendarIcon';
import YenIcon from '@/components/common/icons/YenIcon';
import { CampaignDetailContext } from '../CampainContext';
import CampaignRewardSection from '../CampaignRewardSection';
import CampaignTasksSection from '../CampaignTasksSection';

export default function InfoCampaign() {
  const { data } = useGetMasterDataQuery();
  const { campaignDetail, campaignRewards, campaignTasks } = useContext(CampaignDetailContext);

  const campaignCategory = getMasterDataLabel(data, 'CATEGORY_CAMPAIGN', campaignDetail?.category ?? '');

  const sortCampaignRewardPrice = useMemo(() => {
    const results = campaignRewards && Array.isArray(campaignRewards) ? [...campaignRewards] : [];

    return results?.sort((a, b) => a.amountOfMoney - b.amountOfMoney);
  }, [campaignRewards]);

  const isCampaignExpired = useMemo(() => {
    let result = false;

    if (campaignDetail?.status !== 'PUBLIC') {
      result = true;
    }
    return result;
  }, [campaignDetail]);

  return (
    <div>
      <div className="xl:flex xl:border-b-[2px] xl:border-b-[#333]">
        <div className="xl:flex-1">
          {isCampaignExpired === true && (
            <div className="px-[20px] pt-[48px]  md:px-[160px] xl:px-[35px] xxl:px-[160px] md:py-[64px] !pb-0">
              <div className="rounded-[16px] border-[2px] border-[#333] px-[24px] py-[48px]">
                <p className="text-[20px] font-bold">本キャンペーンは終了しました</p>
                <div className="h-[16px]" />
                <p className="text-[13px] ">本キャンペーンは開催期間を終了したため、応募することはできません。</p>
              </div>
            </div>
          )}

          <div className="bg-white px-[20px] pt-[48px] pb-[56px] md:px-[160px] xl:px-[35px] xxl:px-[160px] md:!py-[64px]">
            <div className="flex flex-col gap-[16px] ">
              <div className=" flex gap-[10px] items-center  ">
                <div className="w-[32px] h-[32px] md:w-[32px] md:h-[32px] rounded-full  overflow-hidden">
                  <Image
                    alt="company logo"
                    className="w-full h-full object-cover"
                    height="0"
                    sizes="100vw"
                    src={campaignDetail?.company?.image?.imageUrl ?? '/assets/images/ImagePlaceholder.png'}
                    width="0"
                  />
                </div>
                <p className="font-bold text-[14px] md:text-[18px] tracking-[0.42px] leading-[21px] md:tracking-[0.54px] md:leading-[27px] text-main-text ">
                  {campaignDetail?.company?.name ?? '-'}
                </p>
              </div>
              <div>
                <h3 className="font-bold text-[20px] tracking-[0.6px] md:text-[28px] md:tracking-[0.84px] text-main-text ">
                  {campaignDetail?.title ?? '-'}
                </h3>
                <div className="h-[8px] md:h-[16px]" />
                {campaignCategory ? (
                  <span className="inline-flex justify-center items-center rounded-full px-[12px] py-[3px] md:px-[13px] md:py-[5px] border-gray-1 border-[1px]">
                    <span className="text-[12px]  tracking-[0.36px] leading-[18px]  text-gray-1">
                      {campaignCategory}
                    </span>
                  </span>
                ) : (
                  ''
                )}
              </div>
              <div className="max-h-[335px] md:max-h-[680px] md:mt-[16px] md:mb-[18px] flex items-center justify-center overflow-hidden">
                <Image
                  alt="campaign image"
                  className="object-contain"
                  height={335}
                  src={campaignDetail?.image?.imageUrl ?? '/assets/images/ImagePlaceholder.png'}
                  width={335}
                />
              </div>
              <div className=" flex flex-col gap-[6px] md:gap-[16px] text-main-text">
                {campaignDetail?.methodOfselectWinners === 'MANUAL_SELECTION' && (
                  <p
                    className="text-[14px]   mb-[2px]"
                    dangerouslySetInnerHTML={{ __html: campaignDetail?.noteReward?.replace(/\r?\n/g, '<br/>') ?? '' }}
                  />
                )}
                <p className="flex gap-[12px] items-center text-[14px] tracking-[0.42px] ">
                  <CalendarIcon className="w-[16px]" />
                  <span className="font-montserrat">
                    {moment(campaignDetail?.startTime)?.isValid()
                      ? moment(campaignDetail?.startTime)?.format('MM/DD hh:mm')
                      : '--/-- --:--'}
                    {campaignDetail?.dontSetExpiredTime !== true && (
                      <>
                        <span> 〜 </span>
                        {moment(campaignDetail?.expiredTime)?.isValid()
                          ? moment(campaignDetail?.expiredTime)?.format('MM/DD hh:mm')
                          : '--/-- --:--'}
                      </>
                    )}
                  </span>
                </p>
                {campaignDetail?.methodOfselectWinners !== 'MANUAL_SELECTION' && (
                  <p className="flex gap-[12px] items-center text-[14px] tracking-[0.42px] md:text-[18px] md:tracking-[0.54px]">
                    <YenIcon className="w-[16px]" />
                    <span>
                      {sortCampaignRewardPrice && sortCampaignRewardPrice?.length >= 2 ? (
                        <>
                          <span>
                            <span className="font-montserrat">
                              {sortCampaignRewardPrice?.[0]?.amountOfMoney &&
                              typeof sortCampaignRewardPrice?.[0]?.amountOfMoney === 'number'
                                ? sortCampaignRewardPrice[0].amountOfMoney.toLocaleString('ja-JP')
                                : '--'}
                            </span>
                            円
                          </span>
                          <span> 〜 </span>
                          <span>
                            <span className="font-montserrat">
                              {sortCampaignRewardPrice?.[sortCampaignRewardPrice.length - 1]?.amountOfMoney &&
                              typeof sortCampaignRewardPrice?.[sortCampaignRewardPrice.length - 1]?.amountOfMoney ===
                                'number'
                                ? sortCampaignRewardPrice[
                                    sortCampaignRewardPrice.length - 1
                                  ].amountOfMoney.toLocaleString('ja-JP')
                                : '--'}
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
          <div className=" bg-[url('/assets/images/campaign_bg.png')] bg-no-repeat bg-cover bg-center rounded-[32px] xl:rounded-[0px] px-[20px] py-[56px] flex flex-col gap-[48px] md:px-[160px] xl:px-[35px] xxl:px-[160px] md:py-[100px] ">
            <div
              className="display-text-editer-content"
              dangerouslySetInnerHTML={{ __html: campaignDetail?.description ?? '' }}
            />
            {campaignRewards && Array.isArray(campaignRewards) && campaignRewards?.length ? (
              <CampaignRewardSection />
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="xl:w-[440px] xl:border-l-[2px] xl:border-l-[#333] relative">
          <div className={isCampaignExpired === true ? 'opacity-40 pointer-events-none' : ''}>
            {campaignTasks && Array.isArray(campaignTasks) && campaignTasks?.length ? <CampaignTasksSection /> : ''}
          </div>
        </div>
      </div>
      <div className="xl:h-[120px]" />
    </div>
  );
}
