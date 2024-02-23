import LineIcon from '@/components/common/icons/LineIcon';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const FooterNavigation = [
  {
    key: 1,
    text: 'Home',
    to: '/',
  },
  { key: 2, text: 'キャンペーン', to: '/campaigns' },
  {
    key: 3,
    text: 'マイページ',
    to: '/my-page',
  },
  {
    key: 4,
    text: 'キャンペーン作成',
    to: '/campaign-creator/create',
  },
  {
    key: 5,
    text: 'お問い合わせ',
    to: '/inquiry',
  },
  {
    key: 6,
    text: 'よくある質問',
    to: '/faqs',
  },
  {
    key: 7,
    text: '利用規約',
    to: '/terms-of-service',
  },
  {
    key: 8,
    text: '特定商取引法に基づく表示',
    to: '/specified-commercial-transactions-law',
  },
  {
    key: 9,
    text: 'プライバシーポリシー',
    to: '/privacy-policy',
  },
];

const FooterSocialLinksV1 = [
  {
    key: 1,
    to: 'https://twitter.com/',
    icon: <Image alt="x icon" height={40} src="/assets/images/footer-x-img.png" width={40} />,
  },
  {
    key: 2,
    to: 'https://line.me/',
    icon: <LineIcon />,
  },
];

export default function MainFooter() {
  const router = useRouter();
  return (
    <div className="flex items-center flex-col gap-[40px] lg:gap-[100px] pt-[56px] pb-[16px] lg:pb-[24px] lg:pt-[100px] font-notoSans">
      <div className="flex items-center flex-col gap-[40px] lg:flex-row lg:justify-between lg:items-end  max-w-[1000px] lg:w-[1000px] mx-auto">
        <div className="flex items-center flex-col gap-[40px] lg:gap-[32px] lg:items-start ">
          <div
            aria-hidden
            className="w-[81px] h-[24px] lg:w-[135px] lg:h-[40px]"
            onClick={() => {
              router.push('/');
            }}
          >
            <Image
              alt="footer logo"
              className="w-full h-full object-cover"
              height="0"
              sizes="100vw"
              src="/assets/images/logo 1.png"
              width="0"
            />
          </div>

          <div className="flex flex-col gap-[16px] items-center justify-center lg:items-start">
            <div className="flex flex-col lg:flex-row gap-[16px] items-center  justify-center">
              <div className="flex flex-wrap gap-[16px] items-center justify-center">
                {FooterNavigation.slice(0, 3).map((i) => (
                  <Link
                    className={clsx('text-[16px] font-medium', i.text === 'Home' ? 'font-montserrat' : '')}
                    href={i.to}
                    key={i.key}
                  >
                    {i.text}
                  </Link>
                ))}
              </div>
              <div className="flex flex-wrap gap-[16px] items-center justify-center">
                {FooterNavigation.slice(3, 6).map((i) => (
                  <Link className="text-[16px] font-medium" href={i.to} key={i.key}>
                    {i.text}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-[16px] lg:gap-[0px] items-center justify-center">
              {FooterNavigation.slice(6, 9).map((i, idx) => (
                <Link
                  className={clsx(
                    'text-[12px] font-medium lg:px-[24px] lg:border-r-[1px] lg:border-r-[#aaa] lg:text-[11px] leading-[16px]',
                    idx === 0 ? 'lg:border-l-[1px] lg:border-l-[#aaa] ' : ' '
                  )}
                  href={i.to}
                  key={i.key}
                >
                  {i.text}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-[16px]">
          {FooterSocialLinksV1.map((i) => (
            <Link href={i.to} key={i.key} target="_blank">
              {i.icon}
            </Link>
          ))}
        </div>
      </div>

      <div className=" w-full border-t-solid border-t-[2px] border-t-[#333] pt-[14px] lg:pt-[22px] text-[13px] text-center text-gray-2 font-[350] leading-[19px]">
        Copyright © 2024 clout All Rights Reserved
      </div>
    </div>
  );
}
