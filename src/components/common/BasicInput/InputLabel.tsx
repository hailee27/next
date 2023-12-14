import React from 'react';
import { Form, FormItemProps, InputProps } from 'antd';
import BasicInput from '.';

function InputLabel(props: FormItemProps & InputProps) {
  const { type, label, value, ...rest } = props;
  return (
    <div className="w-full ">
      <div className="text-[14px] font-semibold mb-[5px]">{label}</div>
      <Form.Item {...rest}>
        <BasicInput type={type} />
      </Form.Item>
    </div>
  );
}

export default InputLabel;
