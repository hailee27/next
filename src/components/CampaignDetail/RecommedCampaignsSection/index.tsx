import CampaignCardItem from '@/components/CampaignCardItem';
import CButtonShadow from '@/components/common/CButtonShadow';
import ArrowDown from '@/components/common/icons/ArrowDown';
import { TypeCampaign } from '@/redux/endpoints/campaign';
import Link from 'next/link';
import React from 'react';
import { useMediaQuery } from 'usehooks-ts';

export default function RecommedCampaignsSection({ campaignsRecommend }: { campaignsRecommend: TypeCampaign[] }) {
  const matchesMD = useMediaQuery('(min-width: 768px)');

  return (
    <div className="bg-[#D5FFFF] px-[20px] py-[56px] rounded-[32px] md:py-[120px]">
      <h3 className="text-[24px] font-bold tracking-[0.72px] text-center md:text-[32px] md:tracking-[0.96px]">
        おすすめのキャンペーン
      </h3>
      <div className="h-[40px] md:h-[72px]" />

      <div className="grid grid-cols-[repeat(auto-fit,_335px)]  gap-[10px] justify-center md:max-w-[680px] xxl:max-w-[1370px] md:mx-auto">
        {Array.isArray(campaignsRecommend) && campaignsRecommend?.length > 0
          ? campaignsRecommend?.slice(0, matchesMD ? 4 : 3)?.map((item) => {
              if (item) {
                return <CampaignCardItem item={item} key={item.id} />;
              }
              return '';
            })
          : ''}
      </div>
      <div className="h-[40px] md:h-[72px]" />
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
