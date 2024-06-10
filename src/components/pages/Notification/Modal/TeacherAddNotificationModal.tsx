import { Form, Modal } from 'antd';
import dayjs from 'dayjs';
import React from 'react';

import BasicSelectClass from '@/components/common/BasicSelectClass';
import BasicArea from '@/components/common/forms/BasicArea';
import BasicButton from '@/components/common/forms/BasicButton';
import { useSocketContext } from '@/context/SocketContext';
import { NotificationType } from '@/redux/endpoints/auth';
import { getRandomNumber } from '@/utils';

interface PropsType {
  openModal: boolean;
  setOpenModal: (v: boolean) => void;
  setNotifications: React.Dispatch<React.SetStateAction<NotificationType[]>>;
}

const TeacherAddNotificationModal = ({ openModal, setOpenModal, setNotifications }: PropsType) => {
  const { socket } = useSocketContext();
  const [form] = Form.useForm();

  const handleCancel = () => {
    setOpenModal(false);
  };

  return (
    <Modal footer={null} onCancel={handleCancel} open={openModal} title="Send Notification" width={600}>
      <Form
        autoComplete="off"
        className="space-y-[16px]"
        form={form}
        layout="vertical"
        onFinish={(values) => {
          setNotifications((prev) =>
            [{ id: getRandomNumber(), body: values?.message, createdAt: dayjs().format('YYYY-MM-DD') }].concat(prev)
          );
          socket.emit('direct-notification', { classId: values?.class?.value || null, body: values?.message });
          handleCancel();
        }}
      >
        <Form.Item label="Class" name="class">
          <BasicSelectClass className="flex-1 h-10" placeholder="Class" />
        </Form.Item>

        <Form.Item label="Message" name="message" rules={[{ required: true, message: 'Please input message!' }]}>
          <BasicArea placeholder="message" rows={4} />
        </Form.Item>

        <div className="gap-x-3 flex items-center justify-end mt-6">
          <BasicButton onClick={() => handleCancel()} styleType="rounded">
            Cancel
          </BasicButton>
          <BasicButton
            className="text-[13px] font-[700] text-[#fff] !bg-[#2F2F2F]"
            htmlType="submit"
            styleType="rounded"
          >
            Send
          </BasicButton>
        </div>
      </Form>
    </Modal>
  );
};

export default TeacherAddNotificationModal;
