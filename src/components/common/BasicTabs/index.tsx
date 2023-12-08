import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import styles from './index.module.scss';

function BasicTabs(props: TabsProps) {
  return (
    <div className={styles.customeTabs}>
      <Tabs {...props} />
    </div>
  );
}

export default BasicTabs;
