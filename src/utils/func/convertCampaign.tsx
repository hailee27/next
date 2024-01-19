/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TypeTask } from '@/redux/endpoints/campaign';
import { MasterDataResponse, TypeAction } from '@/redux/endpoints/masterData';
import toastMessage from './toastMessage';

export interface TasksConvert {
  title: string;
  description: React.ReactNode;
  type: string;
}

export const getMasterDataLabel = (
  masterData: MasterDataResponse | null | undefined,
  masterDataKey: string,
  itemValue: string
) => {
  const result = '';
  try {
    if (masterData && masterDataKey && Object.prototype?.hasOwnProperty.call(masterData, masterDataKey)) {
      const item = masterData?.[masterDataKey as keyof MasterDataResponse]?.find(
        // eslint-disable-next-line eqeqeq
        (i) => i?.value === itemValue
      );
      return item?.label ?? '';
    }
  } catch (err: any) {
    toastMessage(err?.message ?? JSON.stringify(err), 'error');
  }
  return result;
};

export const convertCampaignTask = (task: TypeTask | null, masterData: MasterDataResponse | null) => {
  const result: TasksConvert | null = null;
  try {
    switch (task?.type) {
      case 'CUSTOM':
      default:
        return null;
    }
  } catch (err: any) {
    toastMessage(err?.message ?? JSON.stringify(err), 'error');
  }

  return result;
};
