import React, { useEffect } from 'react';
import { Form, Modal, Spin } from 'antd';

import { useLazyStudentGetClassAnalysisQuery } from '@/redux/endpoints/student/class';
import BasicButton from '@/components/common/forms/BasicButton';

interface PropsType {
  openModal: boolean;
  setOpenModal: (v: boolean) => void;
  idEdit: number;
}

const AssignmentAnalysisModal = ({ openModal, setOpenModal, idEdit }: PropsType) => {
  const [form] = Form.useForm();
  const [getDetail, { data, isFetching }] = useLazyStudentGetClassAnalysisQuery();

  useEffect(() => {
    if (idEdit) {
      getDetail({ classId: idEdit });
    }
  }, [idEdit]);

  const handleCancel = () => {
    setOpenModal(false);
    form.resetFields();
  };

  return (
    <Modal footer={null} onCancel={handleCancel} open={openModal} title="View Assignment Analysis" width={1000}>
      <Spin spinning={isFetching}>
        <div className="">{data?.result || ''}</div>
        <div className="gap-x-3 flex items-center justify-end mt-2">
          <BasicButton onClick={() => handleCancel()} styleType="rounded">
            Close
          </BasicButton>
        </div>
      </Spin>
    </Modal>
  );
};

export default AssignmentAnalysisModal;
