/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { TypeCampaign } from '@/redux/endpoints/campaign';
import { Image } from 'antd';
import { useRouter } from 'next/router';
import moment from 'moment';
import CButtonClassic from '../common/CButtonClassic';
import CCardShadow from '../common/CCardShadow';
import ArrowDown from '../common/icons/ArrowDown';

function ListCampaignCardItem({ item }: { item: TypeCampaign }) {
  const router = useRouter();

  const sortCampaignReward = Array.isArray(item?.CampaignReward)
    ? item?.CampaignReward?.sort((a, b) => a.amountOfMoney - b.amountOfMoney)
    : [];

  return (
    <CCardShadow onClickCard={() => router.push(`/campaigns/${item.id}`)}>
      <div className="p-[24px] flex flex-col space-y-[16px]">
        <div className="flex items-center space-x-[8px]">
          <Image
            alt="company logo"
            className="rounded-full object-fill"
            crossOrigin="anonymous"
            height="32px"
            preview={false}
            src={item?.company?.image?.imageUrl ?? '/assets/images/ImagePlaceholder.png'}
            width="32px"
          />
          <span className="text-[14px] font-bold">{item?.company?.code ?? '-'}</span>
        </div>
        <div className="flex flex-col space-y-[8px]">
          <h2 className="text-[16px] font-bold">{item?.title ?? '-'}</h2>
          {item?.methodOfselectWinners === 'MANUAL_SELECTION' && (
            <div
              className="text-[13px] line-clamp-2 text-ellipsis"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: item?.description?.replace(/\r?\n/g, '<br/>') ?? '' }}
            />
          )}
          <div className="text-[13px] text-[#777] flex flex-col space-y-[6px]">
            {item.methodOfselectWinners !== 'MANUAL_SELECTION' && (
              <>
                <span>
                  報酬：
                  {sortCampaignReward?.length >= 2
                    ? `${sortCampaignReward[0]?.amountOfMoney ?? '--'}円〜${
                        sortCampaignReward[sortCampaignReward.length - 1]?.amountOfMoney ?? '--'
                      }円`
                    : sortCampaignReward?.length === 1
                      ? `${sortCampaignReward[0]?.amountOfMoney ?? '--'}円`
                      : '--'}
                </span>
                <span>当選者枠：{item?.numberOfPrizes ?? '---'}名</span>
              </>
            )}
            <span>
              報酬：
              <span className="font-montserrat">
                {moment(item?.startTime)?.isValid() ? moment(item?.startTime)?.format('MM/DD hh:mm') : '--/-- --:--'}
                <span> 〜 </span>
                {moment(item?.expiredTime)?.isValid()
                  ? moment(item?.expiredTime)?.format('MM/DD hh:mm')
                  : '--/-- --:--'}
              </span>
            </span>
          </div>
        </div>
        <div className="min-w-[279px] h-[47px]">
          <CButtonClassic
            customClassName="!bg-btn-gradation !text-[14px] !text-main-text"
            tagLabel={item.methodOfselectWinners !== 'MANUAL_SELECTION' ? '即時抽選' : ''}
            title="キャンペーンの詳細をみる"
            withIcon={{
              position: 'right',
              icon: <ArrowDown className="rotate-[-90deg]" />,
            }}
          />
        </div>
      </div>
    </CCardShadow>
  );
}

export default ListCampaignCardItem;
