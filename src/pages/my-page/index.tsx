import AuthCheck from '@/components/AuthCheck';
import AcountInfoCard from '@/components/my-page/AcountInfoCard';
import AuthInfoCard from '@/components/my-page/AuthInfoCard';
import RewardHistoryCard from '@/components/my-page/RewardHistoryCard';

export default function MyPage() {
  return (
    <AuthCheck>
      <div className=" container-min-height pb-[56px] w-full  overflow-x-hidden bg-[#D5FFFF]  py-[40px]  px-[20px] ">
        <div className="mx-auto max-w-[335px] flex flex-col gap-[16px]">
          <AcountInfoCard />
          <AuthInfoCard />
          <RewardHistoryCard />
        </div>
      </div>
    </AuthCheck>
  );
}
