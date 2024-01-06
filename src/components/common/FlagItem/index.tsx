import React from 'react';

interface Props {
  onChange?: (value: string) => void;
  value?: string;
  className?: string;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function FlagItem({ onChange, value, className }: Props) {
  return <div className={className}>{value}</div>;
}
FlagItem.defaultProps = {
  onChange: undefined,
  value: undefined,
  className: '',
};
export default FlagItem;
