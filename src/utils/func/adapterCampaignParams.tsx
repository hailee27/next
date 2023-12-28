import { QuestsParams } from '@/redux/endpoints/campaign';
import { TypeResponseFormCampaign } from '@/types/campaign.type';

export default function adapterCampaignParams(
  data: TypeResponseFormCampaign,
  typeWinner: 'AUTO_PRIZEE_DRAW' | 'MANUAL_SELECTION' | undefined
): QuestsParams {
  switch (typeWinner) {
    case 'AUTO_PRIZEE_DRAW':
      return {
        title: data.campainName ?? '',
        category: data.category ?? '',
        dontSetExpiredTime: String(data.noDate) ?? false,
        startTime: data.startDate ?? '',
        expiredTime: data.endDate ?? 'none',
        tasks: JSON.stringify(
          [
            {
              type: data.requireTask?.platForm,
              taskActionType: data.requireTask?.type,
              taskTemplate: { userName: 'NONE', link: 'NONE', config: { name: data.requireTask } },
            },
          ].concat(
            Object.values(data?.optionTasks ?? {}).map((e) => ({
              type: e.platForm,
              taskActionType: e?.type,
              taskTemplate: { userName: 'NONE', link: 'NONE', config: { name: e } },
            }))
          )
        ),
        methodOfselectWinners: typeWinner,
        totalNumberOfUsersAllowedToWork: String(data.numberOfParticipants),
        campaignReward: JSON.stringify(
          Object.values(data?.reWard ?? {}).map((e, i) => ({
            type: e.receivingMethod.amazon ? 'AMAZON_GIFT' : 'PAYPAY_GIFT',
            index: i + 1,
            amountOfMoney: Number(e.money),
            numberOfWinningTicket: Number(e.tiketWinning),
          }))
        ),
        numberOfPrizes: String(data.totalTicket),
        totalPrizeValue: String(data.totalReWard),
        settingForNotWin: String(data.statusCampaign) ?? false,
        description: data.explanatoryText ?? '',
        // noteReward: data.compensationSummary ?? 'NONE',
        campaignImage: data.thumbnail,
      };
    default:
      return {
        title: data.campainName ?? '',
        category: data.category ?? '',
        dontSetExpiredTime: String(data.noDate) ?? false,
        startTime: data.startDate ?? '',
        expiredTime: data.endDate ?? ' ',
        tasks: JSON.stringify(
          [
            {
              type: data.requireTask?.platForm,
              taskActionType: data.requireTask?.type,
              taskTemplate: { userName: 'NONE', link: 'NONE', config: { name: data.requireTask } },
            },
          ].concat(
            Object.values(data?.optionTasks ?? {}).map((e) => ({
              type: e.platForm,
              taskActionType: e?.type,
              taskTemplate: { userName: 'NONE', link: 'NONE', config: { name: e } },
            }))
          )
        ),
        methodOfselectWinners: typeWinner,
        // totalNumberOfUsersAllowedToWork: String(data.numberOfParticipants),
        campaignReward: JSON.stringify(
          Object.values(data?.reWard ?? {}).map((e, i) => ({
            type: e.receivingMethod.amazon ? 'AMAZON_GIFT' : 'PAYPAY_GIFT',
            index: i + 1,
            amountOfMoney: e.money,
            numberOfWinningTicket: Number(e.tiketWinning),
          }))
        ),
        // numberOfPrizes: String(data.totalTicket),
        // totalPrizeValue: String(data.totalReWard),
        // settingForNotWin: String(data.statusCampaign) ?? false,
        description: data.explanatoryText ?? '',
        noteReward: data.compensationSummary ?? 'NONE',
        campaignImage: data.thumbnail,
      };
  }
}
