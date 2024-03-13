import TableAll from '@/components/CampaignCreate/CampaignList/TableAll';
import CButtonShadow from '@/components/common/CButtonShadow';
import FileIcon from '@/components/common/icons/FileIcon';
import { useRouter } from 'next/router';
import React from 'react';

function PageCompleted() {
  const router = useRouter();
  return (
    <div className="xl:px-[48px] px-[20px] pb-[77px]">
      <div className="flex py-[32px] w-full justify-between border-b-2 border-[#2D3648] max-h-[112px]">
        <span className="text-[32px] font-bold">キャンペーン一覧</span>
        <div className="w-[165px]  h-[56px]">
          <CButtonShadow
            classBgColor="bg-main-text"
            classRounded="rounded-[6px]"
            classShadowColor="bg-white"
            onClick={() => router.push('/campaign-creator/create')}
            shadowSize="normal"
            title="新規作成"
            withIcon={{ position: 'left', icon: <FileIcon color="#fff" /> }}
          />
        </div>
      </div>
      <div className="pt-[28px]">
        <TableAll status="COMPLETION" />
      </div>
    </div>
  );
}

export default PageCompleted;
