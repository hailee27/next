import React from 'react';
import { Select, SelectProps } from 'antd';
import styles from './index.module.scss';

function BasicSelect(props: SelectProps & { type?: 'default' | 'primary' }) {
  const { type, suffixIcon, ...rest } = props;
  const combinedClassName = [type === 'primary' && styles.selectPrimary, type === 'default' && styles.defaultSelect]
    .filter((e) => e)
    .join(' ');
  return (
    <div className={combinedClassName}>
      <Select
        suffixIcon={
          suffixIcon || (
            <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.70711 8.29289C6.31658 7.90237 5.68342 7.90237 5.29289 8.29289C4.90237 8.68342 4.90237 9.31658 5.29289 9.70711L11.2929 15.7071C11.6834 16.0976 12.3166 16.0976 12.7071 15.7071L18.7071 9.70711C19.0976 9.31658 19.0976 8.68342 18.7071 8.29289C18.3166 7.90237 17.6834 7.90237 17.2929 8.29289L12 13.5858L6.70711 8.29289Z"
                fill="#2D3648"
              />
            </svg>
          )
        }
        {...rest}
      />
    </div>
  );
}
BasicSelect.defaultProps = {
  type: 'default',
};
export default BasicSelect;
