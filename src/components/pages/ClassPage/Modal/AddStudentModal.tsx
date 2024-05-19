import React, { useEffect } from 'react';
import { Divider, Form, message, Modal, Spin } from 'antd';

import { SelectMultiStudent } from '@/components/common/SelectMultiStudent';
import ArrowDown from '@/components/Icons/ArrowDown';
import BasicButton from '@/components/common/forms/BasicButton';
import {
  PostAddStudentResponse,
  useLazyGetListStudentClassQuery,
  usePostAddStudentMutation,
} from '@/redux/endpoints/teacher/class';

interface PropsType {
  openModal: boolean;
  setOpenModal: (v: boolean) => void;
  classId: number;
}

const AddStudentModal = ({ openModal, setOpenModal, classId }: PropsType) => {
  const [form] = Form.useForm();

  const [addStudentToClass, { isLoading }] = usePostAddStudentMutation();
  const [getList, { data: students, isFetching }] = useLazyGetListStudentClassQuery();

  useEffect(() => {
    if (classId) {
      getList({
        classId,
        page: 1,
        limit: 100,
      });
    }
  }, [classId, openModal]);

  // useEffect(() => {
  //   if ((students?.result || [])?.length > 0) {
  //     form.setFieldValue('studentIds', students?.result?.map((item) => ({ value: item?.id, label: item?.name })));
  //   }
  // }, [students]);

  const handleCancel = () => {
    setOpenModal(false);
    form.resetFields();
  };

  const studentAdded = students?.result?.map((item) => Number(item?.id)) || [];

  return (
    <Modal footer={null} onCancel={handleCancel} open={openModal} title="Add Student To Class">
      <Spin spinning={isLoading || isFetching}>
        <Form
          autoComplete="off"
          form={form}
          layout="vertical"
          onFinish={(values) => {
            const submitData = {
              classId,
              studentIds: values?.studentIds?.map((item) => Number(item?.value)),
            };
            addStudentToClass(submitData).then((res) => {
              if ((res as unknown as PostAddStudentResponse)?.data?.status) {
                message.success('Thêm học sinh thành công');
                handleCancel();
              } else {
                message.success('Xảy ra lỗi khi thêm học sinh');
              }
            });
          }}
        >
          <p className="mb-2">Select student</p>
          <div
            className="[&_.ant-select-selection-item]:!bg-[#EDF4FE] [&_.ant-select-selection-item]:!border-[#3391D6]
       [&_.ant-select-selection-item]:!border [&_.ant-select-selection-item]:text-[#3391D6]
       [&_.ant-select-selection-item-remove]:!text-[#3391D6] mb-4
       "
          >
            <Form.Item name="studentIds" noStyle>
              <SelectMultiStudent
                bordered
                hightLight
                showResultValue={false}
                studentAdded={studentAdded}
                suffixIcon={
                  <div className="flex justify-between items-center">
                    <Divider className="h-7" type="vertical" />
                    <ArrowDown className="block ml-6" />
                  </div>
                }
              />
            </Form.Item>
          </div>

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

export default AddStudentModal;
