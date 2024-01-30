/* eslint-disable @typescript-eslint/no-explicit-any */
import { TypeConfig } from '@/components/CampaignCreate/CampaignCreation/Task/type';
import { api } from '../api';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<TaskResponse, GetTaskParams>({
      query: (queryArg) => ({
        url: '/tasks',
        method: 'GET',
        params: queryArg,
      }),
    }),
    postTask: build.mutation<TaskResponse, TaskParams>({
      query: (queryArg) => ({
        url: '/tasks',
        method: 'POST',
        body: queryArg,
      }),
    }),
    updateTask: build.mutation<TaskResponse, TaskParams>({
      query: (queryArg) => ({
        url: '/tasks',
        method: 'PUT',
        body: queryArg,
      }),
    }),
    deleteTask: build.mutation<TaskResponse, DeleteTaskParams>({
      query: (queryArg) => ({
        url: '/tasks',
        method: 'DELETE',
        body: queryArg,
      }),
    }),
  }),
});

export type TaskResponse = {
  tasks: [
    {
      id: number;
      campaignId: string;
      type: string;
      taskActionType: string;
      taskTemplateId: number;
      updatedAt: string;
      createdAt: string;
      taskTemplate: {
        id: number;
        userName: string;
        extra: string | null;
        config: TypeConfig;
        link: string;
        quote: string | null;
        required: boolean;
        updatedAt: string;
        createdAt: string;
      };
    },
  ];
  total: 37;
};
export type GetTaskParams = {
  campaignId: string;
};
export type DeleteTaskParams = {
  campaignId: string;
  taskIds: number[];
};
export type TaskParams = {
  campaignId: string;
  data: {
    taskId?: string;
    type: string;
    taskActionType?: string;
    taskTemplate: {
      taskTemplateId?: string;
      userName: string;
      link: string;
      config: any;
    };
  }[];
};

export { injectedRtkApi as TaskApi };
export const {
  usePostTaskMutation,
  useDeleteTaskMutation,
  useGetTasksQuery,
  useLazyGetTasksQuery,
  useUpdateTaskMutation,
} = injectedRtkApi;
