/* eslint-disable @typescript-eslint/no-explicit-any */
import useScript from '@/hooks/useScript';
import React, { useEffect } from 'react';

const LineAddFriend = () => {
  const scriptLoadStatus = useScript('https://www.line-website.com/social-plugins/js/thirdparty/loader.min.js', {
    removeOnUnmount: false,
  });
  useEffect(() => {
    if (scriptLoadStatus === 'ready') {
      const { LineIt } = window as any;
      LineIt?.loadButton();
    }
  }, [scriptLoadStatus]);

  return (
    <div>
      <div
        className="line-it-button"
        data-count="true"
        data-env="REAL"
        data-lang="en"
        data-lineId="@luant19"
        data-type="friend"
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default LineAddFriend;
