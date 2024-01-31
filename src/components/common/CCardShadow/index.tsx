/* eslint-disable no-console */
import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import styles from './styles.module.scss';

interface ICCardShadowProps {
  disableAnimation?: boolean;
  onClickCard?: () => void;
  children: JSX.Element;
}

export default function CCardShadow({ disableAnimation, onClickCard, children }: ICCardShadowProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const onTouchStart = () => {
    cardRef?.current?.classList.add('shadow-card--tounched');
  };
  const onTouchEnd = () => {
    cardRef?.current?.classList.remove('shadow-card--tounched');
  };
  useEffect(() => {
    if (cardRef && cardRef?.current && disableAnimation === false) {
      cardRef?.current?.addEventListener('touchstart', onTouchStart);
      cardRef?.current?.addEventListener('touchend', onTouchEnd);
    }
    return () => {
      cardRef?.current?.removeEventListener('touchstart', onTouchStart);
      cardRef?.current?.removeEventListener('touchend', onTouchEnd);
    };
  }, [cardRef]);
  return (
    <div
      aria-hidden="true"
      className={clsx(styles.shadowCardContainer)}
      onClick={() => {
        onClickCard?.();
      }}
    >
      <div className={clsx('shadowCardInner', disableAnimation ? '' : 'contentHover')}>
        <div className="card-inner">
          <div className="card-shadow" />
          <div className="card-content" ref={cardRef}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

CCardShadow.defaultProps = {
  onClickCard: () => {},
  disableAnimation: false,
};
