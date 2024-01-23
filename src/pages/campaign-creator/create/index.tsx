import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { ConditionPage } from '@/components/CampaignCreate/ConditionPage';
import CampaignCreation from '@/components/CampaignCreate/CampaignCreation';

// const CampaignCreation = dynamic(() => import('@/components/CampaignCreate/CampaignCreation'), {
//   ssr: false,
//   loading: () => (
//     <div className="flex items-center justify-center h-full">
//       <Spin />
//     </div>
//   ),
// });
function CampaignCreatePage() {
  // const { push } = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  if (user?.companyId == null) {
    return <ConditionPage />;
  }
  return <CampaignCreation />;
}

export default CampaignCreatePage;
