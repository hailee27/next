import React from 'react';

export default function XIcon({ width, height, stroke }: { width?: number; height?: number; stroke?: string }) {
  return (
    <div
      style={{
        width: width ?? '42px',
        height: height ?? '42px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <svg
        fill="none"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 42 42"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line stroke={stroke} strokeLinecap="round" strokeWidth="2" x1="14.4142" x2="27.1421" y1="14" y2="26.7279" />
        <line
          stroke={stroke}
          strokeLinecap="round"
          strokeWidth="2"
          transform="matrix(-0.707107 0.707107 0.707107 0.707107 28 14)"
          x1="1"
          x2="19"
          y1="-1"
          y2="-1"
        />
      </svg>
    </div>
  );
}

XIcon.defaultProps = {
  width: 42,
  height: 42,
  stroke: '#333333',
};
