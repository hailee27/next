import CampaignCardItem from '@/components/CampaignCardItem';
import CampaignRewardCardItem from '@/components/CampaignRewardCardItem';
import CButtonShadow from '@/components/common/CShadowButton';
import CShadowCard from '@/components/common/CShadowCard';
import ArrowDown from '@/components/common/icons/ArrowDown';
import ArrowUpRightFormIcon from '@/components/common/icons/ArrowUpRightFormIcon';
import CalendarIcon from '@/components/common/icons/CalendarIcon';
import YenIcon from '@/components/common/icons/YenIcon';
import Image from 'next/image';
import { useState } from 'react';
import CampaignRewardModal from './CampaignRewardModal';

// eslint-disable-next-line max-lines-per-function
export default function CampaignDetail() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="font-notoSans">
      <div className="bg-white px-[20px] pt-[48px] pb-[56px] ">
        <div className="flex flex-col gap-[16px] ">
          <div className=" flex gap-[10px] items-center  ">
            <div className="w-[32px] h-[32px] rounded-full bg-gray-2  overflow-hidden" />
            <p className="font-bold text-[14px] tracking-[0.42px] leading-[21px] text-main-text ">組織名</p>
          </div>
          <div>
            <h3 className="font-bold text-[20px] tracking-[0.6px] text-main-text ">キャンペーンタイトルが入ります</h3>
            <div className="h-[8px]" />
            <span className="inline-flex justify-center items-center rounded-full px-[12px] py-[3px] border-gray-1 border-[1px]">
              <span className="text-[12px] tracking-[0.36px] leading-[18px]  text-gray-1">カテゴリー名</span>
            </span>
          </div>
          <div className="h-[222px] rounded-[5px] overflow-hidden">
            <Image
              alt="campaign image"
              className="w-full h-full object-cover"
              height="0"
              sizes="100vw"
              src="/assets/images/ImagePlaceholder.png"
              width="0"
            />
          </div>
          <div className=" flex flex-col gap-[6px] text-main-text">
            <p className="flex gap-[12px] items-center text-[14px] tracking-[0.42px] ">
              <CalendarIcon className="w-[16px]" />
              <span className="font-montserrat">2023/12/12 〜 2023/12/31</span>
            </p>
            <p className="flex gap-[12px] items-center text-[14px] tracking-[0.42px] ">
              <YenIcon className="w-[16px]" />
              <span>
                <span className="font-montserrat">500</span>円 〜 <span className="font-montserrat">10,000</span>円
              </span>
            </p>
          </div>
        </div>
      </div>
      <div
        className="bg-campaign-detail-bg-1 rounded-[32px] px-[20px] py-[56px] flex flex-col gap-[48px]"
        // style={{
        //   background: 'linear-gradient(2deg, rgba(160, 255, 158, 0.50) 1.61%, rgba(166, 255, 255, 0.50) 98.38%), #FFF',
        // }}
      >
        <div className="flex flex-col gap-[24px]">
          <h2 className="text-[32px] font-bold tracking-[0.96px]">ここにテキストが入ります</h2>
          <h3 className="text-[24px] font-bold tracking-[0.72px]">ここにテキストが入ります</h3>
          <h4 className="text-[16px] font-bold tracking-[0.48px]">ここにテキストが入ります</h4>
          <p className="text-[14px] text-gray-1 leading-[22px] tracking-[0.42px]">
            ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。
          </p>
        </div>
        <div className="h-[222px] rounded-[5px] overflow-hidden">
          <Image
            alt="campaign image"
            className="w-full h-full object-cover"
            height="0"
            sizes="100vw"
            src="/assets/images/ImagePlaceholder.png"
            width="0"
          />
        </div>
        <div className="flex flex-col gap-[24px]">
          <h4 className="text-[16px] font-bold tracking-[0.48px]">ここにテキストが入ります</h4>
          <div className="inline-flex w-fit pb-[8px] items-center gap-[4px] font-bold text-[13px] border-[#333] border-b-[2px]">
            ここにテキストが入ります <ArrowDown className="rotate-[-90deg]" />
          </div>
          <ul className="list-disc ml-[20px] text-[14px] tracking-[0.42px]">
            <li className="mb-[8px]">ここにテキストが入ります。ここにテキストが入ります。</li>
            <li className="mb-[8px]">ここにテキストが入ります。ここにテキストが入ります。</li>
            <li>ここにテキストが入ります。ここにテキストが入ります。</li>
          </ul>
          <ol className="list-decimal ml-[20px] text-[14px] tracking-[0.42px]">
            <li className="mb-[8px]">ここにテキストが入ります。ここにテキストが入ります。</li>
            <li className="mb-[8px]">ここにテキストが入ります。ここにテキストが入ります。</li>
            <li>ここにテキストが入ります。ここにテキストが入ります。</li>
          </ol>
          <div className="bg-white p-[24px] text-[13px] leading-[22px] font-medium">
            ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。ここにテキストが入ります。
          </div>
        </div>
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
                  parentJustify: 'justify-center',
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
                parentJustify: 'justify-center',
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
                parentJustify: 'justify-center',
                icon: <ArrowDown className="rotate-[-90deg]" />,
              }}
            />
          </div>
        </div>
      </div>
      <div className="h-[56px]" />
      <CampaignRewardModal isOpen={isModalOpen} onCancel={handleCancel} />
    </div>
  );
}
