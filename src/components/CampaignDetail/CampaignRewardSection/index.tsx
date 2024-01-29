import CampaignRewardCardItem from '@/components/CampaignRewardCardItem';
import CButtonShadow from '@/components/common/CButtonShadow';
import CModalWapper from '@/components/common/CModalWapper';
import ArrowDown from '@/components/common/icons/ArrowDown';
import { useContext, useMemo, useState } from 'react';
import { CampaignDetailContext } from '../CampainContext';

export default function CampaignRewardSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { campaignDetail, campaignRewards } = useContext(CampaignDetailContext);

  const sortCampaignRewardIndex = useMemo(() => {
    const results = campaignRewards && Array.isArray(campaignRewards) ? [...campaignRewards] : [];

    return results?.sort((a, b) => a.index - b.index);
  }, [campaignRewards]);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      {campaignDetail?.methodOfselectWinners !== 'MANUAL_SELECTION' && (
        <div className="flex gap-[8px] flex-col">
          {sortCampaignRewardIndex
            ?.slice(0, 3)
            ?.map((item) => <CampaignRewardCardItem campaignReward={item} key={`list${item?.id}`} />)}
          {Array.isArray(campaignRewards) ? (
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
          ) : (
            ''
          )}
        </div>
      )}
      <CModalWapper isOpen={isModalOpen} modalWidth={368} onCancel={handleCancel} top={10}>
        <div className="h-[50vh] overflow-hidden">
          <div className="h-full overflow-y-auto flex flex-col gap-[8px] custom-scroll  pr-[8px]  ">
            <div>
              {sortCampaignRewardIndex?.map((item) => <CampaignRewardCardItem campaignReward={item} key={item?.id} />)}
            </div>
          </div>
        </div>
      </CModalWapper>
    </>
  );
}
