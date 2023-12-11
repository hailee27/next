import React from 'react';
import { Form, FormItemProps, SelectProps } from 'antd';
import BasicSelect from '.';

function SelectLabel(props: FormItemProps & SelectProps & { type?: 'default' | 'primary' }) {
  const { label, type, options, placeholder, ...rest } = props;
  return (
    <div className="w-full ">
      <div className="text-[14px] font-semibold mb-[5px]">{label}</div>
      <Form.Item {...rest}>
        <BasicSelect options={options} placeholder={placeholder} type={type} />
      </Form.Item>
    </div>
  );
}
SelectLabel.defaultProps = {
  type: 'default',
};
export default SelectLabel;
