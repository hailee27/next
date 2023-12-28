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
  }),
});

export type CompaniesaResponse = void;
export type CompaniesParams = {
  name: string;
  code: string;
  email: string;
  companyImage: string;
};

export { injectedRtkApi as CompaniesApi };
export const { usePostCompaniesMutation } = injectedRtkApi;
