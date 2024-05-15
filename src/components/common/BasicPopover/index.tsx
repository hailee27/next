import { useState } from 'react';
import { Popover, PopoverProps } from 'antd';

import styles from './index.module.scss';

interface BasicPopoverProps extends PopoverProps {}

const BasicPopover = (props: BasicPopoverProps) => {
  const { children } = props;
  const [hovered, setHovered] = useState(false);

  const handleHoverChange = (open: boolean) => {
    setHovered(open);
  };

  return (
    <Popover className={styles.BasicPopover} onOpenChange={handleHoverChange} open={hovered} {...props}>
      {children}
    </Popover>
  );
};

export default BasicPopover;
