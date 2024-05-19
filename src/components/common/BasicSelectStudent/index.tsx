/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/require-default-props */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/no-danger */
import { FC, useEffect, useState } from 'react';
import { Spin } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';

import useComponentVisible from '@/hooks/useComponentVisible';
import { useDebounce } from '@/hooks/use-debounce';
import { useLazyGetListStudentQuery } from '@/redux/endpoints/teacher/student';

import ArrowDown from '../../Icons/ArrowDown';

import style from './index.module.scss';

interface PropsType {
  className?: string;
  placeholder?: string;
  value?: { value: number; label: string };
  onChange?: (i: any) => void;
}

const BasicSelectStudent: FC<PropsType> = ({ className, placeholder, onChange, value }) => {
  const { ref: boxInputRef, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

  const [trigger, { data: list, isFetching }] = useLazyGetListStudentQuery();

  const [pageSize] = useState<number>(50);
  const [page, setPage] = useState<number>(1);
  const [inputValue, setInputValue] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [optionSearch, setOptionSearch] = useState<
    {
      value: number;
      label: string;
    }[]
  >([]);

  const [optionSearchOrigin, setOptionSearchOrigin] = useState<
    {
      value: number;
      label: string;
    }[]
  >([]);

  const inputSearch = useDebounce(inputValue, 300);

  useEffect(() => {
    if (isComponentVisible === false) {
      setIsComponentVisible(false);
    } else if (optionSearch?.length === 0) {
      trigger({
        limit: pageSize,
        page,
      });
    }
    if (isComponentVisible && !value && !inputSearch) {
      if (optionSearchOrigin?.length > 0) {
        setPage(1);
        if (optionSearchOrigin?.length === pageSize) {
          setHasMore(true);
        }
        setOptionSearch([...optionSearchOrigin]);
      }
    }
  }, [isComponentVisible]);

  useEffect(() => {
    if (list) {
      if (list?.metadata?.total && Math.ceil(list?.metadata?.total / pageSize) <= page) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
      const listKeyword =
        ((list?.result as any[])?.map((e: any) => ({ value: e.id as number, label: e.name as string })) as {
          value: number;
          label: string;
        }[]) ||
        ([] as {
          value: number;
          label: string;
        }[]);
      setOptionSearch(optionSearch?.concat(listKeyword));
      if (optionSearchOrigin?.length === 0) {
        setOptionSearchOrigin(listKeyword);
      }
    }
  }, [list]);

  const onChoiceSearch = (i: { value: number; label: string }) => {
    if (!onChange) {
      return;
    }
    onChange(i);
    // setInputValue('');
    setIsComponentVisible(false);
  };

  const fetchMoreData = () => {
    // a fake async api call like which sends

    setPage(page + 1);
    trigger({
      limit: pageSize,
      page,
    });
  };

  useEffect(() => {
    if (inputSearch && isComponentVisible) {
      setOptionSearch([]);
      setPage(1);
      setHasMore(false);
      trigger({
        limit: pageSize,
        page: 1,
      });
    } else if (isComponentVisible) {
      setOptionSearch([]);
      setHasMore(false);
      setPage(1);

      trigger({
        limit: pageSize,
        page: 1,
      });
    }
  }, [inputSearch]);

  return (
    <div
      className={`${className} `}
      onClick={() => {
        setIsComponentVisible(true);
      }}
      ref={boxInputRef}
      role="presentation"
    >
      {isComponentVisible ? (
        <div
          className="bg-white relative rounded-[4px] h-[40px] z-[100]"
          style={{ boxShadow: '0px 8px 14px 0px rgba(0, 0, 0, 0.15)' }}
        >
          <div
            className="absolute top-[41px] bg-white w-full z-[100] "
            style={{ boxShadow: '0px 8px 14px 0px rgba(0, 0, 0, 0.15)' }}
          >
            <Spin className="w-full" spinning={isFetching}>
              <div
                className={style.fix_layout}
                id="scrollableDiv"
                style={{
                  height: 400,
                  overflow: 'auto',
                  display: 'flex',
                  width: '100%',
                  maxHeight: 400,
                }}
              >
                <InfiniteScroll
                  className="w-full"
                  dataLength={optionSearch?.length}
                  hasMore={hasMore}
                  loader={null}
                  next={fetchMoreData}
                  scrollableTarget="scrollableDiv"
                >
                  {optionSearch?.map((i) => {
                    let contentOrigin = i.label as string;

                    if (inputValue) {
                      if (contentOrigin.includes(inputValue)) {
                        contentOrigin = (contentOrigin as any).replaceAll(
                          `${inputValue}`,
                          `${inputValue}`.fontcolor('red')
                        );
                      }
                    }

                    return (
                      <div
                        className={`px-[16px] w-full py-[8px] hover:bg-[#EDF4FF] ${
                          i.value?.toString() === value?.value?.toString() ? 'bg-[#EDF4FF]' : ''
                        } cursor-pointer`}
                        key={i.value}
                        onClick={(e) => {
                          e.stopPropagation();
                          onChoiceSearch(i);
                        }}
                        role="presentation"
                      >
                        <div dangerouslySetInnerHTML={{ __html: contentOrigin || '' }} />
                      </div>
                    );
                  })}
                  {!optionSearch?.length && <p className="text-center mt-4 font-medium">No data</p>}
                </InfiniteScroll>
              </div>
            </Spin>
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-between items-center border-[1px] border-[#E1E6EA] bg-white h-[40px] px-[12px] rounded-[4px] cursor-pointer">
          <div className={`${value ? '' : 'text-[#BDC2C7]'} line-clamp-1`}>{value ? value?.label : placeholder}</div>
          <div>
            {value ? (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setInputValue('');
                  onChange?.(null);
                  setOptionSearch([...optionSearchOrigin]);
                }}
                role="presentation"
              >
                <CloseCircleFilled style={{ fontSize: '14px', color: '#80888F' }} />
              </div>
            ) : (
              <ArrowDown />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BasicSelectStudent;
