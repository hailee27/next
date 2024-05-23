import React, { useEffect } from 'react';
import { DatePicker, Form, Input, message, Modal, Spin } from 'antd';
import dayjs from 'dayjs';

import BasicButton from '@/components/common/forms/BasicButton';
import {
  PostAssignmentResponse,
  PutAssignmentResponse,
  useLazyGetDetailAssignmentQuery,
  usePostAssignmentMutation,
  usePutAssignmentMutation,
} from '@/redux/endpoints/teacher/assignment';

interface PropsType {
  openModal: boolean;
  setOpenModal: (v: boolean) => void;
  getList: () => void;
  idEdit: number;
  classId: number;
}

const CreateOrEditAssignment = ({ openModal, setOpenModal, getList, idEdit, classId }: PropsType) => {
  const [form] = Form.useForm();

  const [postAssignment, { isLoading }] = usePostAssignmentMutation();
  const [putAssignment, { isLoading: isLoadingUpdate }] = usePutAssignmentMutation();
  const [getDetail, { data, isFetching }] = useLazyGetDetailAssignmentQuery();

  useEffect(() => {
    if (idEdit) {
      getDetail({ id: idEdit });
    }
  }, [idEdit]);

  useEffect(() => {
    if (data?.result?.assignment?.id) {
      form.setFieldValue('name', data?.result?.assignment?.name);
      form.setFieldValue('totalMark', data?.result?.assignment?.totalMark);
      form.setFieldValue('timeAllow', data?.result?.assignment?.timeAllow);
      form.setFieldValue('timeStart', dayjs(data?.result?.assignment?.timeStart));
      form.setFieldValue('timeEnd', dayjs(data?.result?.assignment?.timeEnd));
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
      title={idEdit ? 'Update Assignment Information' : 'Create Assignment'}
    >
      <Spin spinning={isFetching || isLoading || isLoadingUpdate}>
        <Form
          autoComplete="off"
          form={form}
          layout="vertical"
          name="class"
          onFinish={(values) => {
            if (idEdit) {
              putAssignment({
                id: idEdit,
                name: values?.name,
                totalMark: Number(values?.totalMark),
                timeAllow: Number(values?.timeAllow),
                timeStart: dayjs(values?.timeStart),
                timeEnd: dayjs(values?.timeEnd),
              }).then((res) => {
                if ((res as unknown as PutAssignmentResponse)?.data?.status) {
                  message.success('Cập nhật thông tin assignment thành công');
                  handleCancel();
                  getList();
                } else {
                  message.error((res as unknown as { error: PutAssignmentResponse })?.error?.data?.message);
                }
              });
            } else {
              postAssignment({
                classId,
                name: values?.name,
                totalMark: Number(values?.totalMark),
                timeAllow: Number(values?.timeAllow),
                timeStart: dayjs(values?.timeStart),
                timeEnd: dayjs(values?.timeEnd),
              }).then((res) => {
                if ((res as unknown as PostAssignmentResponse)?.data?.status) {
                  message.success('Tạo assignment thành công');
                  handleCancel();
                  getList();
                } else {
                  message.error((res as unknown as { error: PostAssignmentResponse })?.error?.data?.message);
                }
              });
            }
          }}
        >
          <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input name!' }]}>
            <Input placeholder="name" />
          </Form.Item>

          <Form.Item
            label="Total Mark"
            name="totalMark"
            rules={[{ required: true, message: 'Please input total mark!' }]}
          >
            <Input placeholder="total mark" type="number" />
          </Form.Item>

          <Form.Item
            label="Time Allow"
            name="timeAllow"
            rules={[{ required: true, message: 'Please input time allow!' }]}
          >
            <Input
              max={2000}
              onChange={(e) => {
                const startDate = form.getFieldValue('timeStart');
                form.setFieldValue('timeEnd', dayjs(startDate).add(Number(e.target.value), 'minutes'));
              }}
              placeholder="time allow"
              type="number"
            />
          </Form.Item>

          <Form.Item
            label="Time Start"
            name="timeStart"
            rules={[{ required: true, message: 'Please select time start!' }]}
          >
            <DatePicker
              className="flex-1 w-full"
              format="YYYY-MM-DD HH:mm:ss"
              onChange={(e) => {
                const timeAllow = form.getFieldValue('timeAllow');
                form.setFieldValue('timeEnd', dayjs(e).add(Number(timeAllow), 'minutes'));
              }}
              placeholder="select time start"
              showTime
            />
          </Form.Item>

          <Form.Item label="Time End" name="timeEnd" rules={[{ required: true, message: 'Please select time end!' }]}>
            <DatePicker
              className="flex-1 w-full"
              disabled
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="select time end"
              showTime
            />
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

export default CreateOrEditAssignment;
