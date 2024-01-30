/* eslint-disable @typescript-eslint/no-explicit-any */

import { api } from '../api';
import { TypeCampaignReward } from './campaign';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getReWards: build.query<
      {
        rewards: TypeCampaignReward[];
        total: number;
      },
      GetReWardParameter
    >({
      query: (queryArg) => ({
        url: '/rewards',
        method: 'GET',
        params: queryArg,
      }),
    }),
    postReWards: build.mutation<ReWardResponse, ReWardParameter>({
      query: (queryArg) => ({
        url: '/rewards',
        method: 'POST',
        body: queryArg,
      }),
    }),
    updateReWards: build.mutation<ReWardResponse, ReWardParameter>({
      query: (queryArg) => ({
        url: '/rewards',
        method: 'PUT',
        body: queryArg,
      }),
    }),
    deleteReWards: build.mutation<ReWardResponse, DeleteReWardParameter>({
      query: (queryArg) => ({
        url: '/rewards',
        method: 'DELETE',
        body: queryArg,
      }),
    }),
  }),
});

export type ReWardResponse = {
  rewards: [
    {
      id: number;
      title: string | null;
      type: string;
      campaignId: string;
      index: number;
      amountOfMoney: number;
      numberOfWinningTicket: number;
      updatedAt: string;
      deleteAt: string | null;
      createdAt: string;
    },
  ];
  total: number;
};
export type GetReWardParameter = {
  campaignId: string;
  token?: string;
};
export type DeleteReWardParameter = {
  campaignId: string;
  rewardIds: number[];
};
export type ReWardParameter = {
  campaignId: string;
  data: {
    rewardId?: number | null;
    type: string;
    index: number;
    amountOfMoney: number;
    numberOfWinningTicket: number;
  }[];
};

export { injectedRtkApi as ReWardApi };
export const {
  useDeleteReWardsMutation,
  useGetReWardsQuery,
  useLazyGetReWardsQuery,
  usePostReWardsMutation,
  useUpdateReWardsMutation,
} = injectedRtkApi;
