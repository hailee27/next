import React from 'react';
import { Form, FormItemProps, SelectProps } from 'antd';
import BasicSelect from '.';

function SelectLabel(props: FormItemProps & SelectProps & { type?: 'default' | 'primary' }) {
  const { label, type, options, placeholder, disabled, required, ...rest } = props;
  return (
    <div className="w-full ">
      {/* <div className="text-[14px] font-semibold mb-[5px]">{label}</div> */}
      <div className="flex space-x-[8px] items-center mb-[10px]">
        <div className="text-[14px] font-bold ">{label}</div>
        {required && (
          <div className="w-[35px] bg-[#04AFAF] h-[20px] text-center text-[11px] font-medium leading-[1.7] text-white rounded-[2px]">
            必須
          </div>
        )}
      </div>
      <Form.Item {...rest}>
        <BasicSelect disabled={disabled} options={options} placeholder={placeholder} type={type} />
      </Form.Item>
    </div>
  );
}
SelectLabel.defaultProps = {
  type: 'default',
};
export default SelectLabel;
