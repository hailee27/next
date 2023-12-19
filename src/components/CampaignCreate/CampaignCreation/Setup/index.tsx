import React from 'react';
import { Form } from 'antd';
import InputLabel from '@/components/common/BasicInput/InputLabel';
import SelectLabel from '@/components/common/BasicSelect/SelectLabel';
import BasicButton from '@/components/common/BasicButton';
import BasicDatePicker from '@/components/common/BasicDatePicker';
import BasicSwitch from '@/components/common/BasicSwitch';
import UploadButton from '@/components/common/UploadButton';
import type { CropperProps } from 'react-easy-crop';
import ExplanatoryText from './ExplanatoryText';

function Setup() {
  const [form] = Form.useForm();
  const noDateWatch = Form.useWatch('noDate', form);

  return (
    <div className="mt-[36px] border-2 border-[#2D3648] rounded-[4px] p-[40px]">
      <Form form={form} name="setUp" scrollToFirstError={{ behavior: 'smooth', inline: 'center', block: 'center' }}>
        <InputLabel
          label={
            <div className="flex space-x-3 ">
              <span>キャンペーン名</span>
              <span>※必須</span>
            </div>
          }
          name="campainName"
          rules={[{ required: true, message: '' }]}
        />
        <SelectLabel
          label={
            <div className="flex space-x-3 ">
              <span>カテゴリー</span>
              <span>※必須</span>
            </div>
          }
          name="category"
          options={[
            { value: 'jack', label: 'Jack' },
            { value: 'lucy', label: 'Lucy' },
            { value: 'Yiminghe', label: 'yiminghe' },
          ]}
          placeholder="Select"
          rules={[{ required: true, message: '' }]}
        />

        <div className="flex space-x-3 text-[14px] font-semibold mb-[5px]">
          <span>サムネイル</span>
          <span>※必須</span>
        </div>
        <Form.Item name="thumbnail" noStyle>
          <UploadButton
            className="w-[175px]"
            props={{ cropperProps: { cropSize: { height: 279, width: 279 } } as CropperProps }}
          />
          {/* <BasicButton className="w-[175px] h-[48px]">画像を選択する</BasicButton> */}
        </Form.Item>
        <div className="text-[14px] font-semibold mb-[5px] mt-[24px]">説明文</div>
        <Form.Item name="explanatoryText" noStyle>
          <ExplanatoryText />
        </Form.Item>
        <div className="mt-[24px]">
          <div className="flex space-x-3 text-[14px] font-semibold mb-[5px]">
            <span>スケジュール</span>
            <span>※必須</span>
          </div>
          <div className="flex w-full space-x-[16px]">
            <Form.Item className="!flex-1" name="startDate">
              <BasicDatePicker placeholder="開始日時" />
            </Form.Item>
            <Form.Item className="!flex-1" name="endDate">
              <BasicDatePicker disabled={noDateWatch} placeholder="終了日時" />
            </Form.Item>
          </div>
        </div>
        <div className="flex items-center space-x-[12px] ">
          <span className="text-[14px] font-semibold">終了日時を設定しない</span>
          <Form.Item name="noDate" noStyle>
            <BasicSwitch />
          </Form.Item>
        </div>
        <div className="flex space-x-[24px] border-t-2 border-[#2D3648] mt-[24px] pt-[48px]">
          <BasicButton className="w-[84px] h-[56px]" type="primary">
            戻る
          </BasicButton>
          <BasicButton className="w-[191px] h-[56px]" onClick={() => form.submit()}>
            保存して次へ進む
          </BasicButton>
        </div>
      </Form>
    </div>
  );
}

export default Setup;
