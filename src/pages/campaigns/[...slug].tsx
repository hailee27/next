/* eslint-disable max-lines */
/* eslint-disable react/no-danger */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import CampaignDetail from '@/components/CampaignDetail';
import Completion from '@/components/CampaignDetail/Completion';
import Loser from '@/components/CampaignDetail/Loser';
import RecommedCampaignsSection from '@/components/CampaignDetail/RecommedCampaignsSection';
import Winner from '@/components/CampaignDetail/Winner';
import { CampaignApi, ListCampaignParams, TypeCampaign } from '@/redux/endpoints/campaign';
import { RootState, wrapper } from '@/redux/store';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ params }) => {
  console.log('paramssss', params);
  if (
    !Array.isArray(params?.slug) ||
    (Array.isArray(params?.slug) && params?.slug && params?.slug?.length > 2) ||
    (Array.isArray(params?.slug) &&
      params?.slug &&
      params?.slug?.length === 2 &&
      ['completion', 'winning', 'losing']?.find((i) => params?.slug?.[1] === i) === undefined)
  ) {
    return {
      notFound: true,
    };
  }

  const id = params?.slug?.[0] ? params?.slug?.[0] : '';
  const apiRequest: ListCampaignParams = {
    orderBy: JSON.stringify({
      totalViews: 'desc',
    }),
    skip: 0,
    take: 3,
    token: 'user',
    except: id as string,
  };

  const { data: dataCampaigns } = await store.dispatch(CampaignApi.endpoints.getListCampaign.initiate(apiRequest));

  const { data: dataCampaign } = await store.dispatch(
    CampaignApi.endpoints.getDetailCampaign.initiate({
      campaignId: id as string,
      token: 'user',
    })
  );
  if (!dataCampaign) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      viewType: params?.slug?.[1] ?? 'detail',
      campaign: dataCampaign ?? null,
      campaignsRecommend: dataCampaigns?.campaigns ?? null,
    },
  };
});

// eslint-disable-next-line max-lines-per-function
export default function CampaignDetailPage({
  campaign,
  campaignsRecommend,
  viewType,
}: {
  campaign: TypeCampaign | null;
  campaignsRecommend: TypeCampaign[] | null;
  viewType: 'completion' | 'winning' | 'losing' | 'detail';
}) {
  // const [isOpenModalSetupAuthEmail, setIsOpenModalSetupAuthEmail] = useState(false);
  const { accessToken } = useSelector((state: RootState) => state.auth);

  const router = useRouter();

  console.log('viewType', viewType);

  const contentRender = useMemo(() => {
    switch (viewType) {
      case 'completion':
        return <Completion />;
      case 'winning':
        return <Winner />;
      case 'losing':
        return <Loser />;
      case 'detail':
      default:
        return <CampaignDetail campaign={campaign} />;
    }
  }, [viewType]);

  if (viewType === 'winning' && !accessToken) {
    router.push('/auth/sign-in/campaign-implementer');
  } else {
    return (
      <div className="font-notoSans">
        {contentRender}
        {Array.isArray(campaignsRecommend) && campaignsRecommend?.length > 0 ? (
          <RecommedCampaignsSection campaignsRecommend={campaignsRecommend} />
        ) : (
          ''
        )}

        <div className="h-[56px]" />

        {/* <CModalWapper
        bottomBtnTitle="登録"
        bottomBtnType="OK"
        isOpen={isModalOpen}
        modalWidth={368}
        onCancel={handleCancel}
        onOk={handleCancel}
      >
        <div>
          <h3 className="text-[24px] font-bold ">メール・パスワード登録</h3>
          <div className="h-[24px]" />
          <p>キャンペーンの応募にはメールアドレス・パスワードの登録が必要になります。</p>
        </div>
      </CModalWapper> */}
      </div>
    );
  }
}
