import { Modal, Spin } from 'antd';
import React, { useState } from 'react';

import BasicSelectStudent from '@/components/common/BasicSelectStudent';
import BasicButton from '@/components/common/forms/BasicButton';
import { ValueSelect } from '@/redux/endpoints/auth';

interface PropsType {
  openModal: boolean;
  setOpenModal: (v: boolean) => void;
  studentIds: number[];
  handleAddMessage: (v: ValueSelect | null) => void;
}

const AddNewMessageModal = ({ openModal, setOpenModal, studentIds, handleAddMessage }: PropsType) => {
  const [studentChoose, setStudentChoose] = useState(null);

  const handleCancel = () => {
    setOpenModal(false);
  };

  return (
    <Modal footer={null} onCancel={handleCancel} open={openModal} title="Add New Message">
      <Spin spinning={false}>
        <div className="mb-2">Choose Student</div>
        <BasicSelectStudent
          onChange={(e) => {
            setStudentChoose(e);
          }}
          studentIds={studentIds}
          value={studentChoose}
        />

        <div className="gap-x-3 flex items-center justify-end mt-6">
          <BasicButton onClick={() => handleCancel()} styleType="rounded">
            Cancel
          </BasicButton>
          <BasicButton
            className="text-[13px] font-[700] text-[#fff] !bg-[#2F2F2F]"
            onClick={() => handleAddMessage(studentChoose)}
            styleType="rounded"
          >
            Add
          </BasicButton>
        </div>
      </Spin>
    </Modal>
  );
};

export default AddNewMessageModal;
