import FacebookIcon from '@/components/common/icons/FacebookIcon';
import InstagramIcon from '@/components/common/icons/InstagramIcon';
import LinkedinIcon from '@/components/common/icons/LinkedinIcon';
import TwitterIcon from '@/components/common/icons/TwitterIcon';
import Image from 'next/image';
import React from 'react';

const FooterNavigation = [
  {
    key: 1,
    text: 'Home',
    to: '/',
  },
  { key: 2, text: 'キャンペーン', to: '/' },
  {
    key: 3,
    text: 'マイページ',
    to: '/',
  },
  {
    key: 4,
    text: 'キャンペーン作成',
    to: '/',
  },
  {
    key: 5,
    text: '問い合わせ',
    to: '/',
  },
  {
    key: 6,
    text: '利用規約',
    to: '/terms-of-service',
  },
  {
    key: 7,
    text: '特定商取引法に基づく表示',
    to: '/',
  },
  {
    key: 8,
    text: 'プライバシーポリシー',
    to: '/privacy-policy',
  },
];

const FooterSocialLinks = [
  {
    key: 1,
    to: '/',
    icon: <FacebookIcon />,
  },
  { key: 2, to: '/', icon: <TwitterIcon /> },
  {
    key: 3,
    to: '/',
    icon: <InstagramIcon />,
  },
  { key: 4, to: '/', icon: <LinkedinIcon /> },
];

export default function MainFooter() {
  return (
    <div className="flex items-center flex-col gap-[40px] pt-[56px] pb-[16px] font-notoSans">
      <div className="w-[81px] h-[24px]">
        <Image
          alt="footer logo"
          className="w-full h-full object-cover"
          height="0"
          sizes="100vw"
          src="/assets/images/logo 1.png"
          width="0"
        />
      </div>
      <div className="flex flex-wrap gap-[16px] items-center justify-center">
        <div className="flex flex-wrap gap-[16px] items-center justify-center">
          {FooterNavigation.slice(0, 3).map((i) => (
            <a className="text-[12px] font-medium" href={i.to} key={i.to}>
              {i.text}
            </a>
          ))}
        </div>
        <div className="flex flex-wrap gap-[16px] items-center justify-center">
          {FooterNavigation.slice(3, 5).map((i) => (
            <a className="text-[12px] font-medium" href={i.to} key={i.to}>
              {i.text}
            </a>
          ))}
        </div>
        <div className="flex flex-wrap gap-[16px] items-center justify-center">
          {FooterNavigation.slice(5, 8).map((i) => (
            <a className="text-[12px] font-medium" href={i.to} key={i.to}>
              {i.text}
            </a>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-[16px]">
        {FooterSocialLinks.map((i) => (
          <a href={i.to} key={i.key}>
            {i.icon}
          </a>
        ))}
      </div>
      <div className=" w-full border-t-solid border-t-[2px] border-t-[#333] pt-[16px] text-[13px] text-center text-gray-2 font-[350]">
        Copyright © 2024 clout All Rights Reserved
      </div>
    </div>
  );
}
