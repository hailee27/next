/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react';

export default function callback() {
  useEffect(() => {
    localStorage.setItem('test_callback', new Date().getSeconds().toString());
    window.close();
  }, []);
  return <div>callback .....</div>;
}
