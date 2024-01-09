import { api } from '@/redux/api';
import updateMe from './update-me';

export const meApi = api.injectEndpoints({
  endpoints: (build) => ({
    updateMe: updateMe(build),
  }),
  overrideExisting: false,
});

export const { useUpdateMeMutation } = meApi;
