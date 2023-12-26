import React, { useEffect } from 'react';
import { Modal } from 'antd';
import styles from './styles.module.scss';
import XCricleIcon from '../icons/XCricleIcon';
import CButtonClassic from '../CButtonClassic';
import XMarkIcon from '../icons/XMarkIcon';

interface IComponentProps {
  isOpen: boolean;
  onCancel: () => void;
  children: React.ReactNode;
}

export default function CModalWapper({ isOpen, onCancel, children }: IComponentProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <div className={styles.cModalWapper}>
      <Modal
        closeIcon={false}
        destroyOnClose
        footer={false}
        getContainer={false}
        onCancel={onCancel}
        open={isOpen}
        style={{ top: 60 }}
      >
        <div className="flex justify-end">
          <div aria-hidden="true" className="cursor-pointer" onClick={onCancel}>
            <XCricleIcon />
          </div>
        </div>
        <div className="h-[24px]" />
        <div className="bg-white rounded-[16px]  py-[48px] px-[24px]">{children}</div>
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
