/* eslint-disable react/no-danger */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import CampaignCardItem from '@/components/CampaignCardItem';
import CampaignRewardCardItem from '@/components/CampaignRewardCardItem';
import CButtonShadow from '@/components/common/CButtonShadow';
import CShadowCard from '@/components/common/CCardShadow';
import CModalWapper from '@/components/common/CModalWapper';
import ArrowDown from '@/components/common/icons/ArrowDown';
import ArrowUpRightFormIcon from '@/components/common/icons/ArrowUpRightFormIcon';
import CalendarIcon from '@/components/common/icons/CalendarIcon';
import YenIcon from '@/components/common/icons/YenIcon';
import { CampaignApi, DetailCampaignResponse } from '@/redux/endpoints/campaign';
import { wrapper } from '@/redux/store';
import moment from 'moment';
import Image from 'next/image';
import { useState } from 'react';

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ params }) => {
  const id = Array.isArray(params?.id) ? params?.id?.[0] : params?.id ?? '';

  const { data: dataCampaign } = await store.dispatch(
    CampaignApi.endpoints.getDetailCampaign.initiate({
      campaignId: id,
      token: 'user',
    })
  );
  if (!dataCampaign) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      campaign: dataCampaign ?? null,
    },
  };
});

// eslint-disable-next-line max-lines-per-function
export default function CampaignDetail({ campaign }: { campaign: DetailCampaignResponse }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  console.log('campaign', campaign);
  const sortCampaignReward = Array.isArray(campaign?.CampaignReward)
    ? campaign?.CampaignReward?.sort((a, b) => a.amountOfMoney - b.amountOfMoney)
    : [];
  return (
    <div className="font-notoSans">
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
              {campaign?.company?.code ?? '-'}
            </p>
          </div>
          <div>
            <h3 className="font-bold text-[20px] tracking-[0.6px] text-main-text ">{campaign?.title ?? '-'}</h3>
            <div className="h-[8px]" />
            <span className="inline-flex justify-center items-center rounded-full px-[12px] py-[3px] border-gray-1 border-[1px]">
              <span className="text-[12px] tracking-[0.36px] leading-[18px]  text-gray-1">カテゴリー名</span>
            </span>
          </div>
          <div className="h-[335px] rounded-[5px]">
            <Image
              alt="campaign image"
              className="w-full h-full object-contain"
              height="0"
              sizes="100vw"
              src={campaign?.image?.imageUrl ?? '/assets/images/ImagePlaceholder.png'}
              width="0"
            />
          </div>
          <div className=" flex flex-col gap-[6px] text-main-text">
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
            <p className="flex gap-[12px] items-center text-[14px] tracking-[0.42px] ">
              <YenIcon className="w-[16px]" />
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
            </p>
          </div>
        </div>
      </div>
      <div className=" bg-[url('/assets/images/campaign_bg.png')] bg-no-repeat bg-cover bg-center rounded-[32px] px-[20px] py-[56px] flex flex-col gap-[48px]">
        <div
          className="display-text-editer-content"
          dangerouslySetInnerHTML={{ __html: campaign?.description ?? '' }}
        />

        <div className="flex gap-[8px] flex-col">
          <CampaignRewardCardItem />
          <CampaignRewardCardItem />
          <CampaignRewardCardItem />
          <div className="mt-[32px] flex items-center justify-center">
            <div className="w-[203px] h-[53px]">
              <CButtonShadow
                classBgColor="bg-[#333]"
                classShadowColor="bg-[#fff]"
                onClick={showModal}
                textClass="text-white text-[14px] font-bold"
                title="報酬一覧をみる"
                withIcon={{
                  position: 'right',
                  icon: <ArrowDown className="rotate-[-90deg]" />,
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="py-[56px] px-[20px]">
        <h3 className="text-[24px] font-bold tracking-[0.72px] text-center">タスク</h3>
        <div className="h-[24px]" />
        <div className="flex flex-col gap-[8px]">
          <CShadowCard>
            <div className="p-[24px] flex gap-[16px] items-center">
              <div className="w-[24px] h-[24px]">
                <Image
                  alt="campaign image"
                  className="w-full h-full object-cover"
                  height="0"
                  sizes="100vw"
                  src="/assets/images/CheckedIcon.png"
                  width="0"
                />
              </div>
              <div className="flex-1">
                <div className="text-[16px] font-bold tracking-[0.48px] flex items-center gap-[4px] flex-wrap">
                  <span>Xでフォローする</span>
                  <ArrowUpRightFormIcon />
                </div>
                <p className="text-[14px] font-bold tracking-[0.42px]">@clout</p>
              </div>
            </div>
          </CShadowCard>
          <CShadowCard>
            <div className="p-[24px] flex gap-[16px] items-center">
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
                  <span>Xでフォローする</span>
                  <ArrowUpRightFormIcon />
                </div>
                <p className="text-[14px] font-bold tracking-[0.42px]">@clout</p>
              </div>
            </div>
          </CShadowCard>
          <CShadowCard>
            <div className="p-[24px] flex gap-[16px] items-center min-h-[93px]">
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
                  <span>Xでフォローする</span>
                  <ArrowDown className="rotate-[-90deg]" />
                </div>
                {/* <p className="text-[14px] font-bold tracking-[0.42px]">@clout</p> */}
              </div>
            </div>
          </CShadowCard>
        </div>
        <div className="h-[40px]" />
        <div className=" flex items-center justify-center">
          <div className="w-[203px] h-[53px]">
            <CButtonShadow
              classBgColor="bg-[#c2c2c2]"
              classBorderColor="border-[#c2c2c2]"
              classShadowColor="bg-[#fff]"
              isDisable
              textClass="text-white text-[14px] font-bold tracking-[0.42px]"
              title="報酬を受け取る"
              withIcon={{
                position: 'right',
                icon: <ArrowDown className="rotate-[-90deg]" />,
              }}
            />
          </div>
        </div>
        <div className="h-[40px]" />
        <p className="text-gray-2 text-[13px] leading-[22px] tracking-[0.39px]">
          利用規約の短縮版文言を入れる想定利用規約の短縮版文言を入れる想定
          <br />
          利用規約の短縮版文言を入れる想定利用規約の短縮版文言を入れる想定利用規約の短縮版文言を入れる想定
        </p>
      </div>
      <div className="bg-[#D5FFFF] px-[20px] py-[56px] rounded-[32px]">
        <h3 className="text-[24px] font-bold tracking-[0.72px] text-center">タスク</h3>
        <div className="h-[40px]" />
        <div className="flex flex-col gap-[16px]">
          <CampaignCardItem />
          <CampaignCardItem />
        </div>
        <div className="h-[40px]" />
        <div className="flex justify-center">
          <div className="w-[275px] h-[53px]">
            <CButtonShadow
              classBgColor="bg-[#333]"
              classShadowColor="bg-[#fff]"
              textClass="text-white text-[14px] font-bold"
              title="キャンペーンの一覧をみる"
              withIcon={{
                position: 'right',
                icon: <ArrowDown className="rotate-[-90deg]" />,
              }}
            />
          </div>
        </div>
      </div>
      <div className="h-[56px]" />

      <CModalWapper isOpen={isModalOpen} onCancel={handleCancel}>
        <div className="h-[50vh] overflow-hidden">
          <div className="h-full overflow-y-auto flex flex-col gap-[8px] pr-[8px] custom-scroll">
            <CampaignRewardCardItem />
            <CampaignRewardCardItem />
            <CampaignRewardCardItem />
            <CampaignRewardCardItem />
            <CampaignRewardCardItem />
            <CampaignRewardCardItem />
          </div>
        </div>
      </CModalWapper>
    </div>
  );
}
