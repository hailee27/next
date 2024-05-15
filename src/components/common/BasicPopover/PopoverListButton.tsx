import { FC } from 'react';
import { MoreOutlined } from '@ant-design/icons';

import BasicButton from '../forms/BasicButton';
import BorderDefault from '../BorderDefault';

import BasicPopover from '.';

interface IPopoverItem {
  key: string;
  label: string;
  onClick: () => void;
  className: string;
}
interface Props {
  items: IPopoverItem[];
}
const PopoverListButton: FC<Props> = ({ items = [] }) => (
  <BasicPopover
    content={items.map((i) => (
      <div key={i.key}>
        <BasicButton className={i.className} onClick={i.onClick} styleType="text">
          {i.label}
        </BasicButton>
      </div>
    ))}
    placement="left"
    trigger="click"
  >
    <BorderDefault>
      <MoreOutlined disabled={false} style={{ color: '#808080', fontSize: '120%' }} />
    </BorderDefault>
  </BasicPopover>
);

export default PopoverListButton;
