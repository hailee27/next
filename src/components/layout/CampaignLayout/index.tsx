import React from 'react';
import { isMobile } from 'react-device-detect';
import CreatorRoleFeedbackModal from '@/components/CreatorRoleFeedbackModal';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import SideBar from './SideBar';
import Header from './Header';
import MainFooter from '../_core/MainFooter';
import HeaderMo from './HeaderMo';

interface Props {
  children: JSX.Element;
}

function CampaignLayout({ children }: Props) {
  const router = useRouter();
  const { accessToken, user } = useSelector((state: RootState) => state.auth);

  if (
    accessToken &&
    router.pathname.startsWith('/campaign-creator') &&
    (user?.twoFactorMethod === 'NONE' || user?.emailId === null)
  ) {
    return <CreatorRoleFeedbackModal />;
  }
  if (isMobile) {
    return (
      <div>
        <HeaderMo />
        <div className="container-min-height bg-[#F6F6F6]">{children}</div>
        <MainFooter />
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#333] font-notoSans">
      <header className="h-[76px] sticky top-0 bg-white z-10">
        <Header />
      </header>
      <div className="flex h-full flex-1 bg-[#F6F6F6]">
        <div className="w-[264px] h-[calc(100vh_-_76px)] sticky top-[76px]">
          <SideBar />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}

export default CampaignLayout;
