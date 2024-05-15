/* eslint-disable react/destructuring-assignment */
import React, { FC } from 'react';

interface Props {
  children: React.ReactNode;
  width?: number;
  height?: number;
  onClick?: () => void;
  showCursor?: boolean;
}

const BorderDefault: FC<Props> = (props) => (
  <div
    className={`border-[#DFE5EE] border-[1px] rounded-full cursor-pointer relative ${
      props.showCursor ? 'cursor-pointer' : ''
    }`}
    onClick={props.onClick}
    role="presentation"
    style={{ width: props.width, height: props.height }}
  >
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
      {props.children}
    </div>
  </div>
);

export default BorderDefault;

BorderDefault.defaultProps = {
  width: 32,
  height: 32,
  onClick: undefined,
  showCursor: false,
};
