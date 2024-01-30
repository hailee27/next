/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from 'react';
import { Form } from 'antd';
import SelectLabel from '@/components/common/BasicSelect/SelectLabel';
import BasicInput from '@/components/common/BasicInput';
import { StepContext, TypeTabContext } from '@/context/TabContext';
import CButtonShadow from '@/components/common/CButtonShadow';
import FlagItem from '@/components/common/FlagItem';
import CButtonClassic from '@/components/common/CButtonClassic';
import { usePopUpContext } from '@/context/PopUpContext';
import { useRouter } from 'next/router';
import { useGetTasksQuery } from '@/redux/endpoints/task';
import { useCampaignApiContext } from '@/context/CampaignApiContext';
import TaskCampain from './TaskCampain';
import { TypeTasks } from './type';

function Task() {
  const [form] = Form.useForm();
  const router = useRouter();
  const { setTaskIdDeletes } = useCampaignApiContext();
  const { prevTab } = useContext<TypeTabContext>(StepContext);
  const { openPopUp } = usePopUpContext();
  const { data: dataTask } = useGetTasksQuery(
    { campaignId: String(router?.query?.id) },
    { skip: !router?.query?.id, refetchOnReconnect: true, refetchOnMountOrArgChange: true }
  );
  const [numberTask, setNumberTask] = useState<TypeTasks[]>([
    {
      id: 1,
      require: false,
      platForm: {
        name: 'TWITTER',
        type: 'twitter_follow',
      },
    },
  ]);

  const handleDelete = (id: number) => {
    const taskIdDelete = form.getFieldValue(['optionTasks', `task${id}`]).taskId;
    setTaskIdDeletes((prev) => [...prev, taskIdDelete]);
    setNumberTask((prev) => prev.filter((v) => v.id !== id));
    form.setFieldValue(['optionTasks', `task${id}`], {});
  };

  useEffect(() => {
    if (dataTask) {
      form.setFieldValue(['requireTask', 'taskId'], dataTask.tasks.find((e) => e.taskTemplate.config?.requireTask)?.id);
      setNumberTask(
        dataTask.tasks
          .filter((e) => !e.taskTemplate.config?.requireTask)
          .map((v, i) => ({
            id: i + 1,
            platForm: { name: v?.taskTemplate?.config?.platForm, type: v.taskTemplate.config?.type },
            config: v,
          }))
      );
    }
  }, [dataTask]);

  return (
    <>
      <div className="bg-white  mt-[16px] p-[40px]">
        <Form
          form={form}
          name="tasks"
          onValuesChange={(e, values) => {
            const { optionTasks } = values;
            const arrayCustom = Object.values(optionTasks).filter((v: any) => v.platForm === 'CUSTOM');
            if (arrayCustom.length > 2) {
              openPopUp({
                contents: (
                  <div className="w-[350px] h-[150px] flex items-center justify-center text-[20px] font-bold text-center">
                    自由形式質問は最大2問までです。
                  </div>
                ),
                onCancel: () => {
                  const id = Number(
                    Object.keys(e.optionTasks)
                      .map((v) => v)[0]
                      .slice(4)
                  );
                  handleDelete(id);
                },
              });
            }
          }}
          scrollToFirstError={{ behavior: 'smooth', inline: 'center' }}
        >
          <div className="hidden">
            <Form.Item name="checkNumberTask" noStyle rules={[{ required: numberTask.length < 2 }]}>
              <FlagItem />
            </Form.Item>
            <Form.Item name={['requireTask', 'taskId']} noStyle rules={[{ required: numberTask.length < 2 }]}>
              <FlagItem />
            </Form.Item>
          </div>
          <div className="flex flex-col space-y-[24px] pb-[24px]">
            {numberTask.map((e) => (
              <TaskCampain item={e} key={e.id} onDelete={() => handleDelete(e.id)} showDelete />
            ))}
          </div>
          <CButtonClassic
            customClassName="!w-[175px] !h-[48px] !mb-[24px] !rounded-[8px]"
            onClick={() => {
              setNumberTask([
                ...numberTask,
                {
                  id: Number(numberTask[numberTask.length - 1]?.id ?? 0) + 1,
                  require: false,
                  platForm: {
                    name: 'twitter',
                    type: 'follow',
                  },
                },
              ]);
            }}
            title="タスクを追加"
          />
          <div className="border-2 border-[#2D3648] rounded-[8px] p-[40px] ">
            <span>
              {numberTask.length === 0 ? '必須タスク ※このタスクは削除できません。詳細はこちら。' : '必須タスク'}
            </span>
            <div className="flex justify-between space-x-[24px] w-full">
              <SelectLabel
                initialValue="TWITTER"
                name={['requireTask', 'platForm']}
                options={[{ label: ' X (twitter)', value: 'TWITTER' }]}
              />
              <SelectLabel
                initialValue="twitter_follow"
                name={['requireTask', 'type']}
                options={[
                  {
                    value: 'twitter_follow',
                    label: 'フォローさせる',
                  },
                ]}
              />
            </div>
            <div className="w-full ">
              <div className="text-[14px] font-semibold mb-[5px]">ユーザーネーム</div>
              <Form.Item initialValue="@clout" name={['requireTask', 'userFollow']} noStyle>
                <BasicInput />
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
      <div className="flex space-x-[24px] pt-[48px] justify-center">
        <div className="w-[135px]  h-[56px]">
          <CButtonShadow
            classBgColor="bg-white"
            classRounded="rounded-[6px]"
            classShadowColor="bg-main-text"
            onClick={() => prevTab?.()}
            shadowSize="normal"
            textClass="bg-main-text"
            title="戻る"
            withIcon={{
              position: 'left',
              icon: (
                <svg fill="none" height="18" viewBox="0 0 18 18" width="18" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10.0469 14.7422L9.35938 15.4297C9.04688 15.7109 8.57812 15.7109 8.29688 15.4297L2.23438 9.33594C1.92188 9.05469 1.92188 8.58594 2.23438 8.30469L8.29688 2.21094C8.57812 1.92969 9.07812 1.92969 9.35938 2.21094L10.0469 2.89844C10.3594 3.21094 10.3281 3.67969 10.0469 3.99219L6.26562 7.55469H15.2656C15.6719 7.55469 16.0156 7.89844 16.0156 8.30469V9.30469C16.0156 9.74219 15.6719 10.0547 15.2656 10.0547H6.26562L10.0469 13.6484C10.3281 13.9609 10.3594 14.4297 10.0469 14.7422Z"
                    fill="#333333"
                  />
                </svg>
              ),
            }}
          />
        </div>
        <div className="w-[233px]  h-[56px]">
          <CButtonShadow
            classBgColor="bg-main-text"
            classRounded="rounded-[6px]"
            classShadowColor="bg-white"
            onClick={() => form.submit()}
            shadowSize="normal"
            title="保存して次へ進む"
            withIcon={{
              position: 'right',
              icon: (
                <svg fill="none" height="18" viewBox="0 0 18 18" width="18" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7.9375 2.89844L8.625 2.21094C8.9375 1.92969 9.40625 1.92969 9.6875 2.21094L15.7812 8.27344C16.0625 8.58594 16.0625 9.05469 15.7812 9.33594L9.6875 15.4297C9.40625 15.7109 8.9375 15.7109 8.625 15.4297L7.9375 14.7422C7.65625 14.4297 7.65625 13.9609 7.9375 13.6484L11.7188 10.0547H2.75C2.3125 10.0547 2 9.74219 2 9.30469V8.30469C2 7.89844 2.3125 7.55469 2.75 7.55469H11.7188L7.9375 3.99219C7.65625 3.67969 7.625 3.21094 7.9375 2.89844Z"
                    fill="white"
                  />
                </svg>
              ),
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Task;
