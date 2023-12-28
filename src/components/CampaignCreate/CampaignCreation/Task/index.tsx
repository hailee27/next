import BasicButton from '@/components/common/BasicButton';
import { Form } from 'antd';
import React, { useContext, useMemo, useState } from 'react';
import SelectLabel from '@/components/common/BasicSelect/SelectLabel';
import BasicInput from '@/components/common/BasicInput';
import { renderDataPlatform } from '@/utils/renderDataPlatform';
import BasicTextArea from '@/components/common/BasicTextArea';
import { StepContext, TypeTabContext } from '@/context/TabContext';
import TaskCampain, { DataPlatFormType } from './TaskCampain';
import { TypeTasks } from './type';

function Task() {
  const [form] = Form.useForm();
  const [numberTask, setNumberTask] = useState<TypeTasks[]>([]);
  const optionTasksWath = Form.useWatch(['requireTask', 'type'], form);
  const dataPlatForm = useMemo<DataPlatFormType[] | undefined>(() => renderDataPlatform('TWITTER'), []);
  const { prevTab } = useContext<TypeTabContext>(StepContext);

  return (
    <div className="border-2 border-[#2D3648] rounded-[4px] mt-[36px] p-[40px]">
      <Form form={form} name="tasks" scrollToFirstError={{ behavior: 'smooth', inline: 'center' }}>
        <div className="flex flex-col space-y-[24px] pb-[24px]">
          {numberTask.map((e) => (
            <TaskCampain
              item={e}
              key={e.id}
              onDelete={() => {
                setNumberTask((prev) => prev.filter((v) => v.id !== e.id));
                form.setFieldValue(['optionTasks', `task${e.id}`], {});
              }}
              showDelete
            />
          ))}
        </div>
        <BasicButton
          className="w-[175px] h-[48px] mb-[24px]"
          onClick={() =>
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
            ])
          }
        >
          タスクを追加
        </BasicButton>

        <div className="border-2 border-[#2D3648] rounded-[4px] p-[40px]">
          <span>
            {numberTask.length === 0 ? '必須タスク ※このタスクは削除できません。詳細はこちら。' : '必須タスク'}
          </span>
          <div className="flex justify-between space-x-[24px] w-full">
            <SelectLabel
              // disabled
              initialValue="TWITTER"
              name={['requireTask', 'platForm']}
              options={[
                { label: ' X (twitter)', value: 'TWITTER' },
                // { label: ' Webサイトを訪問させる', value: 'web' },
                // { label: ' LINE友達登録させる', value: 'line' },
                // { label: ' Telegram', value: 'telegram' },
                // { label: ' Discord', value: 'discord' },
                // { label: ' 自由形式で質問する', value: 'question' },
              ]}
            />

            <SelectLabel initialValue="twitter_follow" name={['requireTask', 'type']} options={dataPlatForm} />
          </div>
          <div className="flex flex-col space-y-[24px]">
            {dataPlatForm
              ?.find((e) => e.value === optionTasksWath)
              ?.content?.map(
                (e) =>
                  (e.type === 'input' && (
                    <div className="w-full" key={e.id}>
                      <div className="text-[14px] font-semibold mb-[5px]">{e.title}</div>
                      <Form.Item
                        className="!mb-0"
                        name={['requireTask', `${e.name}`]}
                        rules={[{ required: e.require, message: '' }]}
                      >
                        <BasicInput />
                      </Form.Item>
                    </div>
                  )) ||
                  (e.type === 'textArea' && (
                    <div className="w-full" key={e.id}>
                      <div className="text-[14px] font-semibold mb-[5px]">{e.title}</div>
                      <Form.Item className="!mb-0" name={['requireTask', `${e.name}`]}>
                        <BasicTextArea style={{ height: 145, resize: 'none' }} />
                      </Form.Item>
                    </div>
                  ))
              )}
          </div>
          {/* <div className="w-full ">
            <div className="text-[14px] font-semibold mb-[5px]">ユーザーネーム</div>
            <Form.Item initialValue="@clout" name={['requireTask', 'userFollow']} noStyle>
              <BasicInput />
            </Form.Item>
          </div> */}
        </div>
      </Form>

      <div className="flex space-x-[24px] border-t-2 border-[#2D3648] mt-[24px] pt-[48px]">
        <BasicButton className="w-[84px] h-[56px]" onClick={() => prevTab?.()} type="primary">
          戻る
        </BasicButton>
        <BasicButton className="w-[191px] h-[56px]" onClick={() => form.submit()}>
          保存して次へ進む
        </BasicButton>
      </div>
    </div>
  );
}

export default Task;
