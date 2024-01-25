/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CButtonShadow from '@/components/common/CButtonShadow';
import CModalWapper from '@/components/common/CModalWapper';
import { Form, Radio, Space } from 'antd';
import { useMemo } from 'react';

export default function ModalChooseOne({
  isOpen,
  onCancel,
  taskInfo,
}: {
  isOpen: boolean;
  onCancel: () => void;
  taskInfo: any;
}) {
  const convertListItem = useMemo(() => {
    let results: { [key: string]: string }[] | null = null;
    const taskListChoice = taskInfo?.listChoice ?? null;
    if (taskListChoice && typeof taskListChoice === 'object' && Object.keys(taskListChoice)?.length) {
      results = Object.keys(taskListChoice).map((key) => ({
        lable: taskListChoice[key] as string,
        value: key as string,
      }));
    }
    return results;
  }, [taskInfo]);
  return (
    <CModalWapper isOpen={isOpen} onCancel={onCancel}>
      <Form
        onFinish={(values) => {
          // console.log(values);
        }}
      >
        <div className="h-[387px] overflow-y-hidden">
          <div className="h-full overflow-auto pr-[8px] scrollbar--custom">
            <h3 className="text-[20px] font-bold tracking-[0.6px] leading-[30px] text-center">
              {taskInfo?.title ?? ''}
            </h3>
            <div className="h-[16px]" />
            <p className="text-[13px] leading-[22px]">{taskInfo?.description ?? ''}</p>
            <div className="h-[32px]" />
            <h4 className="text-[14px] font-bold tracking-[0.42px] leading-[21px]">{taskInfo?.questionText ?? ''}</h4>
            <div className="h-[16px]" />
            <div className="pl-[6px] pt-[6px]">
              <div className="relative w-full h-full">
                <div className="absolute w-full h-full top-[0px] left-[0px] bg-[#333] rounded-[8px]" />
                <div className="border-[2px] border-[#333] rounded-[8px] bg-white translate-x-[-6px] translate-y-[-6px] transition-all duration-200 overflow-hidden">
                  <div className="p-[24px] clout-custom-antd-radio">
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
                        <Radio.Group>
                          <Space className="flex flex-col gap-[16px]" direction="vertical">
                            {convertListItem.map((item) => (
                              <Radio key={item?.value} value={item?.value}>
                                {item?.lable ?? ''}
                              </Radio>
                            ))}
                          </Space>
                        </Radio.Group>
                      </Form.Item>
                    )}
                  </div>
                </div>
              </div>
            </div>
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
