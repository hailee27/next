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
  };
  onClick?: (event?: React.MouseEvent<HTMLElement>) => void;
  textClass?: string;
  classBgColor?: string;
  classShadowColor?: string;
}

export default function CButtonShadow({
  withIcon,
  title,
  type,
  onClick,
  textClass,
  classBgColor,
  classShadowColor,
}: ICButtonShadow) {
  return (
    <div className="pl-[6px] pt-[6px] w-full h-full group">
      <div className="relative w-full h-full">
        <button
          className={clsx(
            ' w-full h-full absolute left-[-6px] top-[-6px] group-hover:top-0 group-hover:left-0 group-hover:cursor-pointer transition-all duration-200 rounded-full border-[2px] border-[#333] flex items-center justify-center overflow-hidden font-bold',
            textClass,
            classBgColor
          )}
          onClick={onClick}
          type={type}
        >
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
            'absolute left-0 top-0 z-[-1]   h-full w-full rounded-full border-[2px] border-[#333]',
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
};
