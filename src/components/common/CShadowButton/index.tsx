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
  isShadowStyle?: boolean;
  tagLabel?: string;
}

export default function CButtonShadow({
  withIcon,
  title,
  type,
  onClick,
  textClass,
  classBgColor,
  classShadowColor,
  isShadowStyle,
  tagLabel,
}: ICButtonShadow) {
  return (
    <div className={clsx(' w-full h-full group', isShadowStyle ? 'pl-[6px] pt-[6px]' : ' ')}>
      <div className="relative w-full h-full">
        <button
          className={clsx(
            'w-full h-full group-hover:cursor-pointer transition-all duration-200 rounded-full border-[2px] border-[#333] flex items-center gap-[4px]  overflow-hidden font-bold',
            isShadowStyle
              ? 'absolute left-[-6px] top-[-6px] group-hover:top-0 group-hover:left-0'
              : 'group-hover:opacity-90',
            withIcon?.parentJustify ? withIcon?.parentJustify : 'justify-center',
            textClass,
            classBgColor
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
        <div
          className={clsx(
            isShadowStyle
              ? 'absolute left-0 top-0 z-[-1]   h-full w-full rounded-full border-[2px] border-[#333]'
              : '!hidden',
            classShadowColor
          )}
        />
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
  isShadowStyle: true,
  tagLabel: undefined,
};
