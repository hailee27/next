import { api } from '../api';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    postQuests: build.mutation<QuestsResponse, QuestsParams>({
      query: (queryArg) => {
        const body = new FormData();
        Object.entries(queryArg).forEach(([key, value]) => body.append(`${key}`, value));
        return {
          url: '/quests',
          method: 'POST',
          body,
          // headers: {
          //   'Content-Type': 'multipart/form-data;',
          // },
        };
      },
    }),
  }),
});

export type QuestsResponse = void;
export type QuestsParams = {
  title: string;
  category: string;
  description: string;
  startTime: string;
  expiredTime: string;
  dontSetExpiredTime: string;
  tasks: string;
  methodOfselectWinners: string;
  totalNumberOfUsersAllowedToWork: string;
  numberOfPrizes: string;
  totalPrizeValue: string;
  questReward: string;
  note: string;
  settingForNotWin: string;
  questImage: string;
};

export { injectedRtkApi as CampaignApi };
export const { usePostQuestsMutation } = injectedRtkApi;
