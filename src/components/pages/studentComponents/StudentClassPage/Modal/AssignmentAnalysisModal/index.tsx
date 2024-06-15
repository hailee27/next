/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { Modal, Spin, Table } from 'antd';

import { ClassAnalysisType, useLazyStudentGetClassAnalysisQuery } from '@/redux/endpoints/student/class';
import BasicButton from '@/components/common/forms/BasicButton';

interface PropsType {
  openModal: boolean;
  setOpenModal: (v: boolean) => void;
  idEdit: number;
}

const AssignmentAnalysisModal = ({ openModal, setOpenModal, idEdit }: PropsType) => {
  const [getDetail, { data, isFetching }] = useLazyStudentGetClassAnalysisQuery();

  useEffect(() => {
    if (idEdit) {
      getDetail({ classId: idEdit });
    }
  }, [idEdit]);

  const handleCancel = () => {
    setOpenModal(false);
  };

  const handleGetQuestionType = (type: number) => {
    switch (type) {
      case 1:
        return 'Single Answer Question';

      case 2:
        return 'Multiple Answer Question';

      case 3:
        return 'Fill Missing Word Question';

      case 4:
        return 'True Or False Question';

      case 5:
        return 'Arrange Question';

      default:
        return 'Write Essay Question';
    }
  };

  const tableFormat = [
    {
      title: 'Question Type',
      dataIndex: 'type',
      render: (type) => <div className="font-bold">{handleGetQuestionType(type)}</div>,
    },
    {
      title: 'Question Count',
      width: 200,
      dataIndex: 'count',
      render: (count) => <div className="">{count}</div>,
    },
    {
      title: 'Correct Count',
      width: 200,
      dataIndex: 'correctCount',
      render: (correctCount) => <div className="">{correctCount}</div>,
    },
  ];

  if ((data?.result as string)?.includes('Không có dữ liệu.')) {
    return (
      <Modal footer={null} onCancel={handleCancel} open={openModal} title="View Assignment Analysis" width={1000}>
        <Spin spinning={isFetching}>
          <div className="font-bold uppercase my-6">
            No data. Please complete the assignments to get analysis results
          </div>
          <div className="gap-x-3 flex items-center justify-end mt-2">
            <BasicButton onClick={() => handleCancel()} styleType="rounded">
              Close
            </BasicButton>
          </div>
        </Spin>
      </Modal>
    );
  }

  return (
    <Modal footer={null} onCancel={handleCancel} open={openModal} title="View Assignment Analysis" width={1000}>
      <Spin spinning={isFetching}>
        <div className="">
          <Table
            bordered
            columns={tableFormat as any}
            dataSource={(data?.result as ClassAnalysisType[]) || []}
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

export default AssignmentAnalysisModal;
