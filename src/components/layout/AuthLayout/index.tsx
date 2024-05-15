import React from 'react';

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="min-h-screen">{children}</div>
    </div>
  );
}

export default AuthLayout;
