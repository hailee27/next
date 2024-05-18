import { FunctionComponent } from 'react';
import { CloseOutlined } from '@ant-design/icons';

interface TagProps {
  value: string;
  onRemove?: () => void;
  transrent?: boolean;
}

export const CustomTag: FunctionComponent<TagProps> = ({ value, onRemove, transrent }) => (
  <div
    className={`flex shrink-0 font-bold items-center rounded-[4px] h-[32px] px-[12px] py-[8px] ${
      transrent ? 'text-[#808080] bg-[white] border-[#808080]' : 'text-[#3391D6] bg-[#EDF4FE] border-[#3391D6]'
    } border `}
  >
    <div>{value}</div>
    {onRemove ? <CloseOutlined className="ml-[10px]" onClick={onRemove} /> : null}
  </div>
);

CustomTag.defaultProps = {
  onRemove: undefined,
  transrent: false,
};
