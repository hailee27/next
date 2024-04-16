import React from 'react';

import Header from './Header';

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* <MainHeader /> */}
      <Header />
      <div className="container-min-height">{children}</div>

      {/* <MainFooter /> */}
    </div>
  );
}

export default MainLayout;
