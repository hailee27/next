import { api } from '../api';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    postQuests: build.mutation<QuestsResponse, QuestsParams>({
      query: (queryArg) => {
        const body = new FormData();
        Object.entries(queryArg).forEach(([key, value]) => body.append(`${key}`, value));
        return {
          url: '/campaigns',
          method: 'POST',
          body,
          // headers: {
          //   'Content-Type': 'multipart/form-data;',
          // },
        };
      },
    }),
    getListCampaign: build.query<ListCampaignResponse, ListCampaignParams>({
      query: (queryArg) => ({
        url: '/campaigns',
        method: 'GET',
        params: queryArg,
      }),
    }),
    getDetailCampaign: build.query<DetailCampaignResponse, DetailCampaignParams>({
      query: (queryArg) => {
        const config: {
          url: string;
          method: string;
          params?: {
            [x: string]: string;
          };
        } = {
          url: `/campaigns/${queryArg.campaignId}`,
          method: 'GET',
        };
        if (queryArg?.token === 'user') {
          config.params = {
            token: queryArg?.token,
          };
        }
        return config;
      },
    }),
    postCampaignDraft: build.mutation<QuestsResponse, QuestsParams>({
      query: (queryArg) => {
        const body = new FormData();
        Object.entries(queryArg).forEach(([key, value]) => body.append(`${key}`, value));
        return {
          url: '/campaigns/draft',
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

export type DetailCampaignResponse = TypeCampaign;
export type DetailCampaignParams = {
  campaignId: string;
  token?: 'user';
};

export type TypeCampaignReward = {
  id: string | null;
  title: string | null;
  type: string;
  campaignId: string;
  index: number;
  amountOfMoney: number;
  numberOfWinningTicket: number;
  updatedAt: string;
  deleteAt: string | null;
  createdAt: string;
};
export type TypeTask = {
  id: number;
  campaignId: string;
  type: string;
  taskActionType: string | null;
  taskTemplateId: number;
  updatedAt: string;
  createdAt: string;
  taskTemplate: {
    id: number;
    userName: string;
    extra: string | null;
    config: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      name: any;
    };
    link: string;
    quote: string | null;
    required: boolean;
    updatedAt: string;
    createdAt: string;
  };
};

export type TypeCampaign = {
  id: string;
  category: string;
  title: string;
  description: string;
  imageId: number;
  priority: number;
  createdUserId: number;
  maxTimeUserClaim: number;
  claimEndTime: string | null;
  expiredTime: string;
  startTime: string;
  dontSetExpiredTime: boolean;
  methodOfselectWinners: 'AUTO_PRIZEE_DRAW' | 'MANUAL_SELECTION';
  totalNumberOfUsersAllowedToWork: number;
  numberOfPrizes: number;
  totalPrizeValue: number;
  settingForNotWin: boolean;
  noteReward: string | null;
  updatedAt: string;
  createdAt: string;
  communityId: string | null;
  image: {
    id: number;
    uploadedBy: string | null;
    uploadAt: string;
    deleteFlg: boolean;
    createdAt: string;
    updatedAt: string;
    imageUrl: string;
  };
  CampaignReward: TypeCampaignReward[];
  Task: TypeTask[];
  company?: {
    code: string;
    name: string;
    image: {
      id: number;
      imageUrl: string;
    };
  };
};
export type ListCampaignResponse = {
  campaigns: TypeCampaign[];
  total: number;
};
export type ListCampaignParams = {
  skip: number;
  take: number;
  where?: string;
  orderBy?: string;
  q?: string;
  include?: string;
  token?: 'user';
  except?: string;
};
export type QuestsResponse = void;
export type QuestsParams = {
  title?: string;
  category?: string;
  description?: string;
  startTime?: string;
  expiredTime?: string;
  dontSetExpiredTime?: string;
  tasks?: string;
  methodOfselectWinners?: string;
  totalNumberOfUsersAllowedToWork?: string;
  numberOfPrizes?: string;
  totalPrizeValue?: string;
  campaignReward?: string;
  noteReward?: string;
  settingForNotWin?: string;
  campaignImage?: string;
};

export { injectedRtkApi as CampaignApi };
export const {
  usePostQuestsMutation,
  usePostCampaignDraftMutation,
  useGetListCampaignQuery,
  useLazyGetListCampaignQuery,
  useGetDetailCampaignQuery,
  useLazyGetDetailCampaignQuery,
} = injectedRtkApi;
