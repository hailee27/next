import React, { useEffect } from 'react';
import { Form, Input, message, Modal, Spin } from 'antd';

import BasicButton from '@/components/common/forms/BasicButton';
import BasicArea from '@/components/common/forms/BasicArea';
import {
  PostClassResponse,
  useLazyGetDetailClassQuery,
  usePostClassMutation,
  usePutClassMutation,
} from '@/redux/endpoints/teacher/class';

interface PropsType {
  openModal: boolean;
  setOpenModal: (v: boolean) => void;
  getList: () => void;
  classIdEdit: number;
}

const CreateOrEditClass = ({ openModal, setOpenModal, getList, classIdEdit }: PropsType) => {
  const [form] = Form.useForm();

  const [postClass, { isLoading }] = usePostClassMutation();
  const [putClass, { isLoading: isLoadingUpdate }] = usePutClassMutation();
  const [getDetail, { data, isFetching }] = useLazyGetDetailClassQuery();

  useEffect(() => {
    if (classIdEdit) {
      getDetail({ id: classIdEdit });
    }
  }, [classIdEdit]);

  useEffect(() => {
    if (data?.result?.id) {
      form.setFieldValue('name', data?.result?.name);
      form.setFieldValue('description', data?.result?.description);
    }
  }, [data]);

  const handleCancel = () => {
    setOpenModal(false);
    form.resetFields();
  };

  return (
    <Modal
      footer={null}
      onCancel={handleCancel}
      open={openModal}
      title={classIdEdit ? 'Update Class Information' : 'Create Class'}
    >
      <Spin spinning={isFetching || isLoading || isLoadingUpdate}>
        <Form
          autoComplete="off"
          form={form}
          layout="vertical"
          name="class"
          onFinish={(values) => {
            if (classIdEdit) {
              putClass({
                id: classIdEdit,
                name: values?.name,
                description: values?.description,
              }).then((res) => {
                if ((res as unknown as PostClassResponse)?.data?.status) {
                  message.success('Cập nhật thông tin lớp học thành công');
                  handleCancel();
                  getList();
                } else {
                  message.error((res as unknown as { error: PostClassResponse })?.error?.data?.message);
                }
              });
            } else {
              postClass({
                name: values?.name,
                description: values?.description,
              }).then((res) => {
                if ((res as unknown as PostClassResponse)?.data?.status) {
                  message.success('Tạo lớp học thành công');
                  handleCancel();
                  getList();
                } else {
                  message.error((res as unknown as { error: PostClassResponse })?.error?.data?.message);
                }
              });
            }
          }}
        >
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input name!' }]}>
            <Input placeholder="name" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please input description!' }]}
          >
            <BasicArea placeholder="description" rows={4} />
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

export default CreateOrEditClass;
