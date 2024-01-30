import {
  useDeleteCampaignMutation,
  usePostQuestsMutation,
  useUpdateCampaignMutation,
} from '@/redux/endpoints/campaign';
import { useDeleteReWardsMutation, usePostReWardsMutation, useUpdateReWardsMutation } from '@/redux/endpoints/reWard';
import { useDeleteTaskMutation, usePostTaskMutation, useUpdateTaskMutation } from '@/redux/endpoints/task';
import { TypeResponseFormCampaign } from '@/types/campaign.type';
import adapterCampaignParams, {
  adapterDataReWard,
  adapterDataTask,
  adapterNewTask,
} from '@/utils/func/adapterCampaignParams';
import toastMessage from '@/utils/func/toastMessage';
import { useRouter } from 'next/router';
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

export type TypeCampaignContext = {
  taskIdDeletes: number[];
  setTaskIdDeletes: React.Dispatch<React.SetStateAction<number[]>>;
  handleCreateCampaign: (
    queryParams: TypeResponseFormCampaign,
    type: 'DRAFT' | 'WAITING_FOR_PURCASE' | 'UNDER_REVIEW' | 'WAITING_FOR_PUBLICATION' | 'PUBLIC' | 'COMPLETION'
  ) => void;
  handleUpdateCampaign: (
    queryParams: TypeResponseFormCampaign,
    type: 'DRAFT' | 'WAITING_FOR_PURCASE' | 'UNDER_REVIEW' | 'WAITING_FOR_PUBLICATION' | 'PUBLIC' | 'COMPLETION'
  ) => void;
  handleDeleteCampaign: (campaignId: string | number) => void;
  isLoadingCreate: boolean;
  isLoadingUpdate: boolean;
};

const CampaignApiContext = createContext<TypeCampaignContext | undefined>(undefined);
export const CampaignApiProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [taskIdDeletes, setTaskIdDeletes] = useState<number[]>([]);

  // CREATE
  const [createCampaign, { isLoading: isLoadingCreateCampaign }] = usePostQuestsMutation();
  const [createTask, { isLoading: isLoadingCreateTask }] = usePostTaskMutation();
  const [createReWard, { isLoading: isLoadingCreateReWard }] = usePostReWardsMutation();

  // UPDATE
  const [updateCampaign, { isLoading: isLoadingUpdateCampaign }] = useUpdateCampaignMutation();
  const [updateTask, { isLoading: isLoadingUpdateTask }] = useUpdateTaskMutation();
  const [updateReWard, { isLoading: isLoadingUpdateReWard }] = useUpdateReWardsMutation();

  // DELETE
  const [deleteCampaign, { isLoading: isLoadingDeleteCampaign }] = useDeleteCampaignMutation();
  const [deleteTask, { isLoading: isLoadingDeleteTask }] = useDeleteTaskMutation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [deleteReWard, { isLoading: isLoadingDeleteReWard }] = useDeleteReWardsMutation();

  const handleCreateCampaign = useCallback(
    (
      queryParams: TypeResponseFormCampaign,
      type: 'DRAFT' | 'WAITING_FOR_PURCASE' | 'UNDER_REVIEW' | 'WAITING_FOR_PUBLICATION' | 'PUBLIC' | 'COMPLETION'
    ) => {
      createCampaign(adapterCampaignParams(queryParams, queryParams.typeWinner, type))
        .unwrap()
        .then(async (res) => {
          try {
            const dataTask = await createTask({
              campaignId: res.newCampaign.id,
              data: adapterDataTask(queryParams),
            });
            const dataReward = await createReWard({
              campaignId: res.newCampaign.id,
              data: adapterDataReWard(queryParams),
            });
            if (dataTask && dataReward) {
              router.push('/campaign-creator/list');
              toastMessage(type === 'DRAFT' ? 'save draft succses' : 'succses', 'success');
            }
          } catch (err) {
            // eslint-disable-next-line no-console
            console.log(err);
          }
        })
        .catch((err) => toastMessage(err.message || 'error', 'error'));
    },
    [router.isReady]
  );

  const handleUpdateCampaign = useCallback(
    (
      queryParams: TypeResponseFormCampaign,
      type: 'DRAFT' | 'WAITING_FOR_PURCASE' | 'UNDER_REVIEW' | 'WAITING_FOR_PUBLICATION' | 'PUBLIC' | 'COMPLETION'
    ) => {
      if (router.query.id) {
        updateCampaign({
          campaignId: String(router.query.id),
          body: adapterCampaignParams(queryParams, queryParams.typeWinner, type),
        })
          .unwrap()
          .then(async (res) => {
            const newTask = adapterNewTask(queryParams);
            if (newTask) {
              createTask({
                campaignId: res.newCampaign.id,
                data: newTask,
              });
            }
            if (taskIdDeletes.length > 0) {
              deleteTask({ campaignId: res.newCampaign.id, taskIds: taskIdDeletes });
            }

            const dataTask = await updateTask({
              campaignId: res.newCampaign.id,
              data: adapterDataTask(queryParams).filter((e) => e.taskId),
            });
            const dataReward = await updateReWard({
              campaignId: res.newCampaign.id,
              data: adapterDataReWard(queryParams),
            });
            if (dataTask && dataReward) {
              setTaskIdDeletes([]);
              router.push('/campaign-creator/list');
              toastMessage('save draft succses', 'success');
            }
          })
          .catch(() => toastMessage('failed', 'error'));
      }
    },
    [router.isReady, router.query.id, taskIdDeletes]
  );
  const handleDeleteCampaign = useCallback((campaignId) => {
    deleteCampaign({ campaignId });
  }, []);

  const contextvalue = useMemo<TypeCampaignContext>(
    () => ({
      setTaskIdDeletes,
      handleCreateCampaign,
      handleUpdateCampaign,
      handleDeleteCampaign,
      taskIdDeletes,
      isLoadingCreate: isLoadingCreateCampaign && isLoadingCreateTask && isLoadingCreateReWard,
      isLoadingUpdate: isLoadingUpdateCampaign && isLoadingUpdateTask && isLoadingUpdateReWard,
      isLoadingDelete: isLoadingDeleteCampaign && isLoadingDeleteTask && isLoadingDeleteReWard,
    }),
    [
      setTaskIdDeletes,

      taskIdDeletes,
      isLoadingCreateCampaign,
      isLoadingCreateTask,
      isLoadingCreateReWard,
      router.isReady,
    ]
  );
  return <CampaignApiContext.Provider value={contextvalue}>{children}</CampaignApiContext.Provider>;
};
export const useCampaignApiContext = () => {
  const popups = useContext(CampaignApiContext);
  if (popups == null) {
    throw new Error('useCampaignApiContext() called outside of a PopUpProvider?'); // an alert is not placed because this is an error for the developer not the user
  }
  return popups;
};
export default CampaignApiContext;
