/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { Modal, Spin, Table } from 'antd';

import { ListPracticeRoomType, usePostPracticeStartMutation } from '@/redux/endpoints/student/practice';
import { handleConvertObjectToArray, handleGetReplaceMessingText } from '@/utils';
import BasicButton from '@/components/common/forms/BasicButton';

interface PropsType {
  openModal: boolean;
  setOpenModal: (v: boolean) => void;
  practiceSelected: ListPracticeRoomType;
}

const ViewPracticeScoreModal = ({ openModal, setOpenModal, practiceSelected }: PropsType) => {
  const [getList, { data, isLoading }] = usePostPracticeStartMutation();

  useEffect(() => {
    if (practiceSelected?.id) {
      getList({
        assignmentId: Number(practiceSelected?.id),
        timeAllow: Number(practiceSelected?.timeAllow),
        questionCount: Number(practiceSelected?.questionCount),
        type: Number(practiceSelected?.type),
      });
    }
  }, [practiceSelected]);

  const tableFormat = [
    {
      title: 'Question Count',
      dataIndex: 'questionCount',
      render: (questionCount) => <div className="">{questionCount}</div>,
    },
    {
      title: 'mark',
      dataIndex: 'mark',
      render: (mark) => <div className="font-bold">{mark}</div>,
    },
  ];

  const handleCancel = () => {
    setOpenModal(false);
  };

  return (
    <Modal footer={null} onCancel={handleCancel} open={openModal} title="Create Practice" width={800}>
      <Spin spinning={isLoading}>
        <div className="mb-6">
          <Table
            bordered
            columns={tableFormat as any}
            dataSource={[
              {
                questionCount: practiceSelected?.questionCount,
                mark: data?.result?.response?.mark,
              },
            ]}
            loading={isLoading}
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
          {data?.result?.questions?.map((item, index) => (
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

export default ViewPracticeScoreModal;
