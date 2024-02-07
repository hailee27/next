/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TypeConfig } from '@/components/CampaignCreate/CampaignCreation/Task/type';
import { api } from '../api';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    postQuests: build.mutation<QuestsResponse, QuestsParams>({
      query: (queryArg) => {
        const body = new FormData();
        Object.entries(queryArg).forEach(([key, value]) =>
          queryArg[key] === 'undefined' || queryArg[key] === undefined
            ? delete queryArg[key]
            : body.append(`${key}`, value)
        );
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
    updateCampaign: build.mutation<QuestsResponse, UpdateCampaignParams>({
      query: (queryArg) => {
        const body = new FormData();
        Object.entries(queryArg.body).forEach(([key, value]) =>
          queryArg.body[key] === 'undefined' || queryArg.body[key] === undefined
            ? delete queryArg.body[key]
            : body.append(`${key}`, value)
        );
        return {
          url: `/campaigns/${queryArg.campaignId}`,
          method: 'PUT',
          body,
          // params: queryArg,
        };
      },
    }),
    deleteCampaign: build.mutation<DetailCampaignParams, DetailCampaignParams>({
      query: (queryArg) => ({
        url: `/campaigns/${queryArg.campaignId}`,
        method: 'DELETE',
        // params: queryArg,
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
    getListCampaignUsers: build.query<ListCampaignUsersResponse, ListCampaignUsersParams>({
      query: (queryArg) => ({
        url: `campaigns/${queryArg.campaignId}/users`,
        method: 'GET',
        params: queryArg.params,
      }),
    }),

    getTest: build.query({
      query: () => ({
        url: 'campaigns/template',
        method: 'GET',
        // responseHandler: async (response) =>
        //   window.location.assign(
        //     window.URL.createObjectURL(await new Blob([response.blob()], { type: 'text/csv;charset=utf-8;' }))
        //   ),
        // cache: 'no-cache',
      }),
    }),
  }),
});
export type ListCampaignUsersParams = {
  campaignId: string;
  params?: {
    action: string;
  };
};
export type ListCampaignUsersResponse = {
  users: {
    id: number;
    userId: number;
    campaignId: string;
    identityAccountName: string;
    updatedAt: string;
    createdAt: string;
    user: {
      UserTask: {
        id: number;
        userId: number;
        taskId: number;
        answer: string;
        createdAt: string;
        updatedAt: string;
        deletedAt: string | null;
      }[];
      id: number;
      createdAt: string;
      name: string;
      notificationEmail: string;
      password: string;
      prefersLanguage: string;
      emailId: number;
      profilePictureUrl: string;
      timezone: string;
      twoFactorMethod: string;
      twoFactorPhone: string;
      twoFactorSecret: string;
      updatedAt: string;
      uuid: string;
      deleteFlg: boolean;
      deletedAt: string | null;
      lastActive: string;
      isVerified: boolean;
      companyId: string;
      pointTotal: number;
      email: {
        id: number;
        email: string;
        isVerified: boolean;
        userId: number;
        companyId: string | null;
        createdAt: string;
        updatedAt: string;
        deletedAt: string | null;
      };
    };
  }[];
  total: number;
};
export type DetailCampaignResponse = TypeCampaign;
export type DetailCampaignParams = {
  campaignId: string;
  token?: string;
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
  UserTask?:
    | {
        answer: {
          taskId: number;
        };
        createdAt: string;
        id: number;
        taskId: number;
        userId: number;
      }[]
    | null;
  id: number;
  campaignId: string;
  type: string;
  taskActionType: string;
  taskTemplateId: number;
  updatedAt: string;
  createdAt: string;
  taskTemplate: {
    id: number;
    userName: string;
    extra: string | null;
    config: TypeConfig;
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
  totalNumberOfUsersAllowedToWork?: number | string;
  numberOfPrizes: number;
  totalPrizeValue: number;
  settingForNotWin: boolean;
  noteReward: string | null;
  updatedAt: string;
  createdAt: string;
  communityId: string | null;
  status: 'DRAFT' | 'WAITING_FOR_PURCASE' | 'UNDER_REVIEW' | 'WAITING_FOR_PUBLICATION' | 'PUBLIC' | 'COMPLETION';
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
  createdUser: {
    name: string;
    emailId: number;
    profilePictureUrl: string;
    isVerified: boolean;
    companyId: number;
    email: {
      id: number;
      email: string;
      isVerified: boolean;
      userId: number;
      companyId: string | null;
      createdAt: string;
      updatedAt: string;
      deletedAt: string | null;
    };
  };
  UserClaimCampaign?: {
    id: number;
    userId: number;
    campaignId: string;
    award: {
      id: number;
      isWin?: 'true' | 'false' | null;
      campaignReward: {
        amountOfMoney: number;
        campaignId: string;
        id: number;
        index: number;
        type: string;
      };
    };
  }[];
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
  token?: string;
  except?: string;
  actionFrom?: 'ADMIN';
  status?: 'ALL' | 'DRAFT' | 'UNDER_REVIEW' | 'WAITING_FOR_PUBLICATION' | 'PUBLIC' | 'COMPLETION';
};
export type QuestsResponse = {
  newCampaign: {
    id: string;
    status: string;
    category: string;
    title: string;
    description: string;
    imageId: number;
    priority: number;
    createdUserId: number;
    companyId: number;
    maxTimeUserClaim: number;
    claimEndTime: string | null;
    expiredTime: string;
    startTime: string;
    dontSetExpiredTime: boolean;
    methodOfselectWinners: string;
    totalNumberOfUsersAllowedToWork: number;
    numberOfPrizes: number;
    totalPrizeValue: number;
    settingForNotWin: boolean;
    noteReward: string | null;
    updatedAt: string;
    createdAt: string;
    totalViews: 0;
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
    createdUser: {
      id: number;
      createdAt: string;
      name: string;
      notificationEmail: string;
      prefersLanguage: string;
      emailId: number;
      profilePictureUrl: string;
      timezone: string;
      twoFactorMethod: string;
      twoFactorPhone: string;
      updatedAt: string;
      uuid: string;
      deleteFlg: boolean;
      deletedAt: string | null;
      lastActive: string;
      isVerified: boolean;
      companyId: number;
      pointTotal: number;
    };
  };
};
export type UpdateCampaignParams = {
  campaignId: number | string;
  body: QuestsParams;
};
export type QuestsParams = {
  title?: string;
  category?: string;
  description?: string;
  startTime?: string;
  expiredTime?: string;
  dontSetExpiredTime?: string;
  // tasks?: string;
  methodOfselectWinners?: string;
  totalNumberOfUsersAllowedToWork?: string;
  numberOfPrizes?: string;
  totalPrizeValue?: string;
  // campaignReward?: string;
  noteReward?: string;
  settingForNotWin?: string;
  campaignImage?: string;
  status: string;
};

export { injectedRtkApi as CampaignApi };
export const {
  usePostQuestsMutation,
  useDeleteCampaignMutation,
  useUpdateCampaignMutation,
  useGetListCampaignQuery,
  useLazyGetListCampaignQuery,
  useGetDetailCampaignQuery,
  useLazyGetDetailCampaignQuery,
  useGetListCampaignUsersQuery,
  useLazyGetListCampaignUsersQuery,
  useLazyGetTestQuery,
} = injectedRtkApi;
