/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { Modal, Spin, Table } from 'antd';

import { useLazyGetAssignmentRankQuery, usePostAssignmentStartMutation } from '@/redux/endpoints/student/assignment';
import BasicButton from '@/components/common/forms/BasicButton';
import { handleConvertObjectToArray, handleGetReplaceMessingText } from '@/utils';

interface PropsType {
  openModal: boolean;
  setOpenModal: (v: boolean) => void;
  idEdit: number;
}

const AssignmentRankModal = ({ openModal, setOpenModal, idEdit }: PropsType) => {
  const [getDetail, { data, isFetching }] = useLazyGetAssignmentRankQuery();
  const [startAssignment, { data: dataList, isLoading }] = usePostAssignmentStartMutation();

  useEffect(() => {
    if (idEdit) {
      getDetail({ assignmentId: idEdit });
      startAssignment({
        assignmentId: idEdit,
      });
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
      <Spin spinning={isFetching || isLoading}>
        <div className="mb-6">
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

        <div className="grid grid-cols-1 gap-y-3">
          {dataList?.result?.questions?.map((item, index) => (
            <div className="border-b pb-2" key={item?.id}>
              <div className="flex items-center justify-between ">
                <p className="uppercase text-[13px] font-[700]">question {index + 1}:</p>
                {item?.isCorrect && <p className="uppercase text-[11px] font-bold text-[#49AE59]">Correct</p>}
                {!item?.isCorrect && <p className="uppercase text-[11px] font-bold text-[#E11D48]">Wrong</p>}
              </div>
              <p className="text-[14px] font-bold">{handleGetReplaceMessingText(item?.body || '')}</p>
              <div className="">
                {handleConvertObjectToArray(JSON.parse(item?.choices || '{}'))?.map((choice, i) => (
                  <p className="">
                    <span className="uppercase text-[11px] font-bold">choice {i + 1}:</span> {(choice as string) || ''}
                  </p>
                ))}
              </div>
            </div>
          ))}
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
