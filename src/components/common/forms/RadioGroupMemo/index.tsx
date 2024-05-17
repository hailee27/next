import React, { useMemo } from 'react';
import { Radio, RadioGroupProps } from 'antd';

const RadioGroupMemo = ({ value, options, ...props }: RadioGroupProps) => {
  const radioMemo = useMemo(() => <Radio.Group options={options} value={value} {...props} />, [value, options]);

  return radioMemo;
};

export default RadioGroupMemo;
