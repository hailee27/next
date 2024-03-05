import { QuestsParams } from '@/redux/endpoints/campaign';
import { TypeResponseFormCampaign } from '@/types/campaign.type';

export default function adapterCampaignParams(
  data: TypeResponseFormCampaign,
  typeWinner: 'AUTO_PRIZEE_DRAW' | 'MANUAL_SELECTION' | undefined,
  status: 'DRAFT' | 'WAITING_FOR_PURCASE' | 'UNDER_REVIEW' | 'WAITING_FOR_PUBLICATION' | 'PUBLIC' | 'COMPLETION'
): QuestsParams {
  switch (typeWinner) {
    case 'AUTO_PRIZEE_DRAW':
      return {
        title: data.campainName ?? '',
        category: data.category ?? '',
        setExpiredTime: String(data.noDate ?? false),
        startTime: data.startDate,
        expiredTime: data.noDate ? undefined : data.endDate,
        methodOfselectWinners: typeWinner,
        totalNumberOfUsersAllowedToWork: String(data.numberOfParticipants ?? undefined),
        numberOfPrizes: String(data.totalTicket),
        totalPrizeValue: String(data.totalReWard),
        settingForNotWin: String(data.statusCampaign ?? false),
        description: data.explanatoryText,
        campaignImage: data.thumbnail,
        status,
      };
    default:
      return {
        title: data.campainName ?? '',
        category: data.category ?? '',
        setExpiredTime: String(data.noDate ?? false),
        startTime: data.startDate,
        expiredTime: data.noDate ? undefined : data.endDate,
        methodOfselectWinners: typeWinner,
        description: data.explanatoryText,
        noteReward: data.compensationSummary ?? 'NONE',
        campaignImage: data.thumbnail,
        status,
      };
  }
}
export const adapterDataTask = (data: TypeResponseFormCampaign) =>
  [
    {
      type: data.requireTask?.platForm ?? 'twitter',
      taskActionType: data.requireTask?.type,
      taskId: data.requireTask?.taskId,
      taskTemplate: { userName: 'NONE', link: 'NONE', config: { ...data.requireTask, requireTask: true } },
    },
  ].concat(
    Object.values(data?.optionTasks ?? {}).map((e) => ({
      type: e.platForm,
      taskActionType: e?.type,
      taskId: e.taskId,
      taskTemplate: { userName: 'NONE', link: 'NONE', config: { ...e, requireTask: false } },
      isRequired: e.isRequiredTask,
      point: Number(e.pointsAwarded),
    }))
  );
export const adapterNewTask = (data: TypeResponseFormCampaign) =>
  Object.values(data?.optionTasks ?? {})
    .map((e) => ({
      type: e.platForm,
      taskActionType: e?.type,
      taskId: e.taskId,
      taskTemplate: { userName: 'NONE', link: 'NONE', config: { ...e, requireTask: false } },
    }))
    .filter((v) => !v.taskId);

export const adapterDataReWard = (data: TypeResponseFormCampaign) =>
  Object.values(data?.reWard ?? {}).map((e, i) => ({
    rewardId: e.reWardId ? Number(e.reWardId) : undefined,
    type: e.receivingMethod.amazon ? 'AMAZON_GIFT' : 'PAYPAY_GIFT',
    index: i + 1,
    amountOfMoney: Number(e.money),
    numberOfWinningTicket: Number(e.tiketWinning),
  }));
