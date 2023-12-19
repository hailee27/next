import BasicButton from '@/components/common/BasicButton';
import { Form } from 'antd';
import React, { useState } from 'react';
import SelectLabel from '@/components/common/BasicSelect/SelectLabel';
import BasicInput from '@/components/common/BasicInput';
import TaskCampain from './TaskCampain';
import { TypeTasks } from './type';

function Task() {
  const [form] = Form.useForm();
  const [numberTask, setNumberTask] = useState<TypeTasks[]>([]);

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
              initialValue="twitter"
              name={['requireTask', 'platForm']}
              options={[
                { label: ' X (twitter)', value: 'twitter' },
                { label: ' Webサイトを訪問させる', value: 'web' },
                { label: ' LINE友達登録させる', value: 'line' },
                { label: ' Telegram', value: 'telegram' },
                { label: ' Discord', value: 'discord' },
                { label: ' 自由形式で質問する', value: 'question' },
              ]}
            />

            <SelectLabel
              initialValue="follow"
              name={['requireTask', 'type']}
              options={[
                { value: 'follow', label: 'フォローさせる' },
                { value: 'retweet', label: 'リツイートさせる' },
                { value: 'retweetTheQuote', label: '引用リツイートさせる' },
                { value: 'postsWithSpecifiedHashtags', label: '指定ハッシュタグ付きの投稿をさせる' },
                { value: 'postSpecifiedText', label: '指定文言を投稿させる' },
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

      <div className="flex space-x-[24px] border-t-2 border-[#2D3648] mt-[24px] pt-[48px]">
        <BasicButton className="w-[84px] h-[56px]" type="primary">
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
