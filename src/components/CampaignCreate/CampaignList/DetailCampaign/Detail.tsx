import FlagItem from '@/components/common/FlagItem';
import React from 'react';

import { TypeCampaign } from '@/redux/endpoints/campaign';
import moment from 'moment';
import { useGetMasterDataQuery } from '@/redux/endpoints/masterData';
import { formatNumber } from '@/utils/formatNumber';
import TableReWard from '../../CampaignCreation/Confirmation/TableReWard';

function Detail({ data }: { data?: TypeCampaign }) {
  const { data: masterData } = useGetMasterDataQuery();

  return (
    <div className="mt-[56px] bg-white rounded-[8px] p-[48px] flex flex-col space-y-[56px]">
      <div className="flex flex-col space-y-[16px]">
        <h2 className="font-bold text-[18px] text-[#04AFAF]">基本情報</h2>
        <div className="mt-[24px] grid grid-cols-3 gap-y-[24px] px-[40px]">
          <div className="flex flex-col space-y-[8px]">
            <div className="text-[16px] font-bold border-l-2 border-[#04AFAF] h-[24px] pl-[14px]">キャンペーン名</div>
            <FlagItem className="pl-[16px]" value={data?.title} />
          </div>
          <div className="flex flex-col space-y-[8px]">
            <div className="text-[16px] font-bold border-l-2 border-[#04AFAF] h-[24px] pl-[14px]">カテゴリー</div>
            <FlagItem
              className="pl-[16px]"
              value={masterData?.CATEGORY_CAMPAIGN.find((e) => e.value === data?.category)?.label}
            />
          </div>
          <div className="flex flex-col space-y-[8px]">
            <div className="text-[16px] font-bold border-l-2 border-[#04AFAF] h-[24px] pl-[14px]">キャンペーン期間</div>
            <FlagItem
              className="pl-[16px]"
              value={`${moment(data?.startTime).format('YYYY/MM/DD hh:mm')} 〜${moment(data?.expiredTime).format(
                'YYYY/MM/DD hh:mm'
              )} `}
            />
          </div>
          <div className="flex flex-col space-y-[8px]">
            <div className="text-[16px] font-bold border-l-2 border-[#04AFAF] h-[24px] pl-[14px]">当選者選定方法</div>
            <FlagItem
              className="pl-[16px]"
              value={data?.methodOfselectWinners === 'AUTO_PRIZEE_DRAW' ? 'インスタントウィン' : 'マニュアル'}
            />
          </div>
          <div className="flex flex-col space-y-[8px]">
            <div className="text-[16px] font-bold border-l-2 border-[#04AFAF] h-[24px] pl-[14px]">現在のステータス</div>
            <FlagItem className="pl-[16px]" value="公開中" />
          </div>
          <div className="flex flex-col space-y-[8px]">
            <div className="text-[16px] font-bold border-l-2 border-[#04AFAF] h-[24px] pl-[14px]">
              キャンペーン作成者
            </div>
            <FlagItem className="pl-[16px]" value="池山智隆" />
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-[16px]">
        <h2 className="font-bold text-[18px] text-[#04AFAF] ">報酬</h2>
        <TableReWard valueTable={data?.CampaignReward} />
      </div>
      <div className="flex flex-col space-y-[16px]">
        <h2 className="font-bold text-[18px] text-[#04AFAF] ">報酬</h2>
        <span className="text-[16px] font-bold">終了する</span>
      </div>
      <div className="flex flex-col space-y-[16px]">
        <h2 className="font-bold text-[18px] text-[#04AFAF] ">報酬</h2>
        <div className="flex flex-col space-y-[8px] text-[14px]">
          <span className="text-[16px] font-bold">合計 {formatNumber(data?.totalPrizeValue ?? 0, true)}円</span>
          <span>ギフト代金：110,000円</span>
          <span>手数料：0円</span>
          <span>その他：0円</span>
          <span>消費税：0円</span>
          <span>デポジット残高利用：0円</span>
        </div>
      </div>
    </div>
  );
}
Detail.defaultProps = {
  data: undefined,
};
export default Detail;
