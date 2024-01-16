/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import ListCampaignCardItem from '@/components/CampaignCardItem/ListCampaignCardItem';
import BasicPaination from '@/components/common/BasicPaination';
import SelectShadow from '@/components/common/BasicSelect/SelectShadow';
import { CampaignApi, TypeCampaign } from '@/redux/endpoints/campaign';
import { wrapper } from '@/redux/store';
import { Form } from 'antd';
import { useRouter } from 'next/router';

interface ICampaignsPage {
  campaigns: TypeCampaign[] | null;
  totals: number | null;
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ query, req, res }) => {
  const { data: dataCampaigns } = await store.dispatch(
    CampaignApi.endpoints.getListCampaign.initiate({
      skip: 0,
      take: 20,
      token: 'user',
    })
  );

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
    <div className="font-notoSans text-main-text min-h-screen px-[20px] py-[40px] bg-[#D5FFFF] ">
      <Form onValuesChange={(e, v) => router.push({ query: v })}>
        <Form.Item initialValue="人気順" name="filter">
          <SelectShadow
            options={[
              { label: '人気順', value: '人気順' },
              { label: '新着順', value: '新着順' },
              { label: '報酬額順', value: '報酬額順' },
            ]}
          />
        </Form.Item>
      </Form>
      <div className="flex flex-col space-y-[16px] pb-[32px] ">
        {Array.isArray(campaigns) && campaigns?.length > 0
          ? campaigns?.map((item) => <ListCampaignCardItem item={item as any} key={item.id} />)
          : ''}
      </div>
      <BasicPaination total={20} />
    </div>
  );
}
