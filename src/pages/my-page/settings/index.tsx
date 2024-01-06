import AcountInfoCard from '@/components/my-page/AcountInfoCard';
import AuthInfoCard from '@/components/my-page/AuthInfoCard';
import RewardHistoryCard from '@/components/my-page/RewardHistoryCard';
import React from 'react';

export default function SettingsPage() {
  return (
    <div className=" w-full min-h-[100vh] overflow-x-hidden bg-[#D5FFFF]  py-[40px] px-[20px] flex flex-col gap-[16px]">
      <AcountInfoCard />
      <AuthInfoCard />
      <RewardHistoryCard />
    </div>
  );
}
