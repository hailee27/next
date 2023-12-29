import React from 'react';
import { Form, FormItemProps, InputProps } from 'antd';
import BasicInput from '.';
import styles from './index.module.scss';

function InputLabel(props: FormItemProps & InputProps) {
  const { type, label, value, required, placeholder, ...rest } = props;
  return (
    <div className={styles.inputLabel}>
      <div className="flex space-x-[8px] items-center mb-[10px]">
        <div className="text-[14px] font-bold ">{label}</div>
        {required && (
          <div className="w-[35px] bg-[#04AFAF] h-[20px] text-center text-[11px] font-medium leading-[1.7] text-white rounded-[2px]">
            必須
          </div>
        )}
      </div>
      <Form.Item {...rest}>
        <BasicInput placeholder={placeholder} type={type} />
      </Form.Item>
    </div>
  );
}

export default InputLabel;
