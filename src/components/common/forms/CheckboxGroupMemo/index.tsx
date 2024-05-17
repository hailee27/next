import React, { useMemo } from 'react';
import { Checkbox } from 'antd';
import { CheckboxGroupProps } from 'antd/lib/checkbox/Group';

const CheckboxGroupMemo = ({ value, options, ...props }: CheckboxGroupProps) => {
  const checkboxGroupMemo = useMemo(
    () => <Checkbox.Group options={options} value={value} {...props} />,
    [value, options]
  );

  return checkboxGroupMemo;
};

export default CheckboxGroupMemo;
