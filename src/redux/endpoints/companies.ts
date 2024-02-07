import { api } from '../api';
import { CompaniesListResponse } from './users';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    postCompanies: build.mutation<CompaniesResponse, CompaniesParams>({
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
    updateCompanies: build.mutation<CompaniesResponse, CompaniesParams>({
      query: (queryArg) => {
        const body = new FormData();
        const { companyId, ...other } = queryArg;
        Object.entries(other).forEach(([key, value]) => body.append(`${key}`, value));
        return {
          url: `/companies/${companyId}`,
          method: 'PUT',
          body,
        };
      },
    }),
    getCompanyUsers: build.query<CompaniesListResponse, CompanyUserParams>({
      query: (queryArg) => ({
        url: `/companies/${queryArg.companyId}/users`,
        method: 'GET',
        params: queryArg,
      }),
    }),
  }),
});

export type CompaniesResponse = void;
export type CompanyUserParams = {
  companyId: string;
  skip?: number;
  take?: number;
  where?: string;
  orderBy?: string;
  q?: string;
  include?: string;
  token?: 'user';
  action?: string;
};
export type CompaniesParams = {
  name?: string;
  code?: string;
  email?: string;
  companyImage?: string;
  cardInfo?: string;
  sourceId?: string;
  companyId?: string;
};

export { injectedRtkApi as CompaniesApi };
export const {
  usePostCompaniesMutation,
  useUpdateCompaniesMutation,
  useGetCompanyUsersQuery,
  useLazyGetCompanyUsersQuery,
} = injectedRtkApi;
