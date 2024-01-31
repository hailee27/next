/* eslint-disable @typescript-eslint/no-explicit-any */

import { BaseQueryFn, EndpointBuilder } from '@reduxjs/toolkit/query';

export default function implementTask(build: EndpointBuilder<BaseQueryFn, string, string>) {
  return build.mutation<
    any,
    {
      taskId: number;
      body?: {
        answer: string;
      };
    }
  >({
    query(request) {
      return {
        url: `/me/tasks/${request?.taskId}`,
        method: 'POST',
        body: request?.body ?? {},
      };
    },
  });
}
