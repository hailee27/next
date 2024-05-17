import { FC } from 'react';
import { Input } from 'antd';
import { TextAreaProps } from 'antd/lib/input';

import styles from './index.module.scss';

interface Props extends TextAreaProps {}

const BasicArea: FC<Props> = (props) => (
  <div className={`${styles.textArea}`}>
    <Input.TextArea rows={4} {...props} />
  </div>
);

export default BasicArea;
