/* eslint-disable max-lines-per-function */
// import InputLabel from '@/components/common/BasicInput/InputLabel';
import SelectLabel from '@/components/common/BasicSelect/SelectLabel';
import { Form, Image } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import BasicInput from '@/components/common/BasicInput';
import BasicTextArea from '@/components/common/BasicTextArea';
import BasicButton from '@/components/common/BasicButton';
import { renderDataPlatform } from '@/utils/renderDataPlatform';
import { TypeTasks } from './type';

interface Props {
  item: TypeTasks;
  // id: number;
  onDelete: () => void;
  showDelete: boolean;
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
  }[];
}
const TaskCampain = ({ item, onDelete, showDelete }: Props) => {
  const form = Form.useFormInstance();
  const platFormWatch = Form.useWatch(['optionTasks', `task${item.id}`, 'platForm'], form);
  const optionTasksWath = Form.useWatch(['optionTasks', `task${item.id}`, 'type'], form);
  const [listChoise, setListChoise] = useState([1, 2, 3]);

  const dataPlatForm = useMemo<DataPlatFormType[] | undefined>(
    () => renderDataPlatform(platFormWatch),
    [platFormWatch, item]
  );

  useEffect(() => {
    form.setFieldValue(['optionTasks', `task${item.id}`, 'type'], dataPlatForm?.[0].value);
  }, [dataPlatForm, item]);

  return (
    <div className="border-2 border-[#2D3648] rounded-[4px] p-[40px]">
      <div className="flex items-end justify-between text-[16px] font-semibold mb-[20px]">
        {item.title ? <span>{item.title}</span> : <span>タスク_{item.id}</span>}
        {showDelete && (
          <Image alt="" className="cursor-pointer" onClick={onDelete} preview={false} src="/icons/icon-x-circle.svg" />
        )}
      </div>
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
          ]}
        />
        {dataPlatForm?.[0].value && platFormWatch !== 'CUSTOM' ? (
          <SelectLabel
            initialValue={dataPlatForm?.[0].value}
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
                  <div className="text-[14px] font-semibold mb-[5px]">{e.title}</div>
                  <Form.Item
                    className="!mb-0"
                    name={['optionTasks', `task${item.id}`, `${e.name}`]}
                    rules={[{ required: e.require, message: '' }]}
                  >
                    <BasicInput />
                  </Form.Item>
                </div>
              )) ||
              (e.type === 'textArea' && (
                <div className="w-full" key={e.id}>
                  <div className="text-[14px] font-semibold mb-[5px]">{e.title}</div>
                  <Form.Item className="!mb-0" name={['optionTasks', `task${item.id}`, `${e.name}`]}>
                    <BasicTextArea style={{ height: 145, resize: 'none' }} />
                  </Form.Item>
                </div>
              ))
          )}
        {/* TASK QUESTION */}
        {platFormWatch === 'CUSTOM' && (
          <div>
            <div className="w-full">
              <div className="text-[14px] font-semibold mb-[5px]">タスクタイトル ※必須</div>
              <Form.Item name={['optionTasks', `task${item.id}`, 'title']} rules={[{ required: true, message: '' }]}>
                <BasicInput />
              </Form.Item>
            </div>
            <div className="w-full">
              <div className="text-[14px] font-semibold mb-[5px]">タスク説明 ※必須</div>
              <Form.Item
                name={['optionTasks', `task${item.id}`, 'description']}
                rules={[{ required: true, message: '' }]}
              >
                <BasicInput />
              </Form.Item>
            </div>
            <div className="w-full">
              <div className="text-[14px] font-semibold mb-[5px]">質問文</div>
              <Form.Item name={['optionTasks', `task${item.id}`, 'questionText']}>
                <BasicTextArea style={{ height: 145, resize: 'none' }} />
              </Form.Item>
            </div>
            <SelectLabel
              initialValue={dataPlatForm?.[0].value}
              name={['optionTasks', `task${item.id}`, 'type']}
              options={dataPlatForm}
            />
            {optionTasksWath === 'selectionFormat' && (
              <div>
                {listChoise.map((e) => (
                  <div className="w-full" key={e}>
                    <div className="text-[14px] font-semibold mb-[5px] flex items-center justify-between">
                      <span>選択肢_{e}</span>
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
        )}
      </div>
      {/* <InputLabel label="ユーザーネーム" /> */}
    </div>
  );
};
export default TaskCampain;
