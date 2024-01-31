import {
  useDeleteCampaignMutation,
  usePostQuestsMutation,
  useUpdateCampaignMutation,
} from '@/redux/endpoints/campaign';
import { usePostPaymentMutation } from '@/redux/endpoints/payment';
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
  setReWardIdDelete: React.Dispatch<React.SetStateAction<number[]>>;
  handleCreateCampaign: (
    queryParams: TypeResponseFormCampaign,
    type: 'DRAFT' | 'WAITING_FOR_PURCASE' | 'UNDER_REVIEW' | 'WAITING_FOR_PUBLICATION' | 'PUBLIC' | 'COMPLETION'
  ) => void;
  handleUpdateCampaign: (
    campaignId: string,
    queryParams: TypeResponseFormCampaign,
    type: 'DRAFT' | 'WAITING_FOR_PURCASE' | 'UNDER_REVIEW' | 'WAITING_FOR_PUBLICATION' | 'PUBLIC' | 'COMPLETION',
    method?: 'CREATE'
  ) => void;
  handleDeleteCampaign: (campaignId: string | number) => void;
  isLoadingCreate: boolean;
  isLoadingUpdate: boolean;
};

const CampaignApiContext = createContext<TypeCampaignContext | undefined>(undefined);
export const CampaignApiProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [taskIdDeletes, setTaskIdDeletes] = useState<number[]>([]);
  const [reWardIdDelete, setReWardIdDelete] = useState<number[]>([]);
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
  const [deleteReWard, { isLoading: isLoadingDeleteReWard }] = useDeleteReWardsMutation();

  // PAYMENT
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [createPayment, { isLoading: isLoadingCreatePayment }] = usePostPaymentMutation();

  const handleCreateCampaign = (
    queryParams: TypeResponseFormCampaign,
    type: 'DRAFT' | 'WAITING_FOR_PURCASE' | 'UNDER_REVIEW' | 'WAITING_FOR_PUBLICATION' | 'PUBLIC' | 'COMPLETION'
  ) => {
    createCampaign(adapterCampaignParams(queryParams, queryParams.typeWinner, type === 'UNDER_REVIEW' ? 'DRAFT' : type))
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
            if (type === 'UNDER_REVIEW') {
              createPayment({
                campaignId: res.newCampaign.id,
                price: Number(queryParams.price),
                priceWithTax: Number(queryParams.priceWithTax),
                usePoint: queryParams?.usePoint ?? false,
              })
                .unwrap()
                .then(() => {
                  router.push('/campaign-creator/list');
                  toastMessage('send sucess (under reiew)', 'success');
                })
                .catch(() => toastMessage('paymnet error', 'error'));
            } else {
              router.push('/campaign-creator/list');
              toastMessage(type === 'DRAFT' ? 'save draft succses' : 'succses', 'success');
            }
          }
        } catch (err) {
          // eslint-disable-next-line no-console
          console.log(err);
        }
      })
      .catch((err) => toastMessage(err.message || 'error', 'error'));
  };

  const handleUpdateCampaign = (
    campaignId: string,
    queryParams: TypeResponseFormCampaign,
    type: 'DRAFT' | 'WAITING_FOR_PURCASE' | 'UNDER_REVIEW' | 'WAITING_FOR_PUBLICATION' | 'PUBLIC' | 'COMPLETION',
    method?: 'CREATE'
  ) => {
    updateCampaign({
      campaignId,
      body: adapterCampaignParams(queryParams, queryParams.typeWinner, type),
    })
      .unwrap()
      .then(async (res) => {
        const newTask = adapterNewTask(queryParams);
        const newReward = adapterDataReWard(queryParams).filter((e) => !e.rewardId);

        if (newTask.length > 0) {
          createTask({
            campaignId: res.newCampaign.id,
            data: newTask,
          });
        }
        if (newReward.length > 0) {
          createReWard({ campaignId: res.newCampaign.id, data: newReward });
        }
        if (taskIdDeletes.length > 0) {
          deleteTask({ campaignId: res.newCampaign.id, taskIds: taskIdDeletes })
            .unwrap()
            .finally(() => setTaskIdDeletes([]));
        }
        if (reWardIdDelete.length > 0) {
          deleteReWard({ campaignId: res.newCampaign.id, rewardIds: reWardIdDelete })
            .unwrap()
            .finally(() => setReWardIdDelete([]));
        }

        const dataTask = await updateTask({
          campaignId: res.newCampaign.id,
          data: adapterDataTask(queryParams).filter((e) => e.taskId),
        });
        const dataReward = await updateReWard({
          campaignId: res.newCampaign.id,
          data: adapterDataReWard(queryParams).filter((e) => e.rewardId),
        });
        if (dataTask && dataReward) {
          if (method === 'CREATE') {
            createPayment({
              campaignId: res.newCampaign.id,
              price: Number(queryParams.price),
              priceWithTax: Number(queryParams.priceWithTax),
              usePoint: queryParams?.usePoint ?? false,
            })
              .unwrap()
              .then(() => {
                router.push('/campaign-creator/list');
                toastMessage('send sucess (under reiew)', 'success');
              })
              .catch(() => toastMessage('paymnet error', 'error'));
          } else {
            router.push('/campaign-creator/list');
            toastMessage('save draft succses', 'success');
          }
        }
      })
      .catch(() => toastMessage('failed', 'error'));
  };

  const handleDeleteCampaign = useCallback((campaignId) => {
    deleteCampaign({ campaignId });
  }, []);

  const contextvalue = useMemo<TypeCampaignContext>(
    () => ({
      setTaskIdDeletes,
      setReWardIdDelete,
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
      setReWardIdDelete,
      taskIdDeletes,
      reWardIdDelete,
      isLoadingCreateCampaign,
      isLoadingCreateTask,
      isLoadingCreateReWard,
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
