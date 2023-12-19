import CampaignCardItem from '@/components/CampaignCardItem';
import CButtonShadow from '@/components/common/CButtonShadow';
import ArrowDown from '@/components/common/icons/ArrowDown';
import FileIcon from '@/components/common/icons/FileIcon';
import SearchIcon from '@/components/common/icons/SearchIcon';

export default function Home() {
  return (
    <div className="font-notoSans bg-white">
      <div className="flex justify-between flex-col min-h-[600px] bg-[#AAAAAA]">
        <div className="flex-1" />
        <div className="px-[20px] flex flex-col gap-[8px] mb-[66px]">
          <div className="h-[66px]">
            <CButtonShadow
              classBgColor="bg-[#333]"
              classShadowColor="bg-[#fff]"
              textClass="text-white text-[16px] font-bold"
              title="キャンペーンの一覧をみる"
              withIcon={{
                position: 'left',
                icon: <SearchIcon />,
              }}
            />
          </div>
          <div className="h-[66px]">
            <CButtonShadow
              classBgColor="bg-btn-gradation"
              classShadowColor="bg-[#333]"
              textClass="text-main-text text-[16px] font-bold"
              title="キャンペーンの一覧をみる"
              withIcon={{
                position: 'left',
                icon: <FileIcon />,
              }}
            />
          </div>
        </div>
      </div>
      <div className="px-[20px] py-[56px]">
        <h2 className="text-[24px] font-bold text-center mb-[24px]">おすすめのキャンペーン</h2>
        <div className="grid grid-cols-1 gap-[16px]">
          <CampaignCardItem />
          <CampaignCardItem />
        </div>
      </div>
      <div className="px-[20px] py-[56px] rounded-[32px] bg-base-color">
        <h2 className="text-[24px] font-bold text-center mb-[24px]">新着キャンペーン</h2>
        <div className="grid grid-cols-1 gap-[16px]">
          <CampaignCardItem />
          <CampaignCardItem />
        </div>
      </div>
      <div className="px-[20px] py-[56px] ">
        <h2 className="text-[24px] font-bold text-center mb-[24px]">高額報酬キャンペーン</h2>
        <div className="grid grid-cols-1 gap-[16px]">
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
    </div>
  );
}
