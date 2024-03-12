import CampaignCreatorService from '@/components/terms-of-service/CampaignCreatorService';
import CampaignImplementerService from '@/components/terms-of-service/CampaignImplementerService';
import { wrapper } from '@/redux/store';
import React from 'react';

export const getServerSideProps = wrapper.getServerSideProps(() => async ({ query }) => {
  let viewType: string = 'default';
  if (query?.view === 'creator' || query?.view === 'implementer') {
    viewType = query.view;
  }

  return {
    props: {
      viewType,
    },
  };
});

function TermsOfServicePage({ viewType }: { viewType: 'default' | 'creator' | 'implementer' }) {
  if (viewType === 'creator') {
    return (
      <>
        <CampaignCreatorService />
        <div className="text-[13px] text-[#777] flex flex-col items-end mt-[24px] max-w-[820px] mx-auto">
          <div>以上</div>
          <div>2024年4月1日制定</div>
        </div>
      </>
    );
  }
  if (viewType === 'implementer') {
    return (
      <>
        <CampaignImplementerService />
        <div className="text-[13px] text-[#777] flex flex-col items-end mt-[24px] max-w-[820px] mx-auto">
          <div>以上</div>
          <div>2024年4月1日制定</div>
        </div>
      </>
    );
  }
  return (
    <>
      <CampaignCreatorService />
      <div className="h-[24px]" />
      <CampaignImplementerService />
      <div className="text-[13px] text-[#777] flex flex-col items-end mt-[24px] max-w-[820px] mx-auto">
        <div>以上</div>
        <div>2024年4月1日制定</div>
      </div>
    </>
  );
}

export default TermsOfServicePage;
