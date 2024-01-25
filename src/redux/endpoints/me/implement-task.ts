/* eslint-disable @typescript-eslint/no-explicit-any */

import { BaseQueryFn, EndpointBuilder } from '@reduxjs/toolkit/query';

export default function implementTask(build: EndpointBuilder<BaseQueryFn, string, string>) {
  return build.mutation<
    any,
    {
      taskId: number;
    }
  >({
    query(body) {
      return {
        url: `/me/tasks/${body?.taskId}`,
        method: 'POST',
        body,
      };
    },
  });
}
