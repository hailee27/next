import { api } from '@/redux/api';
import updateMe from './update-me';
import implementTask from './implement-task';

export const meApi = api.injectEndpoints({
  endpoints: (build) => ({
    updateMe: updateMe(build),
    requestJoinCompanies: build.mutation<RequestJoinCompaniesResponse, RequestJoinCompaniesParam>({
      query: (queryArg) => ({
        url: '/me/request/companies',
        method: 'POST',
        body: queryArg,
      }),
    }),
    implementTask: implementTask(build),
  }),
  overrideExisting: false,
});

export type RequestJoinCompaniesResponse = void;
export type RequestJoinCompaniesParam = {
  companyCode: string;
};
export const { useUpdateMeMutation, useRequestJoinCompaniesMutation, useImplementTaskMutation } = meApi;
