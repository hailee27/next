/* eslint-disable react/button-has-type */
/* eslint-disable no-nested-ternary */
import clsx from 'clsx';
import React from 'react';

interface ICButtonClassic {
  type?: 'button' | 'reset' | 'submit';
  title?: string;
  withIcon?: {
    position: 'left' | 'right';
    icon: React.ReactElement;
  };
  onClick?: (event?: React.MouseEvent<HTMLElement>) => void;
  customClassName?: string;
  tagLabel?: string;
  isDisable?: boolean;
}

export default function CButtonClassic({
  withIcon,
  title,
  type,
  onClick,
  tagLabel,
  isDisable,
  customClassName,
}: ICButtonClassic) {
  return (
    <button
      className={clsx(
        'w-full h-full transition-all duration-200  border-[2px] flex items-center gap-[6px]  overflow-hidden font-bold hover:opacity-80 text-white text-[16px] font-notoSans bg-[#333] rounded-full border-[#333] justify-center',
        customClassName
      )}
      disabled={isDisable}
      onClick={onClick}
      type={type}
    >
      {tagLabel ? (
        <span className="bg-[#333] rounded-sm overflow-hidden text-[10px] font-bold leading-[15px] text-white px-[5px] py-[3px] ">
          {tagLabel}
        </span>
      ) : (
        ''
      )}
      {withIcon && withIcon?.position === 'left' ? (
        <>
          {withIcon?.icon}
          {title}
        </>
      ) : withIcon && withIcon?.position === 'right' ? (
        <>
          {title}
          {withIcon?.icon}
        </>
      ) : (
        title
      )}
    </button>
  );
}

CButtonClassic.defaultProps = {
  withIcon: undefined,
  title: '',
  type: 'button',
  onClick: () => {},
  tagLabel: undefined,
  isDisable: false,
  customClassName: '',
};
