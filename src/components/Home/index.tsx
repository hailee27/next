import HeaderHomePage from './HeaderHomePage';
import TemplateCampaign from './TemplateCampaign';

function HomePage() {
  return (
    <div className="font-notoSans bg-white">
      <HeaderHomePage />
      <TemplateCampaign title="おすすめのキャンペーン" />
      <TemplateCampaign bgColor="#D5FFFF" title="おすすめのキャンペーン" />
      <TemplateCampaign title="おすすめのキャンペーン" />
    </div>
  );
}

export default HomePage;
