/* eslint-disable import/no-cycle */
import BasicButton from '@/components/common/BasicButton';
import BasicInput from '@/components/common/BasicInput';
import SelectLabel from '@/components/common/BasicSelect/SelectLabel';
import BasicTextArea from '@/components/common/BasicTextArea';
import { Form, Image } from 'antd';
import React, { useEffect, useState } from 'react';
import { TypeTasks } from './type';
import { DataPlatFormType } from './TaskCampain';

interface Props {
  item: TypeTasks;
  dataPlatForm: DataPlatFormType[];
}
function TaskQuestionCostom(props: Props) {
  const form = Form.useFormInstance();
  const { item, dataPlatForm } = props;
  const [listChoise, setListChoise] = useState([1, 2, 3]);
  const optionTasksWath = Form.useWatch(['optionTasks', `task${item.id}`, 'type'], form);

  useEffect(() => {
    const setData = () =>
      setTimeout(() => {
        if (item?.config?.taskTemplate.config.platForm === 'CUSTOM') {
          form.setFieldValue(['optionTasks', `task${item.id}`, 'type'], item.config.taskTemplate.config.type);
          form.setFieldValue(['optionTasks', `task${item.id}`, 'title'], item.config.taskTemplate.config.title);
          form.setFieldValue(
            ['optionTasks', `task${item.id}`, 'description'],
            item.config?.taskTemplate.config?.description
          );
          form.setFieldValue(
            ['optionTasks', `task${item.id}`, 'questionText'],
            item.config.taskTemplate.config.questionText
          );
          const list: number[] = [];
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          Object.entries(item.config.taskTemplate.config.listChoice ?? {}).forEach(([key, value], i) => {
            list.push(i + 1);
            form.setFieldValue(['optionTasks', `task${item.id}`, 'listChoice', `listChoice${i + 1}`], value);
          });
          setListChoise(list);
        }
      }, 200);
    setData();
    return () => clearTimeout(setData());
  }, [item?.config, dataPlatForm]);
  useEffect(() => {
    if ((optionTasksWath === 'formatMultiple' || optionTasksWath === 'formatSingle') && listChoise.length === 0) {
      setListChoise([1, 2, 3]);
    }
  }, [optionTasksWath, listChoise]);

  return (
    <div className="mb-[20px]">
      <div className="w-full">
        <div className="text-[14px] font-semibold mb-[5px]">タスクタイトル ※必須</div>
        <Form.Item name={['optionTasks', `task${item.id}`, 'title']} rules={[{ required: true, message: '' }]}>
          <BasicInput />
        </Form.Item>
      </div>
      <div className="w-full">
        <div className="text-[14px] font-semibold mb-[5px]">タスク説明 ※必須</div>
        <Form.Item name={['optionTasks', `task${item.id}`, 'description']} rules={[{ required: true, message: '' }]}>
          <BasicInput />
        </Form.Item>
      </div>
      <div className="w-full">
        <div className="text-[14px] font-semibold mb-[5px]">質問文 ※必須</div>
        <Form.Item name={['optionTasks', `task${item.id}`, 'questionText']} rules={[{ required: true, message: '' }]}>
          <BasicTextArea style={{ height: 145, resize: 'none' }} />
        </Form.Item>
      </div>
      <SelectLabel
        // initialValue={dataPlatForm?.[0].value}
        label="回答形式 ※必須"
        name={['optionTasks', `task${item.id}`, 'type']}
        options={dataPlatForm}
        rules={[{ required: true, message: '' }]}
      />
      {(optionTasksWath === 'formatSingle' || optionTasksWath === 'formatMultiple') && (
        <div>
          {listChoise.map((e, i) => (
            <div className="w-full" key={e}>
              <div className="text-[14px] font-semibold mb-[5px] flex items-center justify-between">
                <span>選択肢_{i + 1}</span>
                <Image
                  alt=""
                  className="cursor-pointer"
                  onClick={() => {
                    setListChoise((prev) => prev.filter((v) => v !== e));
                    form.setFieldValue(['optionTasks', `task${item.id}`, 'listChoice', `listChoice${e}`], null);
                  }}
                  preview={false}
                  src="/icons/icon-x-circle.svg"
                />
              </div>
              <Form.Item
                name={['optionTasks', `task${item.id}`, 'listChoice', `listChoice${e}`]}
                // rules={[{ required: true, message: '' }]}
              >
                <BasicInput />
              </Form.Item>
            </div>
          ))}
          <BasicButton
            className="w-[175px] h-[48px]"
            onClick={() => setListChoise([...listChoise, Number(listChoise[listChoise.length - 1] || 0) + 1])}
          >
            選択肢を追加
          </BasicButton>
        </div>
      )}
    </div>
  );
}

export default TaskQuestionCostom;
