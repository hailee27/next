/* eslint-disable @typescript-eslint/no-explicit-any */
import CButtonShadow from '@/components/common/CButtonShadow';
import CModalWapper from '@/components/common/CModalWapper';
import { Form } from 'antd';
import { useContext } from 'react';
import { useImplementTaskMutation } from '@/redux/endpoints/me';
import toastMessage from '@/utils/func/toastMessage';
import { getErrorMessage } from '@/utils/func/getErrorMessage';
import { TasksConvert } from '@/utils/func/convertCampaign';
import { CampaignDetailContext } from '../CampainContext';

export default function ModalFreeTextContent({
  isOpen,
  onCancel,
  task,
}: {
  isOpen: boolean;
  onCancel: () => void;
  task: TasksConvert;
}) {
  const { onRefetchCampaignTasks } = useContext(CampaignDetailContext);
  const [onImplementTask] = useImplementTaskMutation();

  return (
    <CModalWapper isOpen={isOpen} onCancel={onCancel}>
      <Form
        onFinish={async (values) => {
          try {
            if (task?.id) {
              await onImplementTask({
                taskId: task?.id,
                body: {
                  answer: values?.answer ? JSON.stringify([values?.answer] || []) : '',
                },
              });
              await onRefetchCampaignTasks();
              onCancel();
            }
          } catch (e) {
            toastMessage(getErrorMessage(e), 'error');
          }
        }}
      >
        <div className="h-[356px] font-notoSans overflow-y-hidden">
          <div className="h-full overflow-auto pr-[8px] scrollbar--custom">
            <h3 className="text-[20px] font-bold tracking-[0.6px] leading-[30px] text-center">
              {task?.taskInfo?.title ?? ''}
            </h3>
            <div className="h-[16px]" />
            <p className="text-[13px] leading-[22px]">{task?.taskInfo?.description ?? ''}</p>
            <div className="h-[32px]" />
            <h4 className="text-[14px] font-bold tracking-[0.42px] leading-[21px]">
              {task?.taskInfo?.questionText ?? ''}
            </h4>
            <div className="h-[16px]" />
            <Form.Item
              name="answer"
              noStyle
              rules={[
                {
                  required: true,
                  message: '',
                },
              ]}
            >
              <textarea
                className="w-full min-h-[120px] p-[16px] bg-[#F2F2F2] text-[13px] tracking-[0.39px] placeholder:text-[13px] placeholder:text-[#aaa] rounded-[8px] resize-none"
                placeholder="自由回答形式の回答欄"
              />
            </Form.Item>
            <div className="h-[24px]" />

            <div className="w-[206px] h-[53px] mx-auto">
              <CButtonShadow title="送信する" type="submit" />
            </div>
          </div>
        </div>
      </Form>
    </CModalWapper>
  );
}
