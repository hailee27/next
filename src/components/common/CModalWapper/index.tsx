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
  bottomBtnType?: 'CANCEL' | 'OK';
  onOk?: () => void;
  bottomBtnTitle?: string;
}

export default function CModalWapper({
  isOpen,
  onCancel,
  modalWidth,
  top,
  bottomBtnType,
  onOk,
  children,
  bottomBtnTitle,
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
      {bottomBtnType === 'CANCEL' ? (
        <div className="flex justify-center">
          <div className="w-[139px] h-[47px]">
            <CButtonClassic
              customClassName="!bg-[#FFF] !text-main-text !text-[14px] 
            !font-bold"
              onClick={onCancel}
              title={bottomBtnTitle}
              withIcon={{
                position: 'left',
                icon: <XMarkIcon />,
              }}
            />
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="h-[47px]">
            <CButtonClassic
              customClassName="!bg-[#FFF] !text-main-text !text-[14px] 
            !font-bold px-[16px]"
              onClick={onOk ?? onCancel}
              title={bottomBtnTitle}
            />
          </div>
        </div>
      )}
    </Modal>
  );
}
CModalWapper.defaultProps = {
  modalWidth: 360,
  top: 64,
  onOk: undefined,
  bottomBtnType: 'CANCEL',
  bottomBtnTitle: '閉じる',
};
