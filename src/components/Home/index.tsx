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
      <TemplateCampaign
        listCampaign={campaignsOrderByViews}
        title="おすすめのキャンペーン"
        viewMoreLink="/campaigns?orderBy=totalViews"
      />
      <TemplateCampaign
        bgColor="#D5FFFF"
        listCampaign={campaignsOrderByStartTime}
        title="新着キャンペーン"
        viewMoreLink="/campaigns?orderBy=startTime"
      />
      <TemplateCampaign
        listCampaign={campaignsOrderByTotalPrizeValue}
        title="高額報酬キャンペーン"
        viewMoreLink="/campaigns?orderBy=totalPrizeValue"
      />
    </div>
  );
}

export default HomePage;
