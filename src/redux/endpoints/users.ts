/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '../api';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    postNewPermissionCompanies: build.mutation<NewPermissionCompaniesResponse, NewPermissionCompaniesParams>({
      query: (queryArg) => ({
        url: `/companies/${queryArg.params.companyId}/users`,
        method: 'POST',
        body: queryArg.body,
      }),
    }),
    getCompaniesList: build.query<CompaniesListResponse, CompaniesListParams>({
      query: (queryArg) => ({
        url: '/users',
        method: 'GET',
        params: queryArg,
      }),
    }),
    getUserDetail: build.query<UserDetailResponse, UserDetailParams>({
      query: (queryArg) => ({
        url: `/users/${queryArg.userId}`,
        method: 'GET',
      }),
    }),
    updateUser: build.mutation<UpdateUserResponse, UpdateUserParams>({
      query: (queryArg) => ({
        url: `/users/${queryArg.userId}`,
        method: 'PUT',
        body: queryArg.body,
      }),
    }),
    createGacha: build.mutation<
      any,
      {
        userId: number;
        campaignId: string;
      }
    >({
      query: ({ userId, campaignId }) => ({
        url: `/rewards/users/${userId}`,
        method: 'POST',
        body: {
          campaignId,
        },
      }),
    }),
  }),
});
export type UpdateUserResponse = void;
export type UpdateUserParams = {
  userId: string;
  body: {
    companyId?: number;
    membership?: string;
    isAccept?: boolean;
    updateCompany?: boolean;
  };
};
export type UserDetailResponse = TypeUserCompanies;
export type UserDetailParams = {
  userId: string;
};
export type TypeUserCompanies = {
  id: number;
  checkLocationOnLogin: boolean;
  countryCode: string;
  createdAt: string;
  gender: string;
  name: string;
  notificationEmail: string;
  prefersLanguage: string;
  emailId: number;
  profilePictureUrl: string;
  role: string;
  timezone: string;
  twoFactorMethod: string;
  twoFactorPhone: string | null;
  updatedAt: string;
  active: boolean;
  uuid: string;
  deleteFlg: boolean;
  deleteByAdmin: boolean;
  deletedAt: string | null;
  removalComment: string | null;
  removalReason: string | null;
  point: number;
  lastActive: string;
  isVerified: boolean;
  companyId: string | null;
  pointTotal: number;
  companyRole: {
    companyId: number;
    userId: number;
    membership: string;
    createdAt: string;
    updatedAt: string;
    isVerified?: boolean;
    deletedAt: string | null;
  };
  profile: string | null;
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
export type NewPermissionCompaniesResponse = void;
export type NewPermissionCompaniesParams = {
  params: {
    companyId: string;
  };
  body: {
    email: string;
    membership: string;
  };
};
export type CompaniesListResponse = {
  total: number;
  users: TypeUserCompanies[];
};
export type CompaniesListParams = {
  skip: number;
  take: number;
  where?: string;
  orderBy?: string;
  q?: string;
  include?: string;
};
export { injectedRtkApi as UsersApi };
export const {
  usePostNewPermissionCompaniesMutation,
  useGetUserDetailQuery,
  useGetCompaniesListQuery,
  useLazyGetCompaniesListQuery,
  useUpdateUserMutation,
  useCreateGachaMutation,
} = injectedRtkApi;
