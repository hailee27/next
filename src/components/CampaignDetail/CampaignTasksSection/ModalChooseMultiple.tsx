/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CButtonShadow from '@/components/common/CButtonShadow';
import CModalWapper from '@/components/common/CModalWapper';
import { TasksConvert } from '@/utils/func/convertCampaign';
import { Checkbox, Form } from 'antd';
import { useContext, useMemo } from 'react';
import { useImplementTaskMutation } from '@/redux/endpoints/me';
import toastMessage from '@/utils/func/toastMessage';
import { getErrorMessage } from '@/utils/func/getErrorMessage';
import { CampaignDetailContext } from '../CampainContext';

export default function ModalChooseMultiple({
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

  const [form] = Form.useForm();
  const watchAnswer = Form.useWatch('answer', form);

  const isDisableBtn = useMemo(() => {
    let result = true;
    if (Array.isArray(watchAnswer) && watchAnswer.length) {
      result = false;
    }
    return result;
  }, [watchAnswer]);

  const convertListItem = useMemo(() => {
    let results: { [key: string]: string }[] | null = null;
    const taskListChoice = task?.taskInfo?.listChoice ?? null;
    if (taskListChoice && typeof taskListChoice === 'object' && Object.keys(taskListChoice)?.length) {
      results = Object.keys(taskListChoice).map((key) => ({
        lable: taskListChoice[key] as string,
        value: key as string,
      }));
    }
    return results;
  }, [task]);
  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };
  return (
    <CModalWapper isOpen={isOpen} onCancel={handleCancel}>
      <Form
        form={form}
        onFinish={async (values) => {
          const answer = values?.answer ?? [];
          try {
            if (task?.id) {
              await onImplementTask({
                taskId: task?.id,
                body: {
                  answer: answer?.join('、'),
                },
              }).unwrap();
            }
          } catch (e) {
            toastMessage(getErrorMessage(e), 'error');
          } finally {
            await onRefetchCampaignTasks();
            handleCancel();
          }
        }}
      >
        <div className="h-[387px] overflow-y-hidden font-notoSans">
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
            <div className="pl-[6px] pt-[6px]">
              <div className="relative w-full h-full">
                <div className="absolute w-full h-full top-[0px] left-[0px] bg-[#333] rounded-[8px]" />
                <div className="border-[2px] border-[#333] rounded-[8px] bg-white translate-x-[-6px] translate-y-[-6px] transition-all duration-200 overflow-hidden">
                  <div className="p-[24px] clout-custom-antd-checkbox">
                    {convertListItem && convertListItem?.length && (
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
                        <Checkbox.Group className="flex flex-col gap-[16px]">
                          {convertListItem.map((item) => (
                            <Checkbox key={item?.value} value={item?.lable}>
                              {item?.lable ?? ''}
                            </Checkbox>
                          ))}
                        </Checkbox.Group>
                      </Form.Item>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[24px]" />
            <div className="w-[206px] h-[53px] mx-auto">
              <CButtonShadow
                classBgColor={isDisableBtn ? 'bg-[#c2c2c2]' : 'bg-[#333]'}
                classBorderColor={isDisableBtn ? 'border-[#c2c2c2]' : 'border-[#333]'}
                isDisable={isDisableBtn}
                title="送信する"
                type="submit"
              />
            </div>
          </div>
        </div>
      </Form>
    </CModalWapper>
  );
}
