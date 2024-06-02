import React from 'react';
import { Form, Input, message, Modal, Select, Spin } from 'antd';

import BasicArea from '@/components/common/forms/BasicArea';
import BasicButton from '@/components/common/forms/BasicButton';
import { useSignUpStudentMutation } from '@/redux/endpoints/auth';
import { CreateUpdateDeleteResponse } from '@/redux/endpoints/teacher/student';

interface PropsType {
  openModal: boolean;
  setOpenModal: (v: boolean) => void;
  getList: () => void;
  idEdit: number;
}

const CreateOrEditModal = ({ openModal, setOpenModal, getList, idEdit }: PropsType) => {
  const [form] = Form.useForm();
  const [createStudent, { isLoading }] = useSignUpStudentMutation();

  const handleCancel = () => {
    setOpenModal(false);
    form.resetFields();
  };

  return (
    <Modal
      footer={null}
      onCancel={handleCancel}
      open={openModal}
      title={idEdit ? 'Update Student Information' : 'Create Stufent'}
    >
      <Spin spinning={isLoading}>
        <Form
          autoComplete="off"
          form={form}
          layout="vertical"
          onFinish={(values) => {
            const submitData = {
              email: values?.email,
              password: values?.password,
              name: values?.name,
              gender: values?.gender,
              address: values?.address,
            };
            createStudent(submitData).then((res) => {
              if ((res as unknown as CreateUpdateDeleteResponse)?.data?.status) {
                message.success('Tạo mới tài khoản học sinh thành công');
                handleCancel();
                getList();
              } else {
                message.error((res as unknown as { error: CreateUpdateDeleteResponse })?.error?.data?.message);
              }
            });
          }}
        >
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input name!' }]}>
            <Input placeholder="name" />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input email!' }]}>
            <Input placeholder="email" type="email" />
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

          <Form.Item label="Gender" name="gender" rules={[{ required: true, message: 'Please select gender!' }]}>
            <Select
              options={[
                { value: 'MALE', label: 'Male' },
                { value: 'FEMALE', label: 'Female' },
              ]}
              placeholder="gender"
            />
          </Form.Item>

          <Form.Item label="Address" name="address">
            <BasicArea placeholder="address" rows={4} />
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

export default CreateOrEditModal;
