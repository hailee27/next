import React, { useEffect, useState } from 'react';
import { message, Modal, Spin } from 'antd';

import {
  PostDeleteStudentResponse,
  useLazyGetListStudentClassQuery,
  usePostDeleteStudentMutation,
} from '@/redux/endpoints/teacher/class';
import BasicButton from '@/components/common/forms/BasicButton';

import AddStudentModal from './AddStudentModal';

interface PropsType {
  openModal: boolean;
  setOpenModal: (v: boolean) => void;
  classId: number;
}

const ViewStudentListModal = ({ openModal, setOpenModal, classId }: PropsType) => {
  const [getList, { data: students, isFetching }] = useLazyGetListStudentClassQuery();
  const [deleteQuestion] = usePostDeleteStudentMutation();

  const [openAddStudentModal, setOpenAddStudentModal] = useState<boolean>(false);

  const handleGetList = () => {
    getList({
      classId,
      page: 1,
      limit: 100,
    });
  };

  useEffect(() => {
    if (classId) {
      handleGetList();
    }
  }, [classId, openModal]);

  const handleCancel = () => {
    setOpenModal(false);
  };

  return (
    <Modal footer={null} onCancel={handleCancel} open={openModal} title="View Student List" width={800}>
      <Spin spinning={isFetching}>
        <div className="flex justify-end my-4">
          <BasicButton
            className="text-[13px] font-[700] text-[#fff] !bg-[#2F2F2F]"
            onClick={() => {
              setOpenAddStudentModal(true);
            }}
            styleType="rounded"
          >
            Add Student
          </BasicButton>
        </div>
        <div className="grid grid-cols-1 gap-y-3">
          {students?.result?.map((item, index) => (
            <div className="" key={item?.id}>
              <div className="flex items-center justify-between ">
                <p className="uppercase text-[13px] font-[700]">student {index + 1}:</p>
                <BasicButton
                  className="text-[11px] font-bold uppercase text-[#E11D48]"
                  onClick={() => {
                    deleteQuestion({ studentId: Number(item?.id), classId }).then((res) => {
                      if ((res as unknown as PostDeleteStudentResponse)?.data?.status) {
                        message.success('Xoá học sinh thành công');
                        handleGetList();
                      } else {
                        message.success('Xảy ra lỗi khi xoá học sinh');
                      }
                    });
                  }}
                  styleType="text"
                  type="dashed"
                >
                  Delete
                </BasicButton>
              </div>
              <p className="text-[14px]">
                <span className="font-bold">Name: </span>
                {item?.name}
              </p>
              <p className="text-[14px]">
                <span className="font-bold">Email: </span>
                {item?.email}
              </p>
              <p className="text-[14px]">
                <span className="font-bold">Gender: </span>
                {item?.gender}
              </p>
              <p className="text-[14px]">
                <span className="font-bold">Address: </span>
                {item?.address}
              </p>
            </div>
          ))}
          {students?.result?.length === 0 && <p className="text-center">No data</p>}
        </div>

        <div className="gap-x-3 flex items-center justify-end mt-2">
          <BasicButton onClick={() => handleCancel()} styleType="rounded">
            Close
          </BasicButton>
        </div>

        {openAddStudentModal && (
          <AddStudentModal
            classId={classId}
            getListStudent={() => handleGetList()}
            openModal={openAddStudentModal}
            setOpenModal={setOpenAddStudentModal}
          />
        )}
      </Spin>
    </Modal>
  );
};

export default ViewStudentListModal;
