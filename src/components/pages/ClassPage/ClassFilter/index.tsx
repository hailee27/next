import React from 'react';
import { DatePicker, Form, Input } from 'antd';

import BasicButton from '@/components/common/forms/BasicButton';
import { ClassSearchObj } from '@/redux/endpoints/class';

export interface SelectType {
  value: number | string;
  label: string;
}
export interface KeywordSearchType {
  area?: SelectType;
  brand?: string | null;
  customGroup?: SelectType;
  categoryId?: SelectType;
  storeIds?: SelectType;
}

interface PropsType {
  onSubmit: (v: ClassSearchObj) => void;
  additionalButtons?: JSX.Element | JSX.Element[];
}

const ClassFilter = ({ onSubmit, additionalButtons }: PropsType) => {
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form className="space-y-[16px]" form={form} onFinish={onSubmit}>
      <div className="grid grid-cols-4 gap-6">
        <Form.Item name="search" noStyle>
          <Input className="flex-1 h-10" placeholder="Name" />
        </Form.Item>
        <Form.Item name="createdAt" noStyle>
          <DatePicker placeholder="Created At" />
        </Form.Item>
      </div>

      <div className="flex items-center justify-between !mt-[0px]">
        <div className="space-x-[16px]">{additionalButtons}</div>
        <div className="flex items-center gap-x-3">
          <BasicButton className="font-[700]" onClick={onReset} styleType="link">
            Reset
          </BasicButton>
          <BasicButton className="text-[13px] font-[700]" htmlType="submit" styleType="rounded">
            Search
          </BasicButton>
        </div>
      </div>
    </Form>
  );
};

ClassFilter.defaultProps = {
  additionalButtons: undefined,
};

export default ClassFilter;
