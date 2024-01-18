import { api } from '../api';

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
  }),
});

export type CompaniesResponse = void;
export type CompaniesParams = {
  name: string;
  code?: string;
  email: string;
  companyImage: string;
  cardInfo?: string;
  sourceId?: string;
  companyId?: string;
};

export { injectedRtkApi as CompaniesApi };
export const { usePostCompaniesMutation, useUpdateCompaniesMutation } = injectedRtkApi;
