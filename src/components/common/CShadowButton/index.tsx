/* eslint-disable react/button-has-type */
/* eslint-disable no-nested-ternary */
import clsx from 'clsx';
import React from 'react';

interface ICButtonShadow {
  type?: 'button' | 'reset' | 'submit';
  title?: string;
  withIcon?: {
    position: 'left' | 'right';
    icon: React.ReactElement;
    parentJustify?: string;
  };
  onClick?: (event?: React.MouseEvent<HTMLElement>) => void;
  textClass?: string;
  classBgColor?: string;
  classShadowColor?: string;
  classRounded?: string;
  classBorderColor?: string;
  isShadowStyle?: boolean;
  shadowWidth?: number;
  tagLabel?: string;
  isDisable?: boolean;
}

export default function CButtonShadow({
  withIcon,
  title,
  type,
  onClick,
  textClass,
  classBgColor,
  classShadowColor,
  classRounded,
  classBorderColor,
  isShadowStyle,
  shadowWidth,
  tagLabel,
  isDisable,
}: ICButtonShadow) {
  return (
    <div
      className={clsx(
        ' w-full h-full group',
        isShadowStyle ? `pl-[${shadowWidth}px] pt-[${shadowWidth}px]` : ' ',
        isDisable ? 'pointer-events-none' : ''
      )}
    >
      <div className="relative w-full h-full">
        <div
          className={clsx(
            isShadowStyle ? 'absolute left-0 top-0   h-full w-full  border-[2px] ' : '!hidden',
            classShadowColor,
            classRounded,
            classBorderColor
          )}
        />
        <button
          className={clsx(
            'w-full h-full group-hover:cursor-pointer transition-all duration-200  border-[2px] flex items-center gap-[6px]  overflow-hidden font-bold',
            isShadowStyle
              ? `absolute left-[-${shadowWidth}px] top-[-${shadowWidth}px] group-hover:top-0 group-hover:left-0`
              : 'group-hover:opacity-90',
            withIcon?.parentJustify ? withIcon?.parentJustify : 'justify-center',
            textClass,
            classBgColor,
            classRounded,
            classBorderColor
          )}
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
      </div>
    </div>
  );
}

CButtonShadow.defaultProps = {
  withIcon: undefined,
  title: '',
  type: 'button',
  onClick: () => {},
  textClass: 'text-white text-[16px]',
  classBgColor: 'bg-[#333]',
  classShadowColor: 'bg-white',
  classRounded: 'rounded-full',
  isShadowStyle: true,
  shadowWidth: 6,
  tagLabel: undefined,
  isDisable: false,
  classBorderColor: 'border-[#333]',
};
