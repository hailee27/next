import React from 'react';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';

export default function PageNotFound() {
  const router = useRouter();

  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#F0F7F6] flex-col gap-[24px]">
      {/* <LossSvg /> */}
      <div className="text-center">
        <h1 className="text-[#333] text-[32px] font-bold leading-[43px] ">404</h1>
        <p className="text-[14px] font-medium text-[#333438] leading-[22px]">Page not found 。</p>
      </div>

      <Button
        color="primary"
        onClick={() => {
          router.push('/');
        }}
        type="button"
        variant="contained"
      >
        HOME
      </Button>
    </div>
  );
}
