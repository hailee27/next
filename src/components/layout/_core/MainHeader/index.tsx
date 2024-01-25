import BarIcon from '@/components/common/icons/BarIcon';
import XIcon from '@/components/common/icons/XIcon';
import clsx from 'clsx';
import { useEffect, useMemo } from 'react';
import CButtonShadow from '@/components/common/CButtonShadow';
import { logout } from '@/redux/slices/auth.slice';
import { setIsOpenMainMenu } from '@/redux/slices/common.slice';
import { RootState } from '@/redux/store';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import ArrowDown from '@/components/common/icons/ArrowDown';

export default function MainHeader() {
  const { accessToken } = useSelector((store: RootState) => store.auth);
  const { isOpenMainMenu } = useSelector((store: RootState) => store.common);

  const router = useRouter();
  const dispatch = useDispatch();
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
        to: '/campaigns',
      },
      {
        key: 3,
        text: 'マイページ',
        to: '/my-page',
      },
      { key: 4, text: 'キャンペーン作成', to: '/campaign-creator' },
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

  const onChangeAuth = async () => {
    try {
      dispatch(setIsOpenMainMenu(false));

      if (accessToken) {
        dispatch(logout());
      }
      router.push('/auth/sign-in/campaign-implementer');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

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
    <div
      className="font-notoSans  bg-white"
      // /sticky z-[999999] top-0
    >
      <div className="h-[var(--main-header-height-mobile)] px-[20px] flex justify-between items-center w-full  border-t-[2px] border-b-[2px] border-[#333] border-solid">
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
          'fixed top-0 w-full h-screen z-[1000] duration-500 transition-all',
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
            ' bg-white  w-[302px]  mb-h:h-[100vh] h-[75vh] border-[2px] border-[#333] border-r-[0px] absolute z-[1001]  duration-500 transition-all  py-[88px] pb-[10px] px-[48px] pr-[20px]',
            isOpenMainMenu ? ' right-0 top-0' : ' right-[-500px] top-0'
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
                  dispatch(setIsOpenMainMenu(false));
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
                <Link
                  className={clsx(
                    'text-[20px] font-bold tracking-[0.6px]  ',
                    i.text === 'Home' ? 'font-montserrat' : ''
                  )}
                  href={i.to}
                  key={i.key}
                >
                  {i.text}
                </Link>
              ))}
            </div>
            <div className="h-[40px]" />
            <div className=" h-[53px]">
              <CButtonShadow onClick={onChangeAuth} title={accessToken ? 'ログアウト' : 'ログイン'} />
            </div>
            {accessToken ? (
              ''
            ) : (
              <Link
                className="text-[13px] font-bold pb-[6px] border-b-[2px] border-b-[#333] flex items-center justify-center !w-fit mx-auto mt-[16px]"
                href="/auth/sign-up"
              >
                新規会員登録の方はこちら <ArrowDown className=" rotate-[-90deg] w-[14px] h-[14px]" />
              </Link>
            )}
            <div className="h-[40px]" />
            <div className="flex flex-col gap-[16px]">
              {SubNavigation.map((i) => (
                <Link className={clsx('text-[13px]  tracking-[4px]  ')} href={i.to} key={i.key}>
                  {i.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
