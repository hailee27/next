import { TypeCampaign } from '@/redux/endpoints/campaign';
import Link from 'next/link';
import { useMediaQuery } from 'usehooks-ts';
import CampaignCardItem from '../CampaignCardItem';
import CButtonShadow from '../common/CButtonShadow';
import ArrowDown from '../common/icons/ArrowDown';

interface Props {
  bgColor?: string;
  title?: string;
  listCampaign: TypeCampaign[] | null;
  viewMoreLink: string;
}
function TemplateCampaign({ bgColor, listCampaign, title, viewMoreLink }: Props) {
  const matchesMD = useMediaQuery('(min-width: 768px)');
  return (
    <div className={`px-[20px] py-[56px] ${bgColor && `rounded-[32px] bg-[${bgColor}]`} `}>
      <h2 className="text-[24px] font-bold text-center mb-[24px]">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xxl:grid-cols-4 gap-[16px] md:max-w-[680px] xxl:max-w-[1370px] md:mx-auto">
        {Array.isArray(listCampaign) && listCampaign?.length > 0
          ? listCampaign?.slice(0, matchesMD ? 4 : 3)?.map((item) => {
              if (item) {
                return <CampaignCardItem item={item} key={item.id} />;
              }
              return '';
            })
          : ''}
      </div>
      <div className="h-[40px]" />
      <div className="flex justify-center">
        <div className="w-[275px] h-[53px]">
          <Link href={viewMoreLink}>
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
TemplateCampaign.defaultProps = {
  bgColor: undefined,
  title: '',
};
export default TemplateCampaign;
