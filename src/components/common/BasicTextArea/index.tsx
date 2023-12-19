import React from 'react';
import { Input } from 'antd';
import { TextAreaProps } from 'antd/es/input';
import styles from './index.module.scss';

const { TextArea } = Input;

function BasicTextArea(props: TextAreaProps) {
  return (
    <div className={styles.customeTextArea}>
      <TextArea {...props} />
    </div>
  );
}

export default BasicTextArea;
