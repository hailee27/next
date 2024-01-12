import React from 'react';
import { Pagination } from 'antd';
import type { PaginationProps } from 'antd';
import styles from './index.module.scss';
import CircleArrow from '../icons/CircleArrow';

function BasicPaination(props: PaginationProps) {
  const { total, ...rest } = props;

  return (
    <div className={styles.customPagination}>
      <div className="flex flex-col items-center space-y-[16px]">
        {total && <span className="text-[14px] font-medium">{total}件</span>}
        <Pagination
          className="text-center"
          jumpNextIcon={<span className="text-[16px] font-medium tracking-[0.48px]">...</span>}
          jumpPrevIcon={<span className="text-[16px] font-medium tracking-[0.48px]">...</span>}
          nextIcon={<CircleArrow />}
          pageSize={1}
          prevIcon={<CircleArrow position="left" />}
          showSizeChanger={false}
          // showTotal={() => <span>30</span>}
          total={total ?? 20}
          {...rest}
        />
      </div>
    </div>
  );
}

export default BasicPaination;
