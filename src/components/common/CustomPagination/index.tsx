import { Select } from 'antd';

import ArrowDown from '@/components/Icons/ArrowDown';

const CustomPagination = ({
  page,
  pageSize,
  total,
  onBackPage,
  onNextPage,
  onSelectPageSize,
}: {
  page: number;
  pageSize: number;
  total: number;
  onBackPage: () => void;
  onNextPage: () => void;
  onSelectPageSize: (e: number) => void;
}) => (
  <div className="text-[#222222] flex items-center space-x-[22px] my-[12px] w-full justify-end px-[24px]">
    <Select
      className="w-[85px] h-[32px] [&_.ant-select-arrow]:mt-[-8px]"
      onChange={(e) => {
        onSelectPageSize(e);
      }}
      suffixIcon={<ArrowDown />}
      value={pageSize}
    >
      <Select.Option value={20}>20</Select.Option>
    </Select>
    <div className="text-[13px] font-[400]">{`${pageSize * (page - 1) + 1} - ${
      pageSize * page >= total ? total : pageSize * page
    } / ${total} 件`}</div>
    <div className="flex space-x-[8px]">
      <div
        className="border bg-white cursor-pointer border-[#E1E6EA] rounded-[4px] px-[8px] py-[5px]"
        onClick={() => {
          if (page > 1) {
            onBackPage();
          }
        }}
        role="presentation"
      >
        <svg fill="none" height="10" viewBox="0 0 7 10" width="7" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0.718109 5.71074C0.322712 5.3194 0.322711 4.6806 0.718108 4.28926L4.42155 0.623804C5.05299 -0.00115871 6.125 0.446123 6.125 1.33455L6.125 8.66546C6.125 9.55388 5.05299 10.0012 4.42155 9.3762L0.718109 5.71074Z"
            fill={page === 1 ? '#E1E6EA' : '#80888F'}
          />
        </svg>
      </div>
      <div
        className="border bg-white border-[#E1E6EA] cursor-pointer rounded-[4px] px-[8px] py-[5px]"
        onClick={() => {
          if (Math.ceil(total / pageSize) > page) {
            onNextPage();
          }
        }}
        role="presentation"
      >
        <svg fill="none" height="10" viewBox="0 0 7 10" width="7" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.28189 4.28926C6.67729 4.6806 6.67729 5.3194 6.28189 5.71074L2.57845 9.3762C1.94701 10.0012 0.874998 9.55388 0.874998 8.66545L0.874999 1.33454C0.874999 0.446123 1.94701 -0.00115999 2.57845 0.623802L6.28189 4.28926Z"
            fill={Math.ceil(total / pageSize) <= page ? '#E1E6EA' : '#80888F'}
          />
        </svg>
      </div>
    </div>
  </div>
);

export default CustomPagination;
