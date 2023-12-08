import React from 'react';
import { Form } from 'antd';

import InputLabel from '@/components/common/BasicButton/InputLabel';
import SelectLabel from '@/components/common/BasicSelect/SelectLabel';
import BasicButton from '@/components/common/BasicButton';

function Setup() {
  return (
    <div className="mt-[36px] border-2 border-[#2D3648] rounded-[4px] p-[40px]">
      <Form>
        <InputLabel
          label={
            <div className="flex space-x-3 ">
              <span>キャンペーン名</span>
              <span>※必須</span>
            </div>
          }
        />
        <SelectLabel
          label={
            <div className="flex space-x-3 ">
              <span>カテゴリー</span>
              <span>※必須</span>
            </div>
          }
          options={[
            { value: 'jack', label: 'Jack' },
            { value: 'lucy', label: 'Lucy' },
            { value: 'Yiminghe', label: 'yiminghe' },
          ]}
          placeholder="Select"
        />
        <div>
          <div className="flex space-x-3 text-[14px] font-semibold mb-[5px]">
            <span>サムネイル</span>
            <span>※必須</span>
          </div>
          <BasicButton className="w-[175px] h-[48px]">画像を選択する</BasicButton>
        </div>
      </Form>
    </div>
  );
}

export default Setup;
