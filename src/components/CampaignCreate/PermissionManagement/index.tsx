import React from 'react';
import CButtonShadow from '@/components/common/CButtonShadow';
import { useRouter } from 'next/router';
import TablePermission from './TablePermission';

function PermissionManagement() {
  const router = useRouter();

  return (
    <div className="px-[48px] pt-[32px]">
      <div className="border-b-2 border-[#333] flex justify-between items-center pb-[24px] mb-[47px]">
        <span className="text-[32px] font-bold">権限管理</span>
        <div className="w-[174px]  h-[56px]">
          <CButtonShadow
            classBgColor="bg-main-text"
            classRounded="rounded-[6px]"
            classShadowColor="bg-white"
            onClick={() => router.push('/campaign-creator/permission-management/new')}
            shadowSize="normal"
            title="追加する"
            withIcon={{
              position: 'left',
              icon: (
                <svg fill="none" height="18" viewBox="0 0 18 18" width="18" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1 9C1 4.59375 4.5625 1 9 1C13.4062 1 17 4.59375 17 9C17 13.4375 13.4062 17 9 17C4.5625 17 1 13.4375 1 9ZM9 12.5C9.40625 12.5 9.75 12.1875 9.75 11.75V9.75H11.75C12.1562 9.75 12.5 9.4375 12.5 9C12.5 8.59375 12.1562 8.25 11.75 8.25H9.75V6.25C9.75 5.84375 9.40625 5.5 9 5.5C8.5625 5.5 8.25 5.84375 8.25 6.25V8.25H6.25C5.8125 8.25 5.5 8.59375 5.5 9C5.5 9.4375 5.8125 9.75 6.25 9.75H8.25V11.75C8.25 12.1875 8.5625 12.5 9 12.5Z"
                    fill="white"
                  />
                </svg>
              ),
            }}
          />
        </div>
      </div>
      <TablePermission />
    </div>
  );
}

export default PermissionManagement;
