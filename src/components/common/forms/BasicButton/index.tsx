/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Button, ButtonProps } from 'antd';

interface BasicButtonProps {
  width?: number;
  styleType?: 'rounded' | 'rounded_invert' | 'square' | 'square_invert' | 'link' | 'text';
}

const BasicButton: React.FC<ButtonProps & BasicButtonProps> = (props) => {
  switch (props.styleType) {
    case 'rounded':
      return (
        <Button
          {...props}
          className={`rounded-[40px] text-[#2F2F2F] border border-[#2F2F2F] bg-white ${props.className}`}
        >
          {props.children}
        </Button>
      );
    case 'rounded_invert':
      return (
        <Button {...props} className={`rounded-[40px] text-[#FFF] border border-[#222] bg-[#222] ${props.className}`}>
          {props.children}
        </Button>
      );
    case 'link':
      return (
        <Button {...props} className={`text-[#1D92E8] border-none bg-transparent shadow-none ${props.className}`}>
          {props.children}
        </Button>
      );
    case 'text':
      return (
        <Button {...props} className={` border-none bg-transparent shadow-none ${props.className}`}>
          {props.children}
        </Button>
      );
    case 'square_invert':
      return (
        <Button
          {...props}
          className={`h-[40px] rounded-[4px] text-[#FFF] border border-[#222] bg-[#222] ${props.className}`}
        >
          {props.children}
        </Button>
      );
    case 'square':
    default:
      return (
        <Button
          {...props}
          className={`h-[40px] rounded-[4px] text-[#2F2F2F] border border-[#2F2F2F] bg-white ${props.className}`}
        >
          {props.children}
        </Button>
      );
  }
};

export default BasicButton;
