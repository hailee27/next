import { notification } from 'antd';

type MessageType = 'success' | 'error' | 'default';

notification.config({
  top: 70,
  duration: 3,
});

const toastMessage = (message: string, type?: MessageType) => {
  switch (type) {
    case 'success':
      return notification.open({
        message,
        // icon: <IssuesCloseOutlined style={{ color: '#52c41a' }} />,
      });
    case 'error':
      return notification.open({
        message,
        // icon: <InfoCircleOutlined style={{ color: '#E70000' }} />,
      });
    case 'default':
    default:
      return notification.open({
        message,
        // icon: <InfoCircleOutlined />,
      });
  }
};

export default toastMessage;
