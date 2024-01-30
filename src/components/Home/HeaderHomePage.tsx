import React from 'react';
import { useRouter } from 'next/router';
import { Image } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import CButtonShadow from '../common/CButtonShadow';
import SearchIcon from '../common/icons/SearchIcon';
import FileIcon from '../common/icons/FileIcon';

function HeaderHomePage() {
  const { accessToken } = useSelector((store: RootState) => store.auth);
  const router = useRouter();
  return (
    <div
      className="flex justify-between flex-col min-h-[693px]"
      style={{
        background: 'linear-gradient(2deg, rgba(160, 255, 158, 0.50) 1.61%, rgba(166, 255, 255, 0.50) 98.38%), #FFF',
      }}
    >
      <div className="flex-1 text-center relative">
        <Image alt="" className="mt-[25px]" preview={false} src="/assets/images/banner.png" />
        <div className="absolute w-full top-[261px] px-[20px]">
          <div className="flex flex-col items-start space-y-[8px]">
            <span className="text-[30px] font-bold  px-[14px] bg-white">お気に入りの</span>
            <span className="text-[30px] font-bold  px-[14px] bg-white">コミュニティに</span>
            <span className="text-[30px] font-bold  px-[14px] bg-white">
              <span className="text-[#F77803]">参加して</span>
              <span className="text-[#04AFAF]">報酬を得よう</span>
            </span>
          </div>
          <p className="mt-[20px] text-[13px] font-bold text-left">
            様々なタスクをこなして、コミュニティを知り、報酬がもらえるロイヤリティ・プログラムに参加しよう
          </p>
        </div>
      </div>
      <div className="px-[20px] flex flex-col gap-[8px] mb-[40px]">
        <div className="h-[66px]">
          <CButtonShadow
            classBgColor="bg-[#333]"
            classShadowColor="bg-[#fff]"
            onClick={() => {
              if (accessToken) {
                router.push('/campaigns');
              } else {
                router.push('/auth/sign-in/campaign-implementer');
              }
            }}
            textClass="text-white text-[16px] font-bold"
            title="キャンペーンを探す"
            withIcon={{
              position: 'left',
              icon: <SearchIcon />,
            }}
          />
        </div>
        <div className="h-[66px]">
          <CButtonShadow
            classBgColor="bg-btn-gradation"
            classShadowColor="bg-[#333]"
            onClick={() => {
              if (accessToken) {
                router.push('/campaign-creator/list');
              } else {
                router.push('/auth/sign-in/campaign-creator');
              }
            }}
            textClass="text-main-text text-[16px] font-bold"
            title="キャンペーンを作成する"
            withIcon={{
              position: 'left',
              icon: <FileIcon />,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default HeaderHomePage;
