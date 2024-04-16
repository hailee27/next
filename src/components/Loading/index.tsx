import React from 'react';
import { Spin } from 'antd';

function Loading() {
  return (
    <div
      aria-hidden="true"
      className="fixed max-w-screen max-h-screen w-full h-full bg-black z-[9999] bg-opacity-20 flex items-center justify-center"
    >
      <Spin />
    </div>
  );
}

export default Loading;
