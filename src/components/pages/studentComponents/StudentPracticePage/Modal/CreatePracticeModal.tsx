import React from 'react';
import { Form, Input, message, Modal, Radio, Space, Spin } from 'antd';

import BasicButton from '@/components/common/forms/BasicButton';
import { usePostPracticeStartMutation } from '@/redux/endpoints/student/practice';
import { CreateUpdateDeleteResponse } from '@/redux/endpoints/teacher/student';

interface PropsType {
  openModal: boolean;
  setOpenModal: (v: boolean) => void;
  getList: () => void;
}

const CreatePracticeModal = ({ openModal, setOpenModal, getList }: PropsType) => {
  const [form] = Form.useForm();
  const [postPractice, { isLoading }] = usePostPracticeStartMutation();

  const handleCancel = () => {
    setOpenModal(false);
    form.resetFields();
  };

  return (
    <Modal footer={null} onCancel={handleCancel} open={openModal} title="Create Practice">
      <Spin spinning={isLoading}>
        <Form
          autoComplete="off"
          form={form}
          layout="vertical"
          name="class"
          onFinish={(values) => {
            postPractice({
              type: values?.type,
              timeAllow: values?.timeAllow,
              questionCount: values?.questionCount,
            }).then((res) => {
              if ((res as unknown as CreateUpdateDeleteResponse)?.data?.status) {
                message.success('Tạo mới practice thành công');
                handleCancel();
                getList();
              } else {
                message.error((res as unknown as { error: CreateUpdateDeleteResponse })?.error?.data?.message);
              }
            });
          }}
        >
          <Form.Item
            label="Time Allow"
            name="timeAllow"
            rules={[{ required: true, message: 'Please input time allow!' }]}
          >
            <Input max={2000} placeholder="time allow" type="number" />
          </Form.Item>

          <Form.Item
            label="Question Count"
            name="questionCount"
            rules={[{ required: true, message: 'Please input question count!' }]}
          >
            <Input max={100} placeholder="question count" type="number" />
          </Form.Item>

          <Form.Item
            initialValue={100}
            label="Question Type"
            name="type"
            rules={[{ required: true, message: 'Please select question type!' }]}
          >
            <Radio.Group>
              <Space direction="vertical">
                <Radio value={100}>Random Question</Radio>
                <Radio value={1}>Single Answer Question</Radio>
                <Radio value={2}>Multiple Answer Question</Radio>
                <Radio value={3}>Fill Missing Words Question</Radio>
                <Radio value={4}>Arrange Question</Radio>
                <Radio value={5}>True Or False Question</Radio>
                <Radio value={6}>Write Essay Question</Radio>
              </Space>
            </Radio.Group>
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

export default CreatePracticeModal;
