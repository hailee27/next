import React from 'react';
import MainHeader from '../_core/MainHeader';
import MainFooter from '../_core/MainFooter';

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <MainHeader />
      <div className="min-h-screen">{children}</div>
      <MainFooter />
    </div>
  );
}

export default MainLayout;
