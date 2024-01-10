import React from 'react';
import { useRouter } from 'next/router';
import CampaignCardItem from '../CampaignCardItem';
import CButtonShadow from '../common/CButtonShadow';
import ArrowDown from '../common/icons/ArrowDown';

interface Props {
  bgColor?: string;
  title?: string;
  listCampaign?: string[];
}
function TemplateCampaign({ bgColor, listCampaign, title }: Props) {
  const router = useRouter();
  return (
    <div className={`px-[20px] py-[56px] ${bgColor && `rounded-[32px] bg-[${bgColor}]`} `}>
      <h2 className="text-[24px] font-bold text-center mb-[24px]">{title}</h2>
      <div className="grid grid-cols-1 gap-[16px]">{listCampaign?.map((item) => <CampaignCardItem key={item} />)}</div>
      <div className="h-[40px]" />
      <div className="flex justify-center">
        <div className="w-[275px] h-[53px]">
          <CButtonShadow
            classBgColor="bg-[#333]"
            classShadowColor="bg-[#fff]"
            onClick={() => router.push('/campaigns/list')}
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
  );
}
TemplateCampaign.defaultProps = {
  bgColor: undefined,
  title: '',
  listCampaign: ['1', '2', '3'],
};
export default TemplateCampaign;
