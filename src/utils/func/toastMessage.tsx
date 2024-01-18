import CButtonShadow from '@/components/common/CButtonShadow';
import XIcon from '@/components/common/icons/XIcon';
import { notification } from 'antd';

type MessageType = 'success' | 'error' | 'default';

notification.config({
  top: 70,
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

const toastMessage = (message: string, type?: MessageType) => {
  switch (type) {
    case 'success':
      return notification.open({
        message,
        className: 'custom-antd-notification custom-antd-notification--success',
      });
    case 'error':
      return notification.open({
        message,
        className: 'custom-antd-notification custom-antd-notification--error',
      });
    case 'default':
    default:
      return notification.open({
        message,
        className: 'custom-antd-notification',
      });
  }
};

export default toastMessage;
