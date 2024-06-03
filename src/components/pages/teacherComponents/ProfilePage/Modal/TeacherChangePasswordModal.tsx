import React from 'react';
import { Form, Input, Modal, Spin } from 'antd';

import BasicButton from '@/components/common/forms/BasicButton';

export interface ChangePwdSubmitType {
  password: string;
  oldPassword: string;
}

interface PropsType {
  openModal: boolean;
  setOpenModal: (v: boolean) => void;
  onSubmit: (v: ChangePwdSubmitType) => void;
}

const TeacherChangePasswordModal = ({ openModal, setOpenModal, onSubmit }: PropsType) => {
  const [form] = Form.useForm();

  const handleCancel = () => {
    setOpenModal(false);
    form.resetFields();
  };

  return (
    <Modal footer={null} onCancel={handleCancel} open={openModal} title="Change Password">
      <Spin spinning={false}>
        <Form
          autoComplete="off"
          form={form}
          layout="vertical"
          onFinish={(values) => {
            onSubmit(values);
          }}
        >
          <Form.Item
            label="Old Password"
            name="oldPassword"
            rules={[
              {
                required: true,
                message: 'Please input old password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            hasFeedback
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            dependencies={['password']}
            hasFeedback
            label="Confirm Password"
            name="confirm"
            rules={[
              {
                required: true,
                message: 'Please confirm password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The new password that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <div className="gap-x-3 flex items-center justify-end mt-2">
            <BasicButton onClick={() => handleCancel()} styleType="rounded">
              Cancel
            </BasicButton>
            <BasicButton
              className="text-[13px] font-[700] text-[#fff] !bg-[#2F2F2F]"
              htmlType="submit"
              styleType="rounded"
            >
              Save
            </BasicButton>
          </div>
        </Form>
      </Spin>
    </Modal>
  );
};

export default TeacherChangePasswordModal;
