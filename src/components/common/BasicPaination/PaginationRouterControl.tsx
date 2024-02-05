import { Pagination } from 'antd';
import { useRouter } from 'next/router';

import CircleArrow from '../icons/CircleArrow';
import styles from './index.module.scss';

function PaginationRouterControl({
  total,

  pageSize,
}: {
  total: number;

  pageSize: number;
}) {
  const totalPage = Math.ceil((total ?? 0) / pageSize);
  const router = useRouter();
  const currentPage = parseInt((router.query.page as string) ?? '1', 10);
  if (!currentPage || currentPage < 1 || (currentPage > totalPage && totalPage !== 0)) {
    router.replace(`${router.pathname}?page=1`);
  }
  const handlePageChange = (page: number) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    router.push({ query: { ...router.query, page } });
  };
  return totalPage > 1 ? (
    <div className={styles.customPagination}>
      <div className="flex flex-col items-center space-y-[16px] xl:flex-row xl:space-x-[41px] xl:justify-center">
        {total ? <span className="text-[14px] font-medium xl:mt-[20px] xl:text-[16px]">{total}件</span> : ''}
        <Pagination
          className="text-center"
          current={currentPage}
          jumpNextIcon={<span className="text-[16px] font-medium tracking-[0.48px]">...</span>}
          jumpPrevIcon={<span className="text-[16px] font-medium tracking-[0.48px]">...</span>}
          nextIcon={<CircleArrow />}
          onChange={handlePageChange}
          pageSize={pageSize}
          prevIcon={<CircleArrow position="left" />}
          showLessItems
          showSizeChanger={false}
          total={total ?? 0}
        />
      </div>
    </div>
  ) : (
    ''
  );
}

export default PaginationRouterControl;
