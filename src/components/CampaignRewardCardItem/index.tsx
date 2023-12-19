import { useMemo, useState } from 'react';
import CShadowCard from '../common/CShadowCard';
import ArrowDown from '../common/icons/ArrowDown';

export default function CampaignRewardCardItem() {
  const [isViewMoreRewardMethod, setIsViewMoreRewardMethod] = useState(false);
  const rewardMethod = Array(20).fill('item');
  const renderRewardItem = useMemo(() => {
    if (!Array.isArray(rewardMethod)) {
      return [];
    }
    if (rewardMethod?.length <= 3) {
      return rewardMethod;
    }
    if (isViewMoreRewardMethod) {
      return rewardMethod;
    }
    return rewardMethod.slice(0, 3);
  }, [rewardMethod, isViewMoreRewardMethod]);
  return (
    <CShadowCard>
      <div className="font-notoSans p-[24px] flex flex-col gap-[16px]   ">
        <div className="flex gap-[16px] items-center justify-center font-bold">
          <span>
            <span className="text-[24px] font-montserrat">1</span>
            <span className=" text-[20px] ">等</span>
          </span>
          <span>
            <span className="text-[34px] font-montserrat">10,000</span>
            <span className=" text-[24px] ">円</span>
          </span>
        </div>
        <div className="border-t-[1px] border-top-[#aaa] pt-[12px]">
          <div className="flex flex-wrap justify-between items-end gap-[12px]  transition-all duration-150">
            <div className="flex flex-wrap gap-[8px]">
              {renderRewardItem.map(() => (
                <div className="w-[32px] h-[32px] min-w-[32px] min-h-[32px] rounded-full bg-gray-1" />
              ))}
            </div>
            {rewardMethod?.length > 3 ? (
              <div
                aria-hidden="true"
                className="flex w-fit gap-[4px] items-center text-[13px] font-bold pb-[5px] border-b-[2px] border-b-[#333]"
                onClick={() => {
                  setIsViewMoreRewardMethod((prev) => !prev);
                }}
              >
                <span>その他受取方法</span>
                {isViewMoreRewardMethod ? <ArrowDown className="rotate-[180deg]" /> : <ArrowDown />}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </CShadowCard>
  );
}