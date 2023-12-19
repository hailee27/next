import React from 'react';
import { Form } from 'antd';
import BasicButton from '@/components/common/BasicButton';
import SelectLabel from '@/components/common/BasicSelect/SelectLabel';
import BasicTextArea from '@/components/common/BasicTextArea';
import InstantWin from './InstantWin';

function ReWard() {
  const [form] = Form.useForm();
  const typeWinnerWatch = Form.useWatch('typeWinner', form);

  return (
    <div className="border-2 border-[#2D3648] rounded-[4px] mt-[36px] p-[40px]">
      <Form form={form} name="reWard">
        <SelectLabel
          initialValue="instantWin"
          label="当選者選定方法 ※必須"
          name="typeWinner"
          options={[
            { value: 'instantWin', label: 'インスタントウィン' },
            { value: 'manuallyInform', label: '手動で参加者に報酬を案内する' },
          ]}
          rules={[{ required: true, message: '' }]}
        />
        {typeWinnerWatch === 'instantWin' && <InstantWin />}
        {/* <ListReWard /> */}
        <div className="flex flex-col space-y-[24px] border-t-2 border-[#2D3648] mt-[24px]">
          {typeWinnerWatch === 'manuallyInform' && (
            <div className="mt-[24px] py-[24px]">
              <span className="font-semibold pb-[8px] block">報酬要約文 ※必須。全角100文字以内</span>
              <Form.Item name="compensationSummary" rules={[{ required: true, message: '' }]}>
                <BasicTextArea maxLength={100} style={{ height: 145, resize: 'none' }} />
              </Form.Item>
            </div>
          )}
          <div className={`flex space-x-[24px] ${typeWinnerWatch === 'instantWin' && 'pt-[48px]'}`}>
            <BasicButton className="w-[84px] h-[56px]" type="primary">
              戻る
            </BasicButton>
            <BasicButton className="w-[191px] h-[56px]" onClick={() => form.submit()}>
              保存して次へ進む
            </BasicButton>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default ReWard;
