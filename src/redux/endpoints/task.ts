/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from '../api';
import { TypeTask } from './campaign';

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<
      {
        tasks: TypeTask[];
        total: number;
      },
      GetTaskParams
    >({
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

export type TaskResponse = void;
export type GetTaskParams = {
  campaignId: string;
  token?: string;
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
