/* eslint-disable no-console */
import React, { useMemo } from 'react';
import { Input, InputProps } from 'antd';

const InputMemo = ({ value, placeholder, ...props }: InputProps) => {
  const inputMemo = useMemo(() => <Input placeholder={placeholder} value={value} {...props} />, [value, placeholder]);

  return inputMemo;
};

export default InputMemo;
