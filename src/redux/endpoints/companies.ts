import { api } from '../api';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    postCompanies: build.mutation<CompaniesaResponse, CompaniesParams>({
      query: (queryArg) => {
        const body = new FormData();
        Object.entries(queryArg).forEach(([key, value]) => body.append(`${key}`, value));
        return {
          url: '/companies',
          method: 'POST',
          body,
        };
      },
    }),
    getCompaniesList: build.query<CompaniesListResponse, CompaniesListParams>({
      query: (queryArg) => ({
        url: '/companies/users',
        method: 'GET',
        params: queryArg,
      }),
    }),
  }),
});

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
    deletedAt: string | null;
  }[];
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

export type CompaniesaResponse = void;
export type CompaniesParams = {
  name: string;
  code: string;
  email: string;
  companyImage: string;
};

export { injectedRtkApi as CompaniesApi };
export const { usePostCompaniesMutation, useGetCompaniesListQuery, useLazyGetCompaniesListQuery } = injectedRtkApi;
