/* eslint-disable no-nested-ternary */
import React from 'react';

interface ICButtonShadow {
  title?: string;
  withIcon?: {
    position: 'left' | 'right';
    icon: React.ReactElement;
  };
}

export default function CButtonShadow({ withIcon, title }: ICButtonShadow) {
  return (
    <div className="pl-[6px] pt-[6px] w-full h-full">
      <div className="relative w-full h-full">
        <button
          className="bg-gradient-blue-to-green w-full h-full absolute left-[-6px] top-[-6px] hover:top-0 hover:left-0 hover:cursor-pointer transition-all duration-200 rounded-full border-[2px] border-black flex items-center justify-center overflow-hidden"
          type="button"
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
        <div className="absolute left-0 top-0 z-[-1] bg-white  h-full w-full rounded-full border-[2px] border-black" />
      </div>
    </div>
  );
}

CButtonShadow.defaultProps = {
  withIcon: undefined,
  title: '',
};
