import CampaignRewardCardItem from '@/components/CampaignRewardCardItem';
import XCricleIcon from '@/components/common/icons/XCricleIcon';
import XMarkIcon from '@/components/common/icons/XMarkIcon';
import { Modal } from 'antd';
import { useEffect } from 'react';
import CButtonClassic from '@/components/common/CButtonClassic';
import styles from './styles.module.scss';

interface CampaignRewardModalProps {
  isOpen: boolean;
  onCancel: () => void;
}

export default function CampaignRewardModal({ isOpen, onCancel }: CampaignRewardModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  });
  return (
    <div className={styles.campaignRewardModal}>
      <Modal closeIcon={false} destroyOnClose footer={false} getContainer={false} onCancel={onCancel} open={isOpen}>
        <div className="flex justify-end">
          <div aria-hidden="true" className="cursor-pointer" onClick={onCancel}>
            <XCricleIcon />
          </div>
        </div>
        <div className="h-[24px]" />
        <div className="h-[60vh] bg-white rounded-[16px] overflow-hidden py-[48px]">
          <div className="h-full overflow-y-auto flex flex-col gap-[8px] px-[24px] custom-scroll">
            <CampaignRewardCardItem />
            <CampaignRewardCardItem />
            <CampaignRewardCardItem />
            <CampaignRewardCardItem />
            <CampaignRewardCardItem />
            <CampaignRewardCardItem />
          </div>
        </div>
        <div className="h-[40px]" />
        <div className="flex justify-center">
          <div className="w-[139px] h-[47px]">
            <CButtonClassic
              customClassName="!bg-[#FFF] !text-main-text !text-[14px] 
              !font-bold"
              onClick={onCancel}
              title="閉じる"
              withIcon={{
                position: 'left',
                icon: <XMarkIcon />,
              }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
