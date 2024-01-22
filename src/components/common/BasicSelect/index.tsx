import React, { useEffect, useState } from 'react';
import { Select, SelectProps } from 'antd';
import styles from './index.module.scss';

function BasicSelect(props: SelectProps & { type?: 'default' | 'primary' }) {
  const { type, suffixIcon, value, ...rest } = props;
  const [selected, setSelected] = useState<string>(value);
  const combinedClassName = [type === 'primary' && styles.selectPrimary, type === 'default' && styles.defaultSelect]
    .filter((e) => e)
    .join(' ');
  useEffect(() => {
    if (value) {
      setSelected(value);
    }
  }, [value]);

  return (
    <div className={combinedClassName}>
      <Select
        dropdownAlign={{ offset: [0, 8] }}
        dropdownStyle={{ border: '2px solid #333', borderRadius: '6px' }}
        onSelect={(e) => setSelected(e)}
        // eslint-disable-next-line react/no-unstable-nested-components
        optionRender={(option) => (
          <div className="flex items-center space-x-[10px]">
            <div className="w-[10px]">
              {option.value === selected && (
                <svg fill="none" height="9" viewBox="0 0 12 9" width="12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 4.5L3.5 7.5L11 1.5" stroke="#333333" strokeLinecap="round" strokeWidth="2" />
                </svg>
              )}
            </div>
            <span>{option.label}</span>
          </div>
        )}
        popupClassName={styles.customPopup}
        suffixIcon={
          suffixIcon || (
            <svg fill="none" height="15" viewBox="0 0 14 15" width="14" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.1494 6.72266L12.751 7.32422C12.9971 7.59766 12.9971 8.00781 12.751 8.25391L7.44629 13.5586C7.17285 13.832 6.7627 13.832 6.5166 13.5586L1.18457 8.25391C0.938477 8.00781 0.938477 7.57031 1.18457 7.32422L1.78613 6.72266C2.05957 6.44922 2.46973 6.47656 2.74316 6.72266L5.8877 10.0312V2.15625C5.8877 1.80078 6.16113 1.5 6.54395 1.5H7.41895C7.77441 1.5 8.0752 1.80078 8.0752 2.15625V10.0312L11.1924 6.72266C11.4658 6.47656 11.876 6.44922 12.1494 6.72266Z"
                fill="#333333"
              />
            </svg>
          )
        }
        value={value}
        {...rest}
      />
    </div>
  );
}
BasicSelect.defaultProps = {
  type: 'default',
};
export default BasicSelect;
