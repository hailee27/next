import { TypeCampaign } from '@/redux/endpoints/campaign';
import HeaderHomePage from './HeaderHomePage';
import TemplateCampaign from './TemplateCampaign';

interface IPageProps {
  campaignsOrderByViews: TypeCampaign[] | null;
  campaignsOrderByStartTime: TypeCampaign[] | null;
  campaignsOrderByTotalPrizeValue: TypeCampaign[] | null;
}

function HomePage({ campaignsOrderByViews, campaignsOrderByStartTime, campaignsOrderByTotalPrizeValue }: IPageProps) {
  return (
    <div className="font-notoSans bg-white">
      <HeaderHomePage />
      {campaignsOrderByViews && campaignsOrderByViews?.length > 0 ? (
        <TemplateCampaign
          listCampaign={campaignsOrderByViews}
          title="おすすめのキャンペーン"
          viewMoreLink="/campaigns?orderBy=totalViews"
        />
      ) : (
        ''
      )}
      {campaignsOrderByStartTime && campaignsOrderByStartTime?.length > 0 ? (
        <TemplateCampaign
          bgColor="#D5FFFF"
          listCampaign={campaignsOrderByStartTime}
          title="新着キャンペーン"
          viewMoreLink="/campaigns?orderBy=startTime"
        />
      ) : (
        ''
      )}
      {campaignsOrderByTotalPrizeValue && campaignsOrderByTotalPrizeValue?.length > 0 ? (
        <TemplateCampaign
          listCampaign={campaignsOrderByTotalPrizeValue}
          title="高額報酬キャンペーン"
          viewMoreLink="/campaigns?orderBy=totalPrizeValue"
        />
      ) : (
        ''
      )}
    </div>
  );
}

export default HomePage;
