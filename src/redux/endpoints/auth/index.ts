import { api } from '@/redux/api';
import login from './login';

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: login(build),
  }),
  overrideExisting: false,
});

export const { useLoginMutation } = authApi;
