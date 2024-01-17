/* eslint-disable no-console */
import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import styles from './styles.module.scss';

interface ICCardShadowProps {
  disableClick?: boolean;
  onClickCard?: () => void;
  children: JSX.Element;
}

export default function CCardShadow({ disableClick, onClickCard, children }: ICCardShadowProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const onTouchStart = () => {
    cardRef?.current?.classList.add('shadow-card--tounched');
  };
  const onTouchEnd = () => {
    cardRef?.current?.classList.remove('shadow-card--tounched');
  };
  useEffect(() => {
    if (cardRef && cardRef?.current) {
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
      className={clsx(styles.shadowCardContainer, disableClick ? 'pointer-events-none' : '')}
      onClick={() => {
        onClickCard?.();
      }}
    >
      <div className="shadowCardInner">
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
  disableClick: false,
};
