import React from 'react';
import { Switch, SwitchProps } from 'antd';
import styles from './index.module.scss';

function BasicSwitch(props: SwitchProps) {
  return (
    <div className={styles.customeSwitch}>
      <Switch {...props} />
    </div>
  );
}

export default BasicSwitch;
