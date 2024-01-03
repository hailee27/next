import React from 'react';
import { Input, InputNumber, InputNumberProps, InputProps } from 'antd';
import styles from './index.module.scss';

function BasicInput(props: InputProps & InputNumberProps) {
  const { type, ...rest } = props;
  return (
    <div className={styles.customInput}>
      {type === 'currency' ? (
        <InputNumber {...rest} formatter={(e) => `${e}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
      ) : (
        <Input
          {...rest}
          onKeyDown={(event) => {
            if (type === 'number' && /\+|-/.test(event.key)) {
              event.preventDefault();
            }
          }}
          onWheel={(e) => e.currentTarget.blur()}
          type={type}
        />
      )}
    </div>
  );
}

export default BasicInput;
