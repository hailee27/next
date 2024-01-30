/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '../api';

export const contactsApi = api.injectEndpoints({
  endpoints: (build) => ({
    postContact: build.mutation<
      any,
      {
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        companyName: string;
        purposeOfInquiry: string;
        contentOfInquiry: string;
      }
    >({
      query: (queryArg) => ({
        url: '/users/contacts',
        method: 'POST',
        body: queryArg,
      }),
    }),
  }),
});

export const { usePostContactMutation } = contactsApi;
