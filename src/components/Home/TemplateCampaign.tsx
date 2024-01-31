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
    <div className={`px-[20px] py-[56px] md:py-[120px] ${bgColor && `rounded-[32px] bg-[${bgColor}]`} `}>
      <h2 className="text-[24px] font-bold text-center mb-[24px] md:mb-[72px] md:text-[32px] md:leading-[47px] md:tracking-[0.96px]">
        {title}
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,_335px)]  gap-[10px] justify-center md:max-w-[680px] xxl:max-w-[1370px] md:mx-auto">
        {Array.isArray(listCampaign) && listCampaign?.length > 0
          ? listCampaign?.slice(0, matchesMD ? 4 : 3)?.map((item) => {
              if (item) {
                return <CampaignCardItem item={item} key={item.id} />;
              }
              return '';
            })
          : ''}
      </div>
      <div className="h-[40px] md:h-[72px]" />
      <div className="flex justify-center">
        <div className="w-[276px] h-[53px] md:w-[321px] md:h-[66px]">
          <Link href={viewMoreLink}>
            <CButtonShadow
              classBgColor="bg-[#333]"
              classShadowColor="bg-[#fff]"
              textClass="text-white text-[14px] font-bold md:text-[16px]"
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
