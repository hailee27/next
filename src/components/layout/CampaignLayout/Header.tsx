import CButtonClassic from '@/components/common/CButtonClassic';
import { logout } from '@/redux/slices/auth.slice';
import { RootState } from '@/redux/store';
// import { useLogoutMutation } from '@/redux/endpoints/auth';
// import { wrapper } from '@/redux/store';
import { Image } from 'antd';

import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  // const [logout] = useLogoutMutation();
  // useEffect(() => {
  //   if (!accessToken) {
  //     router.push('/auth/sign-in/campaign-creator');
  //   }
  // }, [accessToken]);

  return (
    <div className=" border-[#2D3648] h-full flex items-center justify-between px-[40px]">
      <Image
        alt="logo"
        className="cursor-pointer"
        height={30}
        onClick={() => router.push('/campaign')}
        preview={false}
        src="/assets/images/logo 1.png"
      />

      <div className="flex space-x-[40px] text-[14px] text-[#333] font-medium items-center ">
        <div className="flex space-x-[16px] h-[21px]">
          <span>ONE.course</span>
          <span className="border-x-[1px] border-[#AAA] px-[16px]">管理者</span>
          <span>{user?.email.email}</span>
        </div>
        <div>
          <CButtonClassic
            customClassName="px-[32px] !py-[13px] h-[44px] bg-white !text-[#333] !text-[12px]"
            onClick={() => {
              dispatch(logout());
              router.push('/auth/sign-in/campaign-creator');
            }}
            title="ログアウト"
            withIcon={{
              position: 'left',
              icon: (
                <svg height="12" viewBox="0 0 512 512" width="12" xmlns="http://www.w3.org/2000/svg">
                  <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" />
                </svg>
              ),
            }}
          />
        </div>
        {/* <span>ログアウト</span> */}
      </div>
    </div>
  );
}

export default Header;
