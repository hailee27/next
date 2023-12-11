import React from 'react';
import { Input, InputProps } from 'antd';
import styles from './index.module.scss';

function BasicInput(props: InputProps) {
  const { type, ...rest } = props;
  return (
    <div className={styles.customInput}>
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
    </div>
  );
}

export default BasicInput;
