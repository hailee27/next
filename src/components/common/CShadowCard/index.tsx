import clsx from 'clsx';
import React from 'react';

interface ICShadowCardProps {
  onClickCard?: () => void;
  children: JSX.Element;
}

export default function CShadowCard({ onClickCard, children }: ICShadowCardProps) {
  return (
    <div
      aria-hidden="true"
      className="pl-[8px] pt-[8px] group"
      onClick={() => {
        onClickCard?.();
      }}
    >
      <div className="relative w-full h-full ">
        <div
          className={clsx(
            'border-[2px] border-[#333] rounded-[16px]    bg-white translate-x-[-8px] translate-y-[-8px] group-hover:translate-x-0 group-hover:translate-y-0 group-hover:cursor-pointer transition-all duration-200 overflow-hidden'
          )}
        >
          {children}
        </div>
        <div className="absolute w-full h-full top-[0px] left-[0px] bg-[#333] rounded-[16px] z-[-1]" />
      </div>
    </div>
  );
}

CShadowCard.defaultProps = {
  onClickCard: () => {},
};
