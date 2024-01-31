import { formatNumber } from '@/utils/formatNumber';
import React from 'react';

interface Props {
  onChange?: (value: string) => void;
  value?: string;
  className?: string;
  type?: 'number' | 'string';
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function FlagItem({ onChange, value, className, type }: Props) {
  return <div className={className}>{type === 'number' ? formatNumber(Number(value), true, 1) : value}</div>;
}
FlagItem.defaultProps = {
  onChange: undefined,
  value: undefined,
  className: '',
  type: undefined,
};
export default FlagItem;
