/* eslint-disable @typescript-eslint/no-explicit-any */
import CampaignCardItem from '@/components/CampaignCardItem';
import PaginationRouterControl from '@/components/common/BasicPaination/PaginationRouterControl';
import SelectShadow from '@/components/common/BasicSelect/SelectShadow';
import { CampaignApi, ListCampaignParams, TypeCampaign } from '@/redux/endpoints/campaign';
import { wrapper } from '@/redux/store';
import { PAGINATION_PAGE_SIZE } from '@/utils/constant/enums';
import { Form } from 'antd';
import { useRouter } from 'next/router';

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
    apiRequest.orderBy = JSON.stringify({
      [`${orderBy}`]: 'desc',
    });
  }
  const { data: dataCampaigns } = await store.dispatch(CampaignApi.endpoints.getListCampaign.initiate(apiRequest));

  return {
    props: {
      campaigns: dataCampaigns?.campaigns ?? null,
      totals: dataCampaigns?.total ?? null,
    },
  };
});

export default function CampaignsPage({ campaigns, totals }: ICampaignsPage) {
  const router = useRouter();

  return (
    <div className="font-notoSans text-main-text min-h-screen px-[20px] py-[40px] xl:py-[100px] bg-[#D5FFFF] ">
      <div className="max-w-[800px] mx-auto">
        <Form
          onValuesChange={(e, v) => {
            if (v?.orderBy) {
              router.push({ query: { ...router.query, orderBy: v?.orderBy } });
            }
          }}
        >
          <Form.Item initialValue={router?.query?.orderBy ?? 'totalViews'} name="orderBy" noStyle>
            <SelectShadow
              options={[
                { value: 'totalViews', label: '人気順' },
                { value: 'startTime', label: '新着順' },
                {
                  value: 'totalPrizeValue',
                  label: '報酬額順',
                },
              ]}
            />
          </Form.Item>
        </Form>
      </div>
      <div className="h-[32px] xl:h-[80px]" />
      <div className="grid grid-cols-1 gap-[16px] xl:gap-[24px] md:grid-cols-2 xl:grid-cols-3 max-w-[1053px] mx-auto">
        {Array.isArray(campaigns) && campaigns?.length > 0
          ? campaigns?.map((item) => <CampaignCardItem item={item as any} key={item.id} viewMode="NO_IMAGE" />)
          : ''}
      </div>
      <PaginationRouterControl countItems={campaigns?.length ?? 0} total={totals ?? 0} />
    </div>
  );
}
