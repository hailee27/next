import React from 'react';
import { Input, InputProps } from 'antd';

import styles from './index.module.scss';

interface Props extends InputProps {
  description?: string;
}
const BasicInput: React.FC<Props> = (props) => (
  <div>
    <Input {...props} className={`${styles.basicInput} ${props?.className}`} />
    {props?.description ? <p className="text-[#80888F] font-[400] text-[11px] mt-[8px]">{props?.description}</p> : null}
  </div>
);

BasicInput.defaultProps = {
  description: '',
};

export default BasicInput;
