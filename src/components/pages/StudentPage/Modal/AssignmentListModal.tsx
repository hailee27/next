import { Modal, Spin } from 'antd';
import React, { useEffect } from 'react';

import BasicButton from '@/components/common/forms/BasicButton';
import { useLazyGetListAssignmentStudentQuery } from '@/redux/endpoints/teacher/student';

interface PropsType {
  openModal: boolean;
  setOpenModal: (v: boolean) => void;
  idEdit: number;
}

const AssignmentListModal = ({ openModal, setOpenModal, idEdit }: PropsType) => {
  const [getList, { isFetching }] = useLazyGetListAssignmentStudentQuery();

  useEffect(() => {
    if (idEdit) {
      getList({ studentId: idEdit });
    }
  }, [idEdit]);

  const handleCancel = () => {
    setOpenModal(false);
  };

  return (
    <Modal footer={null} onCancel={handleCancel} open={openModal} title="View Assignment List" width={1000}>
      <Spin spinning={isFetching}>
        <div className="" />

        <div className="gap-x-3 flex items-center justify-end mt-2">
          <BasicButton onClick={() => handleCancel()} styleType="rounded">
            Close
          </BasicButton>
        </div>
      </Spin>
    </Modal>
  );
};

export default AssignmentListModal;
