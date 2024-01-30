import { Modal } from 'antd';
import React from 'react';
import CButtonClassic from '../CButtonClassic';
import XCricleIcon from '../icons/XCricleIcon';
import XMarkIcon from '../icons/XMarkIcon';

interface IComponentProps {
  isOpen: boolean;
  onCancel: () => void;
  modalWidth?: number;
  top?: number;
  children: React.ReactNode;
}

export default function CModalWapper({
  isOpen,
  onCancel,
  modalWidth,
  top,

  children,
}: IComponentProps) {
  return (
    <Modal
      closeIcon={false}
      destroyOnClose
      footer={false}
      onCancel={onCancel}
      open={isOpen}
      rootClassName="clout-custom-modal"
      style={{ top }}
      width={modalWidth}
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
  );
}
CModalWapper.defaultProps = {
  modalWidth: 360,
  top: 64,
};
