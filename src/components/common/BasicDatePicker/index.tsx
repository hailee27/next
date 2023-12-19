import { DatePicker, DatePickerProps } from 'antd';
import React from 'react';
import styles from './index.module.scss';

function BasicDatePicker(props: DatePickerProps) {
  return (
    <div className={styles.customeDatePicker}>
      <DatePicker
        suffixIcon={
          <svg fill="none" height="19" viewBox="0 0 19 19" width="19" xmlns="http://www.w3.org/2000/svg">
            <path
              clipRule="evenodd"
              d="M0.0146484 4C0.0146484 2.89543 0.910079 2 2.01465 2H16.0146C17.1192 2 18.0146 2.89543 18.0146 4V17C18.0146 18.1046 17.1192 19 16.0146 19H2.01465C0.910079 19 0.0146484 18.1046 0.0146484 17V4ZM16.0146 4H2.01465V17H16.0146V4Z"
              fill="#2D3648"
              fillRule="evenodd"
            />
            <path
              clipRule="evenodd"
              d="M6.01465 0C6.56693 1.19209e-07 7.01465 0.447715 7.01465 1L7.01465 5C7.01465 5.55229 6.56693 6 6.01465 6C5.46236 6 5.01465 5.55229 5.01465 5L5.01465 1C5.01465 0.447715 5.46236 -1.19209e-07 6.01465 0Z"
              fill="#2D3648"
              fillRule="evenodd"
            />
            <path
              clipRule="evenodd"
              d="M0 8C0 7.44772 0.447715 7 1 7H16.9756C17.5279 7 17.9756 7.44772 17.9756 8C17.9756 8.55229 17.5279 9 16.9756 9H1C0.447715 9 0 8.55228 0 8Z"
              fill="#2D3648"
              fillRule="evenodd"
            />
            <path
              clipRule="evenodd"
              d="M12.0146 0C12.5669 1.19209e-07 13.0146 0.447715 13.0146 1L13.0146 5C13.0146 5.55229 12.5669 6 12.0146 6C11.4624 6 11.0146 5.55229 11.0146 5L11.0146 1C11.0146 0.447715 11.4624 -1.19209e-07 12.0146 0Z"
              fill="#2D3648"
              fillRule="evenodd"
            />
          </svg>
        }
        {...props}
      />
    </div>
  );
}

export default BasicDatePicker;
