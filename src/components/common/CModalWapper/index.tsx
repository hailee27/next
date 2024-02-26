import React, { useEffect } from 'react';
import CButtonClassic from '../CButtonClassic';
import XCricleIcon from '../icons/XCricleIcon';
import XMarkIcon from '../icons/XMarkIcon';

interface IComponentProps {
  isOpen: boolean;
  onCancel: () => void;
  modalWidth?: number;

  children: React.ReactNode;
}

export default function CModalWapper({
  isOpen,
  onCancel,
  modalWidth,

  children,
}: IComponentProps) {
  useEffect(() => {
    const scrollBarWidth = window.innerWidth - document.body.clientWidth;
    if (isOpen) {
      document.body.classList.add('fixed-page');
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.classList.remove('fixed-page');
      document.body.style.paddingRight = 'unset';
    }
  }, [isOpen]);

  return (
    <div>
      {isOpen && (
        <div className="w-screen h-screen top-0 left-0 right-0 bottom-0 fixed z-[999999]">
          <div
            aria-hidden
            className="w-screen h-screen top-0 left-0 right-0 bottom-0 fixed z-[999999] bg-[rgba(51,_51,_51,_0.9)]"
            onClick={onCancel}
          />
          <div
            className=" absolute left-[50%] top-[50%] translate-x-[-50%]  translate-y-[-50%] z-[99999999] "
            style={{
              width: `${modalWidth}px`,
              animation: 'modalDropTop 0.2s linear',
            }}
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
          </div>
        </div>
      )}
    </div>
  );

  // return (
  //   <Modal
  //     closeIcon={false}
  //     destroyOnClose
  //     footer={false}
  //     onCancel={onCancel}
  //     open={isOpen}
  //     rootClassName="clout-custom-modal"
  //     width={modalWidth}
  //   >
  //     <div className="flex justify-end">
  //       <div aria-hidden="true" className="cursor-pointer" onClick={onCancel}>
  //         <XCricleIcon />
  //       </div>
  //     </div>
  //     <div className="h-[24px]" />
  //     <div className="bg-white rounded-[16px]  py-[48px] px-[24px]">{children}</div>
  //     <div className="h-[40px]" />
  //     <div className="flex justify-center">
  //       <div className="w-[139px] h-[47px]">
  //         <CButtonClassic
  //           customClassName="!bg-[#FFF] !text-main-text !text-[14px]
  //           !font-bold"
  //           onClick={onCancel}
  //           title="閉じる"
  //           withIcon={{
  //             position: 'left',
  //             icon: <XMarkIcon />,
  //           }}
  //         />
  //       </div>
  //     </div>
  //   </Modal>
  // );
}
CModalWapper.defaultProps = {
  modalWidth: 343,
};
