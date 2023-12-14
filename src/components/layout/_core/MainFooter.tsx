import FacebookIcon from '@/components/common/icons/FacebookIcon';
import InstagramIcon from '@/components/common/icons/InstagramIcon';
import LinkedinIcon from '@/components/common/icons/LinkedinIcon';
import TwitterIcon from '@/components/common/icons/TwitterIcon';
import Image from 'next/image';
import React from 'react';

const FooterNavigation = [
  {
    text: 'Home',
    to: '/',
  },
  {
    text: 'キャンペーン',
    to: '/',
  },
  {
    text: 'マイページ',
    to: '/',
  },
  {
    text: 'キャンペーン作成',
    to: '/',
  },
  {
    text: '問い合わせ',
    to: '/',
  },
  {
    text: 'プライバシーポリシー',
    to: '/',
  },
  {
    text: '利用規約',
    to: '/',
  },
];

const FooterSocialLinks = [
  {
    to: '/',
    icon: <FacebookIcon />,
  },
  {
    to: '/',
    icon: <TwitterIcon />,
  },
  {
    to: '/',
    icon: <InstagramIcon />,
  },
  {
    to: '/',
    icon: <LinkedinIcon />,
  },
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
      <div className="flex flex-wrap gap-[16px]">
        {FooterNavigation.map((i) => (
          <a className="text-[16px] font-medium" href={i.to} key={i.to}>
            {i.text}
          </a>
        ))}
      </div>
      <div className="flex flex-wrap gap-[16px]">
        {FooterSocialLinks.map((i) => (
          <a href={i.to} key={i.to}>
            {i.icon}
          </a>
        ))}
      </div>
      <div className=" w-full border-t-solid border-t-[2px] border-t-[#333] pt-[16px] text-[13px] text-center !font-[350]">
        Copyright © 2024 clout All Rights Reserved
      </div>
    </div>
  );
}
