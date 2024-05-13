import React from 'react';

import { useGetMeTeacherQuery } from '@/redux/endpoints/teacher';

import SideBar from './Sidebar';

function Teacher() {
  const { data } = useGetMeTeacherQuery();
  console.log(data);
  return (
    <div className="flex min-h-screen">
      <div className="flex-[2] ">
        <SideBar />
      </div>
      <div className="flex-[8] bg-black">phai</div>
    </div>
  );
}

export default Teacher;
