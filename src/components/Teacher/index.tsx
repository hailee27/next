import React from 'react';

import SideBar from './Sidebar';

function Teacher() {
  return (
    <div className="flex min-h-screen">
      <div className="flex-[2] ">
        <SideBar />
      </div>
      <div className="flex-[8] bg-[#fff]">phai</div>
    </div>
  );
}

export default Teacher;
