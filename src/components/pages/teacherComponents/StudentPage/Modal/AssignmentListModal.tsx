/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unsafe-optional-chaining */
import { Modal, Spin, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { MoreOutlined } from '@ant-design/icons';

import BasicButton from '@/components/common/forms/BasicButton';
import { useLazyGetListAssignmentStudentQuery } from '@/redux/endpoints/teacher/student';
import BasicPopover from '@/components/common/BasicPopover';

import StudentAssignmentDetail from './StudentAssignmentDetail';

interface PropsType {
  openModal: boolean;
  setOpenModal: (v: boolean) => void;
  idEdit: number;
}

const AssignmentListModal = ({ openModal, setOpenModal, idEdit }: PropsType) => {
  const [getList, { data, isFetching }] = useLazyGetListAssignmentStudentQuery();
  const [openAssignmentDetail, setOpenAssignmentDetail] = useState(false);
  const [assignmentId, setAssignmentId] = useState(0);
  const [assignmentSessionId, setAssignmentSessionId] = useState(0);

  useEffect(() => {
    if (idEdit) {
      getList({ studentId: idEdit });
    }
  }, [idEdit]);

  const tableFormat = [
    {
      title: 'Assignment Name',
      dataIndex: 'name',
      render: (_, record) => <div className="font-bold">{record?.assignment?.name}</div>,
    },
    {
      title: 'Mark',
      dataIndex: 'mark',
      render: (_, record) => <div className="font-bold">{record?.mark}</div>,
    },
    {
      title: 'Question Count',
      dataIndex: 'name',
      render: (_, record) => <div className="font-bold">{record?.assignment?.questionCount}</div>,
    },
    {
      title: 'Time Allow',
      dataIndex: 'name',
      render: (_, record) => <div className="font-bold">{(record?.assignment?.timeAllow / 60).toFixed(2)} h</div>,
    },
    {
      title: 'Class Name',
      dataIndex: 'name',
      render: (_, record) => <div className="font-bold">{record?.assignment?.class?.name}</div>,
    },
    {
      title: 'Start Time',
      dataIndex: 'timeStart',
      render: (_, record) => <div className="">{dayjs(record?.assignment?.timeStart).format('DD-MM-YYYY HH:mm')}</div>,
    },
    {
      title: 'End Time',
      dataIndex: 'timeEnd',
      render: (_, record) => <div className="">{dayjs(record?.assignment?.timeEnd).format('DD-MM-YYYY HH:mm')}</div>,
    },
    {
      title: '',
      dataIndex: 'moreAction',
      width: 50,
      render: (_, record) => (
        <div id="MoreOutlined">
          <BasicPopover
            content={
              <div>
                <BasicButton
                  className="flex flex-col w-full text-[#929292] hover:bg-[rgba(245,245,245,0.6)]"
                  onClick={() => {
                    setAssignmentId(record?.assignment?.id);
                    setAssignmentSessionId(record?.id);
                    setOpenAssignmentDetail(true);
                  }}
                  styleType="text"
                >
                  View Detail
                </BasicButton>
              </div>
            }
            placement="left"
          >
            <MoreOutlined />
          </BasicPopover>
        </div>
      ),
    },
  ];

  const handleCancel = () => {
    setOpenModal(false);
  };

  return (
    <Modal footer={null} onCancel={handleCancel} open={openModal} title="View Assignment List" width={1000}>
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

      {openAssignmentDetail && (
        <StudentAssignmentDetail
          assignmentId={assignmentId}
          assignmentSessionId={assignmentSessionId}
          open={openAssignmentDetail}
          setOpen={setOpenAssignmentDetail}
          studentId={idEdit}
        />
      )}
    </Modal>
  );
};

export default AssignmentListModal;
