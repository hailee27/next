/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Form, Input } from 'antd';

import BasicButton from '@/components/common/forms/BasicButton';
import { getRandomNumber } from '@/utils';

interface PropsType {
  questionKey: number;
}

const ChoicesComponents = ({ questionKey }: PropsType) => (
  <div>
    <div className="grid grid-cols-1 gap-y-0 my-4">
      <Form.List name={[questionKey, 'choices']}>
        {(fields, { add, remove }) => (
          <>
            <div className="flex justify-between mb-3">
              <p className="">Choices</p>
              <BasicButton
                className="text-[13px] font-[700] text-[#fff] !bg-[#2F2F2F]"
                onClick={() => {
                  add({ name: '', id: getRandomNumber() });
                }}
                role="presentation"
                styleType="rounded"
              >
                Add Choice
              </BasicButton>
            </div>
            {fields?.map((item, index) => (
              <div key={item?.key}>
                <div className="mb-3 flex items-center justify-between">
                  <p className="uppercase text-[11px] font-bold text-[#AEB9C2]">Choice {index + 1}</p>
                  <BasicButton
                    className="text-[12px] font-bold uppercase text-[#E11D48]"
                    onClick={() => remove(item?.name)}
                    styleType="text"
                    type="dashed"
                  >
                    Delete
                  </BasicButton>
                </div>
                <Form.Item
                  label=""
                  name={[index, 'name']}
                  rules={[{ required: true, message: 'Please input choice!' }]}
                >
                  <Input placeholder="choice" />
                </Form.Item>
              </div>
            ))}
            {fields?.length === 0 && (
              <div className="bg-[#fff] p-2 my-2">
                <div className="text-center text-[#00000040]">No data</div>
              </div>
            )}
          </>
        )}
      </Form.List>
    </div>
  </div>
);

export default ChoicesComponents;
