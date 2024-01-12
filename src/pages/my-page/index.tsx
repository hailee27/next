import AuthCheck from '@/components/AuthCheck';
import AcountInfoCard from '@/components/my-page/AcountInfoCard';
import AuthInfoCard from '@/components/my-page/AuthInfoCard';
import RewardHistoryCard from '@/components/my-page/RewardHistoryCard';

export default function MyPage() {
  return (
    <AuthCheck>
      <div className=" w-full min-h-[100vh] overflow-x-hidden bg-[#D5FFFF]  py-[40px] px-[20px] flex flex-col gap-[16px]">
        <AcountInfoCard />
        <AuthInfoCard />
        <RewardHistoryCard />
      </div>
    </AuthCheck>
  );
}
