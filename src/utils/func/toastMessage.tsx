// import { InfoCircleOutlined, IssuesCloseOutlined } from '@ant-design/icons';
import { notification } from 'antd';

type MessageType = 'success' | 'error' | 'default';

const toastMessage = (message: string, type?: MessageType) => {
  switch (type) {
    case 'success':
      return notification.open({
        message,
        duration: 3,
        // icon: <IssuesCloseOutlined style={{ color: '#52c41a' }} />,
      });
    case 'error':
      return notification.open({
        message,
        duration: 3,
        // icon: <InfoCircleOutlined style={{ color: '#E70000' }} />,
      });
    case 'default':
    default:
      return notification.open({
        message,
        duration: 3,
        // icon: <InfoCircleOutlined />,
      });
  }
};

export default toastMessage;
