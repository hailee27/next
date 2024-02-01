import React, { useMemo } from 'react';
import FlagItem from '@/components/common/FlagItem';
import { TypeCampaign, useUpdateCampaignMutation } from '@/redux/endpoints/campaign';
import { useGetMasterDataQuery } from '@/redux/endpoints/masterData';
import { formatNumber } from '@/utils/formatNumber';
import moment from 'moment';
import CButtonShadow from '@/components/common/CButtonShadow';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import TableReWard from '../../CampaignCreation/Confirmation/TableReWard';

function Detail({ data }: { data?: TypeCampaign }) {
  const { user } = useSelector((state: RootState) => state.auth);
  const { push, query } = useRouter();
  const { data: masterData } = useGetMasterDataQuery();
  const [updateStatusCampaign] = useUpdateCampaignMutation();
  const status = useMemo(() => {
    switch (data?.status) {
      case 'DRAFT':
        return '下書き';
      case 'UNDER_REVIEW':
        return '審査中';
      case 'WAITING_FOR_PUBLICATION':
        return '公開待ち';
      case 'PUBLIC':
        return '公開中';
      case 'COMPLETION':
        return '完了';
      default:
        return '下書き';
    }
  }, [data?.status]);
  const fee = useMemo(() => Number((Number(data?.totalPrizeValue) * 5) / 100), [data?.totalPrizeValue]);
  const tax = useMemo(
    () => Number((((Number(data?.totalPrizeValue) ?? 0 * 5) / 100) * 10) / 100),
    [data?.totalPrizeValue]
  );

  return (
    <>
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
              <div className="text-[16px] font-bold border-l-2 border-[#04AFAF] h-[24px] pl-[14px]">
                キャンペーン期間
              </div>
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
              <div className="text-[16px] font-bold border-l-2 border-[#04AFAF] h-[24px] pl-[14px]">
                現在のステータス
              </div>
              <FlagItem className="pl-[16px]" value={status} />
            </div>
            <div className="flex flex-col space-y-[8px]">
              <div className="text-[16px] font-bold border-l-2 border-[#04AFAF] h-[24px] pl-[14px]">
                キャンペーン作成者
              </div>
              <FlagItem className="pl-[16px]" value="池山智隆" />
            </div>
          </div>
        </div>

        {data?.methodOfselectWinners === 'MANUAL_SELECTION' ? (
          <div className="flex flex-col space-y-[16px]">
            <h2 className="font-bold text-[18px] text-[#04AFAF] ">報酬要約文</h2>
            <span className="text-[16px] font-bold">{data.noteReward}</span>
          </div>
        ) : (
          <>
            <div className="flex flex-col space-y-[16px]">
              <h2 className="font-bold text-[18px] text-[#04AFAF] ">報酬</h2>
              <TableReWard />
            </div>
            <div className="flex flex-col space-y-[16px]">
              <h2 className="font-bold text-[18px] text-[#04AFAF] ">報酬</h2>
              <span className="text-[16px] font-bold">終了する</span>
            </div>
            <div className="flex flex-col space-y-[16px]">
              <h2 className="font-bold text-[18px] text-[#04AFAF] ">報酬</h2>

              <div className="flex flex-col text-[14px] space-y-[8px] ">
                <span className="text-[16px] font-bold">
                  合計 {formatNumber(Number(data?.totalPrizeValue) + fee + tax, true, 1)}円
                </span>
                <div className="flex justify-between ">
                  <span className="flex-1">ギフト代金: </span>
                  <span className="flex-[6]">{formatNumber(data?.totalPrizeValue ?? 0, true, 1)}円</span>
                </div>
                <div className="flex justify-between ">
                  <span className="flex-1">手数料: </span>
                  <span className="flex-[6]">{formatNumber(fee, true)}円</span>
                </div>
                <div className="flex justify-between ">
                  <span className="flex-1">消費税: </span>
                  <span className="flex-[6]">{formatNumber(tax, true)}円</span>
                </div>
                <div className="flex justify-between ">
                  <span className="flex-1">デポジット残高利用: </span>
                  <span className="flex-[6]">{user?.memberCompany.pointTotal}円</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      {query?.isChecking !== 'true' && (
        <div className="flex space-x-[16px] justify-center  mt-[64px]">
          {status === '下書き' && (
            <div className="w-[293px]  h-[56px]">
              <CButtonShadow
                classBgColor="bg-main-text"
                classRounded="rounded-[6px]"
                classShadowColor="bg-white"
                onClick={() => push(`/campaign-creator/create/draft/${query.id}`)}
                shadowSize="normal"
                title="編集する"
                type="submit"
              />
            </div>
          )}

          {status === '公開待ち' && (
            <div className="w-[376px]  h-[56px]">
              <CButtonShadow
                classBgColor="bg-white"
                classRounded="rounded-[6px]"
                classShadowColor="bg-main-text"
                onClick={() =>
                  updateStatusCampaign({ campaignId: data?.id ?? '', body: { status: 'COMPLETION' } })
                    .unwrap()
                    .then(() => push('/campaign-creator/list'))
                }
                shadowSize="normal"
                textClass="text-main-text"
                title="キャンペーンのステータスを完了にする"
              />
            </div>
          )}
          {status === '公開中' && (
            <>
              <div className="w-[376px]  h-[56px]">
                <CButtonShadow
                  classBgColor="bg-white"
                  classRounded="rounded-[6px]"
                  classShadowColor="bg-main-text"
                  onClick={() =>
                    updateStatusCampaign({ campaignId: data?.id ?? '', body: { status: 'COMPLETION' } })
                      .unwrap()
                      .then(() => push('/campaign-creator/list'))
                  }
                  shadowSize="normal"
                  textClass="text-main-text"
                  title="キャンペーンのステータスを完了にする"
                />
              </div>
              <div className="w-[293px]  h-[56px]">
                <CButtonShadow
                  classBgColor="bg-main-text"
                  classRounded="rounded-[6px]"
                  classShadowColor="bg-white"
                  onClick={() => push({ query: { ...query, isChecking: true } })}
                  shadowSize="normal"
                  title="キャンペーン参加状況を確認"
                  type="submit"
                />
              </div>
            </>
          )}
          {status === '完了' && (
            <div className="w-[293px]  h-[56px]">
              <CButtonShadow
                classBgColor="bg-main-text"
                classRounded="rounded-[6px]"
                classShadowColor="bg-white"
                onClick={() => push({ query: { ...query, isChecking: true } })}
                shadowSize="normal"
                title="キャンペーン参加状況を確認"
                type="submit"
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}
Detail.defaultProps = {
  data: undefined,
};
export default Detail;
