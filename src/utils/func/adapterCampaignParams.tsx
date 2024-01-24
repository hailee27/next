import { QuestsParams } from '@/redux/endpoints/campaign';
import { TypeResponseFormCampaign } from '@/types/campaign.type';
import { omitBy } from 'lodash';

export default function adapterCampaignParams(
  data: TypeResponseFormCampaign,
  typeWinner: 'AUTO_PRIZEE_DRAW' | 'MANUAL_SELECTION' | undefined,
  status: 'DRAFT' | 'WAITING_FOR_PURCASE' | 'UNDER_REVIEW' | 'WAITING_FOR_PUBLICATION' | 'PUBLIC' | 'COMPLETION'
): QuestsParams {
  switch (typeWinner) {
    case 'AUTO_PRIZEE_DRAW':
      return omitBy(
        {
          title: data.campainName ?? '',
          category: data.category ?? '',
          dontSetExpiredTime: String(data.noDate ?? false),
          startTime: data.startDate ?? '',
          expiredTime: data.endDate,
          methodOfselectWinners: typeWinner,
          totalNumberOfUsersAllowedToWork: String(data.numberOfParticipants),
          numberOfPrizes: String(data.totalTicket),
          totalPrizeValue: String(data.totalReWard),
          settingForNotWin: String(data.statusCampaign ?? false),
          description: data.explanatoryText,
          campaignImage: data.thumbnail,
          status,
        },
        (value) => value === undefined || value === null
      );
    default:
      return omitBy(
        {
          title: data.campainName ?? '',
          category: data.category ?? '',
          dontSetExpiredTime: String(data.noDate ?? false),
          startTime: data.startDate ?? '',
          expiredTime: data.endDate,
          methodOfselectWinners: typeWinner,
          description: data.explanatoryText,
          noteReward: data.compensationSummary ?? 'NONE',
          campaignImage: data.thumbnail,
          status,
        },
        (value) => value === undefined || value === null
      );
  }
}
export const adapterDataTask = (data: TypeResponseFormCampaign) =>
  [
    {
      type: data.requireTask?.platForm ?? 'twitter',
      taskActionType: data.requireTask?.type,
      taskTemplate: { userName: 'NONE', link: 'NONE', config: { name: data.requireTask } },
    },
  ].concat(
    Object.values(data?.optionTasks ?? {}).map((e) => ({
      type: e.platForm,
      taskActionType: e?.type,
      taskTemplate: { userName: 'NONE', link: 'NONE', config: { name: e } },
    }))
  );

export const adapterDataReWard = (data: TypeResponseFormCampaign) =>
  Object.values(data?.reWard ?? {}).map((e, i) => ({
    type: e.receivingMethod.amazon ? 'AMAZON_GIFT' : 'PAYPAY_GIFT',
    index: i + 1,
    amountOfMoney: Number(e.money),
    numberOfWinningTicket: Number(e.tiketWinning),
  }));
