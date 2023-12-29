import FileIcon from '@/components/common/icons/FileIcon';
import ListIcon from '@/components/common/icons/ListIcon';
import { Image } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import CheckIcon from '@/components/common/icons/CheckIcon';
import BriefcaseIcon from '@/components/common/icons/BriefcaseIcon';
import YenIcon from '@/components/common/icons/YenIcon';
import styles from './index.module.scss';

const ListItem = ({ title, to, icon }: { title: string; to: string; icon?: JSX.Element }) => {
  const router = useRouter();
  return (
    <Link href={to}>
      <div className={`${styles.sideBar}  ${router.pathname.startsWith(to) && styles.active}`}>
        {icon || <Image alt="" preview={false} src="/icons/icon-placeholder.svg" />}
        <span className="text-[14px] font-bold">{title}</span>
      </div>
    </Link>
  );
};
ListItem.defaultProps = {
  icon: undefined,
};
function SideBar() {
  return (
    <div className=" border-[#2D3648] rounded-tr-[48px] bg-[#04AFAF] h-full flex flex-col py-[24px] text-white">
      <div className="flex-1 pl-[32px]">
        {/* <ListItem title="TOP" to="/top" /> */}
        <div className="py-[12px]  flex items-center space-x-[10px]">
          <span className="text-[11px] font-medium">キャンペーン</span>
        </div>
        <ListItem icon={<ListIcon />} title="キャンペーン一覧" to="/campaign/list" />
        <ListItem icon={<FileIcon color="#fff" />} title="キャンペーン新規作成" to="/campaign/create" />
        <ListItem icon={<CheckIcon />} title="完了済みのキャンペーン" to="/campaign/completed" />
        <div className="py-[12px]  flex items-center space-x-[10px]">
          <span className="text-[11px] font-medium">管理</span>
        </div>
        <ListItem icon={<BriefcaseIcon />} title="権限管理" to="/campaign/Authority-management" />
        <ListItem icon={<YenIcon color="#fff" />} title="デポジット残高" to="/campaign/Deposit-balance" />
      </div>
      <div className="h-[120px]  border-[#2D3648] flex flex-col justify-end">
        <ListItem title="組織情報" to="/campaign/organize-information" />
        <ListItem title="アカウント情報" to="/campaign/account-information" />
      </div>
    </div>
  );
}

export default SideBar;
