/* eslint-disable react/no-danger */
/* eslint-disable no-nested-ternary */

import { RootState } from '@/redux/store';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { CampaignDetailContext } from './CampainContext';
import Completion from './Completion';
import InfoCampaign from './InfoCampaign';
import Loser from './Loser';
import Winner from './Winner';

export default function CampaignDetail() {
  const { campaignDetail, viewType } = useContext(CampaignDetailContext);
  const { accessToken, user } = useSelector((state: RootState) => state.auth);

  const baseCondition = Boolean(
    accessToken &&
      campaignDetail?.UserClaimCampaign &&
      Array.isArray(campaignDetail?.UserClaimCampaign) &&
      campaignDetail?.UserClaimCampaign?.length
  );

  if (viewType === 'detail') {
    return <InfoCampaign />;
  }
  if (viewType === 'losing' && baseCondition && campaignDetail?.UserClaimCampaign?.[0]?.award?.isWin === 'false') {
    return <Loser />;
  }
  if (viewType === 'completion' && baseCondition && campaignDetail?.UserClaimCampaign?.[0]?.award?.isWin === 'true') {
    return <Completion />;
  }
  if (
    viewType === 'winning' &&
    baseCondition &&
    campaignDetail?.UserClaimCampaign?.[0]?.userId === user?.id &&
    (campaignDetail?.UserClaimCampaign?.[0]?.award?.isWin === null ||
      campaignDetail?.UserClaimCampaign?.[0]?.award?.isWin === 'true')
  ) {
    return <Winner />;
  }
  return <div />;
}
