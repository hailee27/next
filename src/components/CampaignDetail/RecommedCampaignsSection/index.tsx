import CampaignCardItem from '@/components/CampaignCardItem';
import CButtonShadow from '@/components/common/CButtonShadow';
import ArrowDown from '@/components/common/icons/ArrowDown';
import { TypeCampaign } from '@/redux/endpoints/campaign';
import Link from 'next/link';
import React from 'react';

export default function RecommedCampaignsSection({ campaignsRecommend }: { campaignsRecommend: TypeCampaign[] }) {
  return (
    <div className="bg-[#D5FFFF] px-[20px] py-[56px] rounded-[32px]">
      <h3 className="text-[24px] font-bold tracking-[0.72px] text-center">おすすめのキャンペーン</h3>
      <div className="h-[40px]" />
      <div className="flex flex-col gap-[16px]">
        {campaignsRecommend?.map((item) => <CampaignCardItem item={item} key={item.id} />)}
      </div>
      <div className="h-[40px]" />
      <div className="flex justify-center">
        <div className="w-[275px] h-[53px]">
          <Link href="/campaigns?page=1&orderBy=totalViews">
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
          </Link>
        </div>
      </div>
    </div>
  );
}
