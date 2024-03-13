import CButtonShadow from '@/components/common/CButtonShadow';
import XIcon from '@/components/common/icons/XIcon';
import { notification } from 'antd';

type MessageType = 'success' | 'error' | 'warning' | 'default';

notification.config({
  // top: 70,
  duration: 5,
  closeIcon: (
    <div
      style={{
        width: 28,
        height: 28,
      }}
    >
      <CButtonShadow
        classBgColor="bg-white"
        classRounded="rounded-[4px]"
        classShadowColor="bg-main-text"
        shadowSize="small"
        textClass="text-[#333] mb-[4px] text-[12px]"
        withIcon={{
          position: 'right',
          icon: <XIcon />,
        }}
      />
    </div>
  ),
});

const toastMessage = (message: string, type?: MessageType, icon?: boolean) => {
  switch (type) {
    case 'success':
      return notification.open({
        message,
        className: 'custom-antd-notification custom-antd-notification--success',
        icon: (
          <svg fill="green" height="26" viewBox="0 0 512 512" width="26" xmlns="http://www.w3.org/2000/svg">
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
          </svg>
        ),
      });
    case 'error':
      return notification.open({
        message,
        className: 'custom-antd-notification custom-antd-notification--error',
        icon: !icon && (
          <svg fill="red" height="26" viewBox="0 0 512 512" width="26" xmlns="http://www.w3.org/2000/svg">
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
          </svg>
        ),
      });
    case 'warning':
      return notification.open({
        message,
        className: 'custom-antd-notification custom-antd-notification--error',
        icon: (
          <svg fill="yellow" height="26" viewBox="0 0 512 512" width="26" xmlns="http://www.w3.org/2000/svg">
            <path d="M256 32c14.2 0 27.3 7.5 34.5 19.8l216 368c7.3 12.4 7.3 27.7 .2 40.1S486.3 480 472 480H40c-14.3 0-27.6-7.7-34.7-20.1s-7-27.8 .2-40.1l216-368C228.7 39.5 241.8 32 256 32zm0 128c-13.3 0-24 10.7-24 24V296c0 13.3 10.7 24 24 24s24-10.7 24-24V184c0-13.3-10.7-24-24-24zm32 224a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
          </svg>
        ),
      });
    case 'default':
    default:
      return notification.open({
        message,
        className: 'custom-antd-notification',
        icon: (
          <svg fill="none" height="28" viewBox="0 0 24 24" width="28" xmlns="http://www.w3.org/2000/svg">
            <g id="Warning / Info">
              <path
                d="M12 11V16M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21ZM12.0498 8V8.1L11.9502 8.1002V8H12.0498Z"
                id="Vector"
                stroke="#000000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </g>
          </svg>
        ),
      });
  }
};

export default toastMessage;
