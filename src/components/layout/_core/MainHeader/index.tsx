import BarIcon from '@/components/common/icons/BarIcon';
import XIcon from '@/components/common/icons/XIcon';
import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';

import Image from 'next/image';
import CButtonShadow from '@/components/common/CButtonShadow';
import Link from 'next/link';

export default function MainHeader() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const MainNavigation = useMemo(
    () => [
      {
        key: 1,
        text: 'Home',
        to: '/',
      },
      {
        key: 2,
        text: 'キャンペーン一覧',
        to: '/',
      },
      {
        key: 3,
        text: 'マイページ',
        to: '/',
      },
      { key: 4, text: 'キャンペーン作成', to: '/' },
      {
        key: 5,
        text: 'お問い合わせ',
        to: '/inquiry',
      },
    ],
    []
  );
  const SubNavigation = useMemo(
    () => [
      {
        key: 1,
        text: '利用規約',
        to: '/terms-of-service',
      },
      {
        key: 2,
        text: '特定商取引法に基づく表示',
        to: '/specified-commercial-transactions-law',
      },
      {
        key: 3,
        text: 'プライバシーポリシー',
        to: '/privacy-policy',
      },
    ],
    []
  );
  useEffect(() => {
    if (isOpenMenu) {
      document.body.classList.add('stop-scrolling');
    } else {
      document.body.classList.remove('stop-scrolling');
    }
  }, [isOpenMenu]);
  return (
    <div className="font-notoSans sticky z-[999] top-0 bg-white">
      <div className="h-[64px] px-[20px] flex justify-between items-center w-full  border-t-[2px] border-b-[2px] border-[#333] border-solid">
        <Link className="w-[81px] h-[24px] hover:cursor-pointer" href="/">
          <Image
            alt="footer logo"
            className="w-full h-full object-cover"
            height="0"
            sizes="100vw"
            src="/assets/images/logo 1.png"
            width="0"
          />
        </Link>
        <div className="w-[42px] h-[42px]">
          <CButtonShadow
            classBgColor="bg-white"
            classRounded="rounded-[4px]"
            classShadowColor="bg-main-text"
            onClick={() => {
              setIsOpenMenu(true);
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
          'fixed top-0 w-full h-screen z-[1000] duration-500 transition-all',
          isOpenMenu ? 'right-0' : 'right-[-100vw]'
        )}
        onClick={() => {
          setIsOpenMenu(false);
        }}
      >
        <div
          className={clsx(
            'fixed top-0 left-0 w-full h-screen  bg-[#333]/[60%] duration-200 transition-all ',
            isOpenMenu ? 'opacity-100 visible z-[1000]' : 'invisible opacity-0 z-[-1]'
          )}
        />

        <div
          aria-hidden="true"
          className={clsx(
            ' bg-white  w-[302px]  mb-h:h-[100vh] h-[75vh] border-[2px] border-[#333] border-r-[0px] absolute z-[1001]  duration-500 transition-all  py-[88px] pb-[10px] px-[48px] pr-[20px]',
            isOpenMenu ? ' right-0 top-0' : ' right-[-500px] top-0'
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full h-full overflow-y-auto pb-[70px] pr-[28px]">
            <div className="w-[42px] h-[42px] absolute right-[20px] top-[11px] z-[1111] ">
              <CButtonShadow
                classBgColor="bg-white"
                classRounded="rounded-[4px]"
                classShadowColor="bg-main-text"
                onClick={() => {
                  setIsOpenMenu(false);
                }}
                shadowSize="small"
                withIcon={{
                  position: 'right',
                  icon: <XIcon />,
                }}
              />
            </div>
            <div className="flex flex-col gap-[24px]">
              {MainNavigation.map((i) => (
                <a
                  className={clsx(
                    'text-[20px] font-bold tracking-[0.6px]  ',
                    i.text === 'Home' ? 'font-montserrat' : ''
                  )}
                  href={i.to}
                  key={i.key}
                >
                  {i.text}
                </a>
              ))}
            </div>
            <div className="my-[40px] h-[53px]">
              <CButtonShadow onClick={() => {}} title="ログイン" />
            </div>
            <div className="flex flex-col gap-[16px]">
              {SubNavigation.map((i) => (
                <a className={clsx('text-[13px]  tracking-[4px]  ')} href={i.to} key={i.key}>
                  {i.text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
