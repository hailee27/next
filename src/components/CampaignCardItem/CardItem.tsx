import React from 'react';
import { Image } from 'antd';
import { TypeListCard } from '@/types/listCardCampaign.type';
import { useRouter } from 'next/router';
import CCardShadow from '../common/CCardShadow';
import CButtonClassic from '../common/CButtonClassic';
import ArrowDown from '../common/icons/ArrowDown';

function CardItem({ item }: { item: TypeListCard }) {
  const router = useRouter();
  return (
    <CCardShadow onClickCard={() => router.push(`/campaigns/${item.id}`)}>
      <div className="p-[24px] flex flex-col space-y-[16px]">
        <div className="flex items-center space-x-[8px]">
          <Image
            alt=""
            className="rounded-full object-fill"
            height="32px"
            preview={false}
            src={item.avatar ?? '/assets/images/ImagePlaceholder.png'}
            width="32px"
          />
          <span className="text-[14px] font-bold">組織名</span>
        </div>
        <div className="flex flex-col space-y-[8px]">
          <h2 className="text-[16px] font-bold">キャンペーンタイトルが入ります</h2>
          {item.type === 'default' && <p className="text-[13px]">{item.description}</p>}
          <div className="text-[13px] text-[#777] flex flex-col space-y-[6px]">
            {item.type === 'Instant' && (
              <>
                <span>報酬：{item.reWard}</span>
                <span>当選者枠：{item.winnerSlot}名</span>
              </>
            )}
            <span>
              報酬：
              <span className="font-montserrat">{item.date}</span>
            </span>
          </div>
        </div>
        <div className="min-w-[279px] h-[47px]">
          <CButtonClassic
            customClassName="!bg-btn-gradation !text-[14px] !text-main-text"
            tagLabel={item.type === 'Instant' ? '即時抽選' : ''}
            title="キャンペーンの詳細をみる"
            withIcon={{
              position: 'right',
              icon: <ArrowDown className="rotate-[-90deg]" />,
            }}
          />
        </div>
      </div>
    </CCardShadow>
  );
}

export default CardItem;
