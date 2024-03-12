import React from 'react';
import { Input, InputNumber, InputNumberProps, InputProps } from 'antd';
import styles from './index.module.scss';

function BasicInput(props: InputProps & InputNumberProps) {
  const { type, ...rest } = props;
  return (
    <div className={styles.customInput}>
      {type === 'currency' ? (
        <InputNumber
          {...rest}
          formatter={(e) => `${e}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          onKeyDown={(event) => {
            if (type === 'currency' && /\+|-/.test(event.key)) {
              event.preventDefault();
            }
          }}
        />
      ) : (
        <Input
          {...rest}
          onKeyDown={(event) => {
            if (
              !/-?\d+(\.\d+)?/.test(event.key) &&
              type === 'number' &&
              event.key !== 'Backspace' &&
              event.key !== 'ArrowUp' &&
              event.key !== 'ArrowDown' &&
              event.key !== 'ArrowRight' &&
              event.key !== 'ArrowLeft' &&
              event.key !== 'Delete'
            ) {
              event.preventDefault();
            }
          }}
          onWheel={(e) => e.currentTarget.blur()}
          // type={type ?? 'text'}
        />
      )}
    </div>
  );
}

export default BasicInput;
