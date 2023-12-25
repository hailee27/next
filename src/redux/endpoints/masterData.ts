import { api } from '../api';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMasterData: build.query<MasterDataResponse, TestParams>({
      query: () => ({
        url: '/master-data/groups',
        method: 'GET',
        // body: queryArg,
      }),
    }),
  }),
});

export type TypeAction = {
  id: number;
  index: number;
  value: string;
  group: string;
  label: string;
};
export type MasterDataResponse = {
  DISCORD_ACTION: TypeAction[];
  CATEGORY_CAMPAIGN: TypeAction[];
  PROVINCE: TypeAction[];
  TELEGRAM_ACTION: TypeAction[];
  TWITTER_ACTION: TypeAction[];
  TIKTOK_ACTION: TypeAction[];
};
export type TestParams = void;

export { injectedRtkApi as MasterDataApi };
export const { useGetMasterDataQuery } = injectedRtkApi;
