/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { Modal, Spin, Table } from 'antd';

import { useLazyGetAssignmentRankQuery } from '@/redux/endpoints/student/assignment';
import BasicButton from '@/components/common/forms/BasicButton';

interface PropsType {
  openModal: boolean;
  setOpenModal: (v: boolean) => void;
  idEdit: number;
}

const AssignmentRankModal = ({ openModal, setOpenModal, idEdit }: PropsType) => {
  const [getDetail, { data, isFetching }] = useLazyGetAssignmentRankQuery();

  useEffect(() => {
    if (idEdit) {
      getDetail({ assignmentId: idEdit });
    }
  }, [idEdit]);

  const handleCancel = () => {
    setOpenModal(false);
  };
  const tableFormat = [
    {
      title: 'Answer Count',
      dataIndex: 'answerCount',
      render: (answerCount) => <div className="">{answerCount}</div>,
    },
    {
      title: 'mark',
      dataIndex: 'mark',
      render: (mark) => <div className="font-bold">{mark}</div>,
    },
  ];

  return (
    <Modal footer={null} onCancel={handleCancel} open={openModal} title="View Assignment Rank" width={1000}>
      <Spin spinning={isFetching}>
        <div className="">
          <Table
            bordered
            columns={tableFormat as any}
            dataSource={data?.result || []}
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

export default AssignmentRankModal;
