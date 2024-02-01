/* eslint-disable @typescript-eslint/no-explicit-any */
import CampaignCardItem from '@/components/CampaignCardItem';
import PaginationRouterControl from '@/components/common/BasicPaination/PaginationRouterControl';
import CButtonShadow from '@/components/common/CButtonShadow';
import { CampaignApi, ListCampaignParams, TypeCampaign } from '@/redux/endpoints/campaign';
import { wrapper } from '@/redux/store';
import { PAGINATION_PAGE_SIZE } from '@/utils/constant/enums';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useMediaQuery } from 'usehooks-ts';

interface ICampaignsPage {
  campaigns: TypeCampaign[] | null;
  totals: number | null;
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ query }) => {
  const { page: pageString, orderBy } = query;
  const page = parseInt((pageString ?? '1') as string, 10);

  const apiRequest: ListCampaignParams = {
    orderBy: JSON.stringify({
      totalViews: 'desc',
    }),
    skip: PAGINATION_PAGE_SIZE * (page - 1),
    take: PAGINATION_PAGE_SIZE,
    token: 'user',
  };
  if (orderBy) {
    if (orderBy === 'expiredTime' || orderBy === 'totalPrizeValue') {
      apiRequest.orderBy = JSON.stringify({
        [`${orderBy}`]: {
          sort: orderBy === 'expiredTime' ? 'asc' : 'desc',
          nulls: 'last',
        },
      });
    } else {
      apiRequest.orderBy = JSON.stringify({
        [`${orderBy}`]: 'desc',
      });
    }
  }
  const { data: dataCampaigns } = await store.dispatch(CampaignApi.endpoints.getListCampaign.initiate(apiRequest));
  // const res = await store.dispatch(CampaignApi.endpoints.getListCampaign.initiate(apiRequest));
  // console.log(res);
  return {
    props: {
      campaigns: dataCampaigns?.campaigns ?? null,
      totals: dataCampaigns?.total ?? null,
    },
  };
});

export default function CampaignsPage({ campaigns, totals }: ICampaignsPage) {
  const router = useRouter();
  const matchesMD = useMediaQuery('(min-width: 768px)');

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
      <div />
      <div className="h-[32px] xl:h-[80px]" />
      <div className="grid grid-cols-[repeat(auto-fit,_335px)]  gap-[10px] justify-center md:max-w-[680px] xxl:max-w-[1370px] md:mx-auto">
        {Array.isArray(campaigns) && campaigns?.length > 0
          ? campaigns?.map((item) => (
              <CampaignCardItem item={item as any} key={item.id} viewMode={matchesMD ? 'HAS_IMAGE' : 'NO_IMAGE'} />
            ))
          : ''}
      </div>
      <div className="h-[32px] xxl:h-[80px]" />
      <PaginationRouterControl countItems={campaigns?.length ?? 0} total={totals ?? 0} />
    </div>
  );
}
