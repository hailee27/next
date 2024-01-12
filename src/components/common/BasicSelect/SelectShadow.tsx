import React, { useEffect, useRef, useState } from 'react';
import { Popover } from 'antd';
import CButtonShadow from '../CButtonShadow';
import styles from './index.module.scss';

interface Props {
  options?: {
    label: string | number;
    value: string | number;
  }[];
  onChange?: (value: string | number) => void;
  value?: string | number;
}

function SelectShadow(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { options, onChange, value: valueForm } = props;
  const [value, setValue] = useState<number | string>(valueForm ?? '');
  const [open, setOpen] = useState<boolean>(false);
  const refButtonShadow = useRef<HTMLButtonElement | null>(null);
  const [offSetPopUp, setOffSetPopUp] = useState<number>(0);
  useEffect(() => {
    setOffSetPopUp(Number(refButtonShadow.current?.offsetWidth));
    window.onresize = () => {
      setOffSetPopUp(Number(refButtonShadow.current?.offsetWidth));
    };
  }, [window, refButtonShadow]);

  return (
    <div className={styles.customSelectShadow}>
      <Popover
        align={{ offset: [0, 8] }}
        arrow={false}
        content={
          <div className="w-full text-[14px] font-bold text-[#333] ">
            {options?.map((item) => (
              <div
                className="px-[40px] py-[10px] flex items-center space-x-[10px] hover:bg-[#F2F2F2] first:rounded-t-[6px] last:rounded-b-[6px]"
                key={item.value}
                onClick={() => {
                  setOpen(false);
                  setValue(item.value);
                  onChange?.(item.value);
                }}
                onKeyPress={undefined}
                role="button"
                tabIndex={0}
              >
                <div className="w-[10px]">
                  {value === item.value && (
                    <svg fill="none" height="9" viewBox="0 0 12 9" width="12" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 4.5L3.5 7.5L11 1.5" stroke="#333333" strokeLinecap="round" strokeWidth="2" />
                    </svg>
                  )}
                </div>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        }
        onOpenChange={(e) => setOpen(e)}
        open={open}
        overlayInnerStyle={{ borderRadius: '6px', border: '2px solid #333', padding: '0px' }}
        overlayStyle={{ width: `${offSetPopUp}px` }}
        placement="bottom"
        trigger="click"
      >
        <CButtonShadow
          classBgColor="bg-white"
          classShadowColor="bg-main-text"
          onClick={() => {
            setOffSetPopUp(Number(refButtonShadow.current?.offsetWidth));
            setOpen(!open);
          }}
          ref={refButtonShadow}
          textClass="!justify-between px-[40px]"
          title={String(value)}
          withIcon={{
            position: 'right',
            icon: (
              <svg fill="none" height="15" viewBox="0 0 14 15" width="14" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12.1494 6.72266L12.751 7.32422C12.9971 7.59766 12.9971 8.00781 12.751 8.25391L7.44629 13.5586C7.17285 13.832 6.7627 13.832 6.5166 13.5586L1.18457 8.25391C0.938477 8.00781 0.938477 7.57031 1.18457 7.32422L1.78613 6.72266C2.05957 6.44922 2.46973 6.47656 2.74316 6.72266L5.8877 10.0312V2.15625C5.8877 1.80078 6.16113 1.5 6.54395 1.5H7.41895C7.77441 1.5 8.0752 1.80078 8.0752 2.15625V10.0312L11.1924 6.72266C11.4658 6.47656 11.876 6.44922 12.1494 6.72266Z"
                  fill="#333333"
                />
              </svg>
            ),
          }}
        />
      </Popover>
    </div>
  );
}
SelectShadow.defaultProps = {
  options: undefined,
  value: undefined,
  onChange: undefined,
};
export default SelectShadow;
