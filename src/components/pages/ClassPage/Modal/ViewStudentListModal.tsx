import React, { useEffect } from 'react';
import { message, Modal, Spin } from 'antd';

import {
  PostDeleteStudentResponse,
  useLazyGetListStudentClassQuery,
  usePostDeleteStudentMutation,
} from '@/redux/endpoints/teacher/class';
import BasicButton from '@/components/common/forms/BasicButton';

interface PropsType {
  openModal: boolean;
  setOpenModal: (v: boolean) => void;
  classId: number;
}

const ViewStudentListModal = ({ openModal, setOpenModal, classId }: PropsType) => {
  const [getList, { data: students, isFetching }] = useLazyGetListStudentClassQuery();
  const [deleteQuestion] = usePostDeleteStudentMutation();

  useEffect(() => {
    if (classId) {
      getList({
        classId,
        page: 1,
        limit: 100,
      });
    }
  }, [classId, openModal]);

  const handleCancel = () => {
    setOpenModal(false);
  };

  return (
    <Modal footer={null} onCancel={handleCancel} open={openModal} title="View Student List" width={800}>
      <Spin spinning={isFetching}>
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
                        getList({
                          classId,
                          page: 1,
                          limit: 100,
                        });
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
      </Spin>
    </Modal>
  );
};

export default ViewStudentListModal;
