/* eslint-disable import/no-cycle */
/* eslint-disable max-lines-per-function */
// import InputLabel from '@/components/common/BasicInput/InputLabel';
import SelectLabel from '@/components/common/BasicSelect/SelectLabel';
import { Form, Image } from 'antd';
import React, { useEffect, useMemo } from 'react';
import BasicInput from '@/components/common/BasicInput';
import BasicTextArea from '@/components/common/BasicTextArea';
import { renderDataPlatform } from '@/utils/renderDataPlatform';
import FlagItem from '@/components/common/FlagItem';
import BasicSwitch from '@/components/common/BasicSwitch';
import { TypeTasks } from './type';
import TaskQuestionCostom from './TaskQuestionCostom';

interface Props {
  item: TypeTasks;
  // id: number;
  onDelete: () => void;
  showDelete: boolean;
  index: number;
}
export interface DataPlatFormType {
  value?: string;
  label: string | null;
  content?: {
    id: number;
    title: string;
    type: string;
    require?: boolean;
    name: string;
    value?: string;
    isUrl?: boolean;
  }[];
}
const TaskCampain = ({ item, onDelete, showDelete, index }: Props) => {
  const form = Form.useFormInstance();
  const platFormWatch = Form.useWatch(['optionTasks', `task${item.id}`, 'platForm'], form);
  const optionTasksWath = Form.useWatch(['optionTasks', `task${item.id}`, 'type'], form);

  const dataPlatForm = useMemo<DataPlatFormType[] | undefined>(
    () => renderDataPlatform(platFormWatch, item.config?.taskTemplate.config),
    [platFormWatch, item, item.config?.taskTemplate.config]
  );
  useEffect(() => {
    if (item.platForm && item.config) {
      form.setFieldValue(['optionTasks', `task${item.id}`, 'type'], item.platForm.type);
      form.setFieldValue(['optionTasks', `task${item.id}`, 'platForm'], item.platForm.name);
      form.setFieldValue(['optionTasks', `task${item.id}`, 'taskId'], item.config.taskTemplateId);
      form.setFieldValue(['optionTasks', `task${item.id}`, 'pointsAwarded'], item.config.point);
      form.setFieldValue(['optionTasks', `task${item.id}`, 'isRequiredTask'], item.config.isRequired);
    }
  }, [item.platForm, item.config, item.id]);

  useEffect(() => {
    dataPlatForm
      ?.find((e) => e.value === optionTasksWath)
      ?.content?.forEach((v) => {
        form.setFieldValue(['optionTasks', `task${item.id}`, `${v.name}`], v.value);
      });
  }, [dataPlatForm, optionTasksWath]);
  useEffect(() => {
    if (platFormWatch === 'INVITE_FRIENDS_FROM_URL') {
      form.setFieldValue(['optionTasks', `task${item.id}`, 'isRequiredTask'], false);
    } else {
      form.setFieldValue(['optionTasks', `task${item.id}`, 'isRequiredTask'], true);
    }
  }, [platFormWatch, item.id]);

  return (
    <>
      <Form.Item className="hidden" name={['optionTasks', `task${item.id}`, 'taskId']}>
        <FlagItem />
      </Form.Item>
      <div className="flex items-end justify-between text-[16px] font-semibold mb-[20px]">
        {item.title ? <span>{item.title}</span> : <span>タスク_{index + 1}</span>}
        {showDelete && (
          <Image
            alt=""
            className="cursor-pointer"
            onClick={() => onDelete()}
            preview={false}
            src="/icons/icon-x-circle_new.svg"
          />
        )}
      </div>
      <div className="p-[32px] rounded-[8px] border-2 border-[#333]">
        <div className="flex justify-between space-x-[24px] w-full">
          <SelectLabel
            initialValue="TWITTER"
            name={['optionTasks', `task${item.id}`, 'platForm']}
            options={[
              { label: ' X (twitter)', value: 'TWITTER' },
              { label: ' Webサイトを訪問させる', value: 'VISIT_PAGE' },
              { label: ' LINE友達登録させる', value: 'LINE' },
              { label: ' TikTok', value: 'TIKTOK' },
              { label: ' Telegram', value: 'TELEGRAM' },
              { label: ' Discord', value: 'DISCORD' },
              { label: ' 自由形式で質問する', value: 'CUSTOM' },
              { label: 'URLから友達を招待する', value: 'INVITE_FRIENDS_FROM_URL' },
            ]}
          />
          {dataPlatForm?.[0]?.value && platFormWatch !== 'CUSTOM' ? (
            <SelectLabel
              initialValue={dataPlatForm?.[0]?.value}
              name={['optionTasks', `task${item.id}`, 'type']}
              options={dataPlatForm}
            />
          ) : (
            <div className="w-full" />
          )}
        </div>
        <div className="flex flex-col space-y-[24px]">
          {dataPlatForm
            ?.find((e) => e.value === optionTasksWath)
            ?.content?.map(
              (e) =>
                (e.type === 'input' && (
                  <div className="w-full" key={e.id}>
                    <div className="text-[14px] font-semibold mb-[5px] space-x-[8px]">
                      <span>{e.title}</span>
                      {e.require && <span>※必須</span>}
                    </div>

                    <Form.Item
                      initialValue={e.value}
                      name={['optionTasks', `task${item.id}`, `${e.name}`]}
                      rules={
                        e.isUrl
                          ? [
                              { required: e.require, message: `${e.title}を入力してください。` },
                              {
                                pattern:
                                  /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g,
                                message: 'mush url',
                              },
                            ]
                          : [{ required: e.require, message: `${e.title}を入力してください。` }]
                      }
                    >
                      <BasicInput />
                    </Form.Item>
                  </div>
                )) ||
                (e.type === 'textArea' && (
                  <div className="w-full" key={e.id}>
                    <div className="text-[14px] font-semibold mb-[5px] space-x-[8px]">
                      <span>{e.title}</span>
                      {e.require && <span>※必須</span>}
                    </div>
                    {e.name === 'quotePost' && (
                      <div className="text-[14px] font-semibold mb-[5px]">
                        You can include hashtag and link. If not filled in, there will be no template
                      </div>
                    )}
                    <Form.Item
                      className="!mb-0"
                      initialValue={e.value}
                      name={['optionTasks', `task${item.id}`, `${e.name}`]}
                    >
                      <BasicTextArea style={{ height: 145, resize: 'none' }} />
                    </Form.Item>
                  </div>
                ))
            )}
          {/* TASK QUESTION */}
          {platFormWatch === 'CUSTOM' && <TaskQuestionCostom dataPlatForm={dataPlatForm ?? []} item={item} />}
        </div>
        <div className="w-full">
          <div className="text-[14px] font-semibold mb-[5px] space-x-[8px]">付与ポイント</div>
          <Form.Item className="" initialValue="1" name={['optionTasks', `task${item.id}`, 'pointsAwarded']}>
            <BasicInput />
          </Form.Item>
        </div>

        <div className="w-full flex items-center justify-end space-x-3">
          <span>必須タスクにする</span>
          <Form.Item name={['optionTasks', `task${item.id}`, 'isRequiredTask']} noStyle>
            <BasicSwitch disabled={platFormWatch === 'INVITE_FRIENDS_FROM_URL'} />
          </Form.Item>
        </div>
        {platFormWatch === 'INVITE_FRIENDS_FROM_URL' && (
          <div className="text-right font-semibold text-[12px]">※このタスクは必須タスクに設定できません。</div>
        )}
      </div>
    </>
  );
};
export default TaskCampain;
