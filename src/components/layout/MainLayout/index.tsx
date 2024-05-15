import React from 'react';

import Header from './Header';

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div className="min-h-screen">{children}</div>
    </div>
  );
}

export default MainLayout;
