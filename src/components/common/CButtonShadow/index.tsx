/* eslint-disable react/button-has-type */
/* eslint-disable no-nested-ternary */
import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import styles from './styles.module.scss';

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
  classRounded?: string;
  classBorderColor?: string;
  isDisable?: boolean;
  shadowSize?: 'small' | 'normal';
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
  isDisable,
  shadowSize,
}: ICButtonShadow) {
  const btnCardRef = useRef<HTMLDivElement | null>(null);

  const onTouchStart = () => {
    btnCardRef?.current?.classList.add('btn-shadow-card--tounched');
  };
  const onTouchEnd = () => {
    btnCardRef?.current?.classList.remove('btn-shadow-card--tounched');
  };
  useEffect(() => {
    if (btnCardRef && btnCardRef?.current) {
      btnCardRef?.current?.addEventListener('touchstart', onTouchStart);
      btnCardRef?.current?.addEventListener('touchend', onTouchEnd);
    }
    return () => {
      btnCardRef?.current?.removeEventListener('touchstart', onTouchStart);
      btnCardRef?.current?.removeEventListener('touchend', onTouchEnd);
    };
  }, [btnCardRef]);

  return (
    <button
      className={clsx(
        styles.btnShadowContainer,
        'w-full h-full group',
        isDisable ? 'pointer-events-none' : '',
        shadowSize === 'small' ? 'pl-[2px] pt-[2px]' : 'pl-[6px] pt-[6px]'
      )}
      onClick={onClick}
      type={type}
    >
      <div className="btnShadowInner relative w-full h-full" ref={btnCardRef}>
        <div
          className={clsx(
            'absolute left-0 top-0 h-full w-full border-[2px]',
            classShadowColor,
            classRounded,
            classBorderColor
          )}
        />
        <div
          className={clsx(
            'btnshadowContent',
            'w-full h-full transition-all duration-200  border-[2px] flex items-center justify-center gap-[6px]  overflow-hidden font-bold',
            'absolute',
            shadowSize === 'small' ? 'left-[-2px] top-[-2px]' : 'left-[-6px] top-[-6px]',
            textClass,
            classBgColor,
            classRounded,
            classBorderColor
          )}
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
        </div>
      </div>
    </button>
  );
}

CButtonShadow.defaultProps = {
  withIcon: undefined,
  title: '',
  type: 'button',
  onClick: () => {},
  textClass: 'text-white text-[16px] font-notoSans',
  classBgColor: 'bg-[#333]',
  classShadowColor: 'bg-white',
  classRounded: 'rounded-full',
  isDisable: false,
  classBorderColor: 'border-[#333]',
  shadowSize: 'normal',
};
