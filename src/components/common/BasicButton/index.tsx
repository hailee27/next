import React from 'react';
import { Button, ButtonProps } from 'antd';
import styles from './index.module.scss';

interface Props {
  children?: React.ReactNode;
  type?: 'primary' | 'secondary' | 'default';
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}
function BasicButton(props: ButtonProps | Props) {
  const { children, type, className, disabled, ...antdProps } = props;
  const combinedClassName = [
    type === 'primary' && styles.btnPrimary,
    type === 'secondary' && styles.btnSecondary,
    type === 'default' && styles.btnDefault,
    disabled && styles.btnDisabled,
    className,
  ]
    .filter((e) => e)
    .join(' ');

  return (
    <div className={`${combinedClassName}`}>
      <Button {...antdProps}>{children}</Button>
    </div>
  );
}
BasicButton.defaultProps = {
  children: undefined,
  type: 'default',
  className: undefined,
  disabled: false,
};
export default BasicButton;
