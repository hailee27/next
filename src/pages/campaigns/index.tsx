/* eslint-disable @typescript-eslint/no-explicit-any */
import CampaignCardItem from '@/components/CampaignCardItem';

import PaginationRouterControl from '@/components/common/BasicPaination/PaginationRouterControl';
import CButtonShadow from '@/components/common/CButtonShadow';
import LossSvg from '@/components/common/icons/LossSvg';
import useGetCampaigns from '@/hooks/useGetCampaigns';
// import { PAGINATION_PAGE_SIZE } from '@/utils/constant/enums';
import { Spin } from 'antd';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { isMobile } from 'react-device-detect';
import { useMediaQuery } from 'usehooks-ts';

export default function CampaignsPage() {
  const matchesMD = useMediaQuery('(min-width: 768px)');
  const PAGE_SIZE = isMobile ? 10 : 20;
  const { campaigns, total, isFetching } = useGetCampaigns({ pageSize: PAGE_SIZE });

  const router = useRouter();

  const orderBtnGroups = useMemo(() => {
    const urlOrderBy = router?.query?.orderBy;
    return [
      {
        label: '人気順',
        urlQuery: 'totalViews',
        isActive: urlOrderBy === 'totalViews' || !urlOrderBy,
      },
      {
        label: '新着順',
        urlQuery: 'startTime',
        isActive: urlOrderBy === 'startTime',
      },
      {
        label: '報酬額順',
        urlQuery: 'totalPrizeValue',
        isActive: urlOrderBy === 'totalPrizeValue',
      },
      {
        label: '終了間近',
        urlQuery: 'expiredTime',
        isActive: urlOrderBy === 'expiredTime',
      },
    ];
  }, [router?.query?.orderBy]);

  return (
    <div className="font-notoSans text-main-text min-h-screen px-[20px] py-[40px] xl:py-[100px] bg-[#D5FFFF] ">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-[8px] w-fit mx-auto">
        {orderBtnGroups.map((item) => (
          <div className="w-[126px] h-[51px] md:w-[172px] md:h-[56px]">
            <CButtonShadow
              classBgColor={item?.isActive ? 'bg-[#333]' : 'bg-white'}
              classShadowColor={item?.isActive ? 'bg-[#fff]' : 'bg-[#333]'}
              onClick={() => {
                router.push(`/campaigns?page=1&orderBy=${item?.urlQuery}`);
              }}
              textClass={clsx(' text-[13px] font-bold ', item?.isActive ? 'text-white' : 'text-[#333]')}
              title={item?.label}
              withIcon={
                item?.isActive
                  ? {
                      position: 'left',
                      icon: (
                        <svg fill="none" height="9" viewBox="0 0 12 9" width="12" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 4.5L3.5 7.5L11 1.5" stroke="#333333" strokeLinecap="round" strokeWidth="2" />
                          <path d="M1 4.5L3.5 7.5L11 1.5" stroke="white" strokeLinecap="round" strokeWidth="2" />
                        </svg>
                      ),
                    }
                  : undefined
              }
            />
          </div>
        ))}
      </div>
      <div className="h-[32px] xl:h-[80px]" />
      {/* <div className="grid grid-cols-[repeat(auto-fit,_335px)]  gap-[10px] justify-center md:max-w-[680px] xl:max-w-[1025px] xxl:max-w-[1370px] md:mx-auto">
        <CampaignCardItemSkeleton viewMode={matchesMD ? 'HAS_IMAGE' : 'NO_IMAGE'} />
        <CampaignCardItemSkeleton viewMode={matchesMD ? 'HAS_IMAGE' : 'NO_IMAGE'} />
        <CampaignCardItemSkeleton viewMode={matchesMD ? 'HAS_IMAGE' : 'NO_IMAGE'} />
        <CampaignCardItemSkeleton viewMode={matchesMD ? 'HAS_IMAGE' : 'NO_IMAGE'} />
      </div> */}
      <Spin spinning={isFetching}>
        {Array.isArray(campaigns) && campaigns?.length > 0 ? (
          <>
            <div className="grid grid-cols-[repeat(auto-fit,_335px)]  gap-[10px] justify-center md:max-w-[680px] xl:max-w-[1025px] xxl:max-w-[1370px] md:mx-auto">
              {campaigns?.map((item) => (
                <CampaignCardItem item={item as any} key={item.id} viewMode={matchesMD ? 'HAS_IMAGE' : 'NO_IMAGE'} />
              ))}
            </div>
            <div className="h-[32px] xxl:h-[80px]" />
            <PaginationRouterControl pageSize={PAGE_SIZE} total={total ?? 0} />
          </>
        ) : (
          <div className="pt-[100px] flex flex-col items-center justify-center gap-4">
            <LossSvg />
            <p className="text-[20px] font-bold text-center">データがありません</p>

            <div className="h-[53px] w-[165px] mx-auto mt-[16px]">
              <CButtonShadow
                onClick={() => {
                  router.push('/');
                }}
                title="HOMEに戻る"
                type="button"
              />
            </div>
          </div>
        )}
      </Spin>
    </div>
  );
}
