/* eslint-disable max-lines-per-function */

import CButtonShadow from '@/components/common/CButtonShadow';

import BarIcon from '@/components/common/icons/BarIcon';
import XIcon from '@/components/common/icons/XIcon';
import { setIsOpenMainMenu } from '@/redux/slices/common.slice';
import { RootState } from '@/redux/store';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListIcon from '@/components/common/icons/ListIcon';
import FileIcon from '@/components/common/icons/FileIcon';
import CheckIcon from '@/components/common/icons/CheckIcon';
import BriefcaseIcon from '@/components/common/icons/BriefcaseIcon';
import YenIcon from '@/components/common/icons/YenIcon';
import CButtonClassic from '@/components/common/CButtonClassic';
import { logout } from '@/redux/slices/auth.slice';
import { ListItem } from './SideBar';

export default function HeaderMo() {
  const { isOpenMainMenu } = useSelector((store: RootState) => store.common);
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpenMainMenu) {
      document.body.classList.add('stop-scrolling');
    } else {
      document.body.classList.remove('stop-scrolling');
    }
  }, [isOpenMainMenu]);

  useEffect(() => {
    const start = () => {
      dispatch(setIsOpenMainMenu(false));
    };
    const end = () => {};
    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', end);
    router.events.on('routeChangeError', end);

    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', end);
      router.events.off('routeChangeError', end);
    };
  }, []);
  return (
    <div className="font-notoSans  bg-white">
      <div className="h-[var(--main-header-height-mobile)] xl:h-[var(--main-header-height-pc)]   px-[20px] flex justify-between items-center w-full  border-t-[2px] border-b-[2px] border-[#333] border-solid">
        <Link className="w-[81px] h-[24px] xl:w-[100px] xl:h-[30px] hover:cursor-pointer" href="/">
          <Image
            alt="footer logo"
            className="w-full h-full object-cover"
            height="0"
            sizes="100vw"
            src="/assets/images/logo 1.png"
            width="0"
          />
        </Link>

        <div className="w-[42px] h-[42px] xl:hidden">
          <CButtonShadow
            classBgColor="bg-white"
            classRounded="rounded-[4px]"
            classShadowColor="bg-main-text"
            onClick={() => {
              dispatch(setIsOpenMainMenu(true));
            }}
            shadowSize="small"
            withIcon={{
              position: 'right',
              icon: <BarIcon />,
            }}
          />
        </div>
      </div>
      <div
        aria-hidden="true"
        className={clsx(
          'fixed top-0 w-full h-screen z-[1000] duration-500 transition-all xl:hidden',
          isOpenMainMenu ? 'right-0' : 'right-[-100vw]'
        )}
        onClick={() => {
          dispatch(setIsOpenMainMenu(false));
        }}
      >
        <div
          className={clsx(
            'fixed top-0 left-0 w-full h-screen  bg-[#333]/[60%] duration-200 transition-all ',
            isOpenMainMenu ? 'opacity-100 visible z-[1000]' : 'invisible opacity-0 z-[-1]'
          )}
        />

        <div
          aria-hidden="true"
          className={clsx(
            ' bg-white  w-[302px]  mb-h:h-[100vh] h-[75vh]  absolute z-[1001]  duration-500 transition-all ',
            isOpenMainMenu ? ' right-0 top-0' : ' right-[-500px] top-0'
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full h-full overflow-y-auto bg-[#04AFAF] ">
            <div className="w-[42px] h-[42px] absolute right-[20px] top-[11px] z-[1111] ">
              <CButtonShadow
                classBgColor="bg-white"
                classRounded="rounded-[4px]"
                classShadowColor="bg-main-text"
                onClick={() => {
                  dispatch(setIsOpenMainMenu(false));
                }}
                shadowSize="small"
                withIcon={{
                  position: 'right',
                  icon: <XIcon />,
                }}
              />
            </div>

            <div className=" border-[#2D3648]  bg-[#04AFAF] h-full flex flex-col py-[28px] text-white">
              <div className="pl-[40px] pt-[10px]">
                <div className="py-[12px]  flex items-center space-x-[10px]">
                  <span className="text-[11px] font-medium">キャンペーン</span>
                </div>
                <ListItem icon={<ListIcon />} title="キャンペーン一覧" to="/campaign-creator/list" />
                <ListItem icon={<FileIcon color="#fff" />} title="キャンペーン新規作成" to="/campaign-creator/create" />
                <ListItem icon={<CheckIcon />} title="完了済みのキャンペーン" to="/campaign-creator/completed" />
                <div className="py-[12px]  flex items-center space-x-[10px]">
                  <span className="text-[11px] font-medium">管理</span>
                </div>
                <ListItem icon={<BriefcaseIcon />} title="権限管理" to="/campaign-creator/permission-management" />
                <ListItem
                  icon={<YenIcon color="#fff" />}
                  title="デポジット残高"
                  to="/campaign-creator/deposit-balance"
                />
              </div>
              <div className="ml-[40px]  border-y flex flex-col py-[10px] ">
                <ListItem title="組織情報" to="/campaign-creator/organize-information" />
                <ListItem title="マイページ" to="/my-page" />
              </div>
              <div className="flex flex-col text-[14px] pb-[40px] ml-[40px] ">
                <div className="flex flex-col space-y-[4px] py-[20px]">
                  <span>{user?.memberCompany?.name}</span>
                  <span>{user?.companyRole?.membership === 'MEMBER' ? 'メンバー' : '管理者'}</span>
                  <span>{user?.email?.email}</span>
                </div>

                <CButtonClassic
                  customClassName="px-[32px] !py-[13px] h-[44px] !w-[164px] !bg-transparent !text-[#ffffff] !border-[#ffffff] !text-[12px]"
                  onClick={() => {
                    dispatch(logout());
                    // router.push('/auth/sign-in/campaign-creator');
                  }}
                  title="ログアウト"
                  withIcon={{
                    position: 'left',
                    icon: (
                      <svg height="12" viewBox="0 0 512 512" width="12" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"
                          fill="#fff"
                        />
                      </svg>
                    ),
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
