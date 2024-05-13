import React from 'react';

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* <MainHeader /> */}

      <div className="min-h-screen">{children}</div>

      {/* <MainFooter /> */}
    </div>
  );
}

export default AuthLayout;
