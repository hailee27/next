import React, { useMemo } from 'react';
import styles from '@/components/common/BasicTable/index.module.scss';
import CircleArrow from '@/components/common/icons/CircleArrow';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

interface DataType {
  key: React.Key;
  name: string;
  count: number;
}

export default function ShareTable() {
  const columns = useMemo<ColumnsType<DataType>>(
    () => [
      {
        title: 'Xアカウント名',
        dataIndex: 'name',
      },
      {
        title: 'シェア実績(人)',
        dataIndex: 'count',
      },
    ],
    []
  );

  return (
    <div className={styles.customTable}>
      <Table
        columns={columns}
        dataSource={[]}
        loading={false}
        // onRow={(record) => ({
        //   onClick: () => {
        //     push(`/campaign-creator/list/${record.key}`);
        //     // trigger({ campaignId: String(record.key) }); // click row
        //   },
        // })}
        pagination={{
          position: ['bottomCenter'],
          pageSize: 10,
          // total: 10,
          showSizeChanger: false,
          jumpNextIcon: <span className="text-[16px] font-medium tracking-[0.48px]">...</span>,
          jumpPrevIcon: <span className="text-[16px] font-medium tracking-[0.48px]">...</span>,
          prevIcon: <CircleArrow position="left" />,
          nextIcon: <CircleArrow />,
          // eslint-disable-next-line react/no-unstable-nested-components
          showTotal: () => <span>{10} 件</span>,
          // onChange: (page) => {
          //   push({ query: { page } }, undefined, { shallow: true, scroll: true });
          // },
          current: 10,
        }}
        tableLayout="fixed"
      />
    </div>
  );
}
