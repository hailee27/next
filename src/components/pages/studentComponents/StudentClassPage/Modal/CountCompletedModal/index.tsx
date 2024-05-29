/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { Modal, Spin, Table } from 'antd';

import { useLazyGetAssignmentCountCompletedQuery } from '@/redux/endpoints/student/assignment';
import BasicButton from '@/components/common/forms/BasicButton';

interface PropsType {
  openModal: boolean;
  setOpenModal: (v: boolean) => void;
  idEdit: number;
}

const CountCompletedModal = ({ openModal, setOpenModal, idEdit }: PropsType) => {
  const [getDetail, { data, isFetching }] = useLazyGetAssignmentCountCompletedQuery();

  useEffect(() => {
    if (idEdit) {
      getDetail({ classId: idEdit });
    }
  }, [idEdit]);

  const tableFormat = [
    {
      title: 'Assignment Total',
      dataIndex: 'countTotal',
      render: (countTotal) => <div className="">{countTotal}</div>,
    },
    {
      title: 'Assignment Completed',
      dataIndex: 'countCompleted',
      render: (countCompleted) => <div className="font-bold">{countCompleted}</div>,
    },
  ];

  const handleCancel = () => {
    setOpenModal(false);
  };

  return (
    <Modal footer={null} onCancel={handleCancel} open={openModal} title="View Assignment Completed" width={1000}>
      <Spin spinning={isFetching}>
        <div className="">
          <Table
            bordered
            columns={tableFormat as any}
            dataSource={[data?.result || {}]}
            loading={isFetching}
            locale={{
              emptyText: (
                <div>
                  <div className="text-[#80888F] font-bold pb-2">No data</div>
                </div>
              ),
            }}
            pagination={false}
            rowKey="id"
          />
        </div>

        <div className="gap-x-3 flex items-center justify-end mt-2">
          <BasicButton onClick={() => handleCancel()} styleType="rounded">
            Close
          </BasicButton>
        </div>
      </Spin>
    </Modal>
  );
};

export default CountCompletedModal;
