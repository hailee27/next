/* eslint-disable react/require-default-props */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-unsafe-optional-chaining */
import { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { Select, Spin } from 'antd';

import { useLazyGetListStudentQuery } from '@/redux/endpoints/student';

import { useDebounce } from '../../../hooks/use-debounce';
import { CustomTag } from '../CustomTag';

/* eslint-disable @typescript-eslint/no-explicit-any */

interface SelectItems {
  value: string | number;
  label: React.ReactNode;
}

interface TagSelectProps {
  readOnly?: boolean;
  bordered?: boolean;
  value?: SelectItems[];
  onChange?: (val: SelectItems[] | null) => void;
  addedSectionTitle?: string;
  hightLight?: boolean;
  placeholder?: string;
  showResultValue?: boolean;
  suffixIcon?: JSX.Element;
}

export const SelectMultiStudent: FunctionComponent<TagSelectProps> = ({
  readOnly,
  bordered,
  value: initialValue,
  onChange,
  addedSectionTitle,
  hightLight,
  placeholder,
  showResultValue = true,
  suffixIcon,
}) => {
  const [value, setValue] = useState<SelectItems[]>([]);
  useEffect(() => {
    if (initialValue) {
      setValue?.(initialValue);
    }
  }, [initialValue]);

  const [optionSearch, setOptionSearch] = useState<SelectItems[]>([]);

  const [optionSearchOrigin, setOptionSearchOrigin] = useState<SelectItems[]>([]);
  const [inputValue, setInputValue] = useState('');

  const [trigger, { isFetching }] = useLazyGetListStudentQuery();
  const [hasMore, setHasMore] = useState(true);
  const [pageSize] = useState<number>(50);
  const [page, setPage] = useState(1);
  const inputSearch = useDebounce(inputValue, 300);

  const handleAfterCallApiGetListStudent = (dataList: any, optionCru: any) => {
    if (dataList?.metadata?.total && Math.ceil(dataList?.metadata?.total / pageSize) <= page) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
    const studentList =
      (dataList?.result?.map((e: any) => ({
        value: e.id as number,
        label: e.name as React.ReactNode,
        data: e,
      })) as SelectItems[]) ||
      ([] as {
        value: number;
        label: string;
        data: any;
      }[]);
    if (optionCru) {
      setOptionSearch(optionCru?.concat(studentList));
    } else {
      setOptionSearch(optionSearch?.concat(studentList));
    }
    if (optionSearchOrigin?.length === 0) {
      setOptionSearchOrigin(studentList);
    }
  };

  useEffect(() => {
    if (!readOnly) {
      if (optionSearch?.length === 0) {
        trigger({
          limit: pageSize,
          page,
          ...(inputSearch ? { search: inputSearch } : {}),
        })
          .unwrap()
          .then((res: any) => {
            handleAfterCallApiGetListStudent(res, '');
          });
      }
      if (!value && !inputSearch) {
        if (optionSearchOrigin?.length > 0) {
          setPage(1);
          if (optionSearchOrigin?.length === pageSize) {
            setHasMore(true);
          }
          setOptionSearch([...optionSearchOrigin]);
        }
      }
    }
  }, [readOnly]);

  const onScroll = async (event: any) => {
    if (!hasMore) {
      return;
    }
    const { target } = event;
    if (!isFetching && target.scrollTop + target.offsetHeight === target.scrollHeight) {
      target.scrollTo(0, target.scrollHeight);

      const maxCounter = page + 1;
      setPage(maxCounter);
      trigger({
        limit: pageSize,
        page: maxCounter,
        ...(inputSearch ? { search: inputSearch } : {}),
      })
        .unwrap()
        .then((res: any) => {
          handleAfterCallApiGetListStudent(res, '');
        });
    }
  };

  useEffect(() => {
    if (inputSearch && !readOnly) {
      setOptionSearch([]);
      setPage(1);
      setHasMore(false);
      trigger({
        limit: pageSize,
        page: 1,
        ...(inputSearch ? { search: inputSearch } : {}),
      })
        .unwrap()
        .then((res: any) => {
          handleAfterCallApiGetListStudent(res, []);
        });
    } else if (!readOnly) {
      if (optionSearchOrigin?.length > 0) {
        setPage(1);
        if (optionSearchOrigin?.length === pageSize) {
          setHasMore(true);
        }
        setOptionSearch([...optionSearchOrigin]);
      } else {
        setOptionSearch([]);
        setHasMore(false);
        setPage(1);

        trigger({
          limit: pageSize,
          page: 1,
          ...(inputSearch ? { search: inputSearch } : {}),
        })
          .unwrap()
          .then((res: any) => {
            handleAfterCallApiGetListStudent(res, []);
          });
      }
    }
  }, [inputSearch]);

  const tagList = useMemo(
    () =>
      value.map((val, index) => (
        <CustomTag
          key={val.value}
          onRemove={
            readOnly
              ? undefined
              : () => {
                  const newValue = value.filter((_, i) => index !== i);
                  setValue(newValue);
                  onChange?.(newValue);
                }
          }
          transrent={!hightLight}
          value={val.label as string}
        />
      )),
    [value, readOnly]
  );

  if (readOnly) {
    if (bordered) {
      return (
        <div className="flex flex-wrap items-center border border-[#DFE5EE] bg-[#F3F5F7] rounded-[4px] px-[16px] py-[7px] min-h-[48px] gap-[8px]">
          {tagList}
        </div>
      );
    }
    return <div className="flex flex-wrap items-center gap-[8px]">{tagList}</div>;
  }
  return (
    <div className="flex flex-col">
      {!readOnly && (
        <Select
          allowClear
          className="min-h-[48px] [&_.ant-select-selector]:min-h-[48px]"
          filterOption={false}
          labelInValue
          mode="multiple"
          onBlur={(e: any) => {
            setInputValue(e.target.value);
          }}
          onChange={(e: SelectItems[]) => {
            if (e.length > 0) {
              onChange?.(e);
            } else {
              setValue([]);
              onChange?.(null);
            }
          }}
          onPopupScroll={onScroll}
          onSearch={(e: any) => {
            setInputValue(e);
          }}
          placeholder={placeholder ?? 'Student'}
          showSearch
          size="large"
          suffixIcon={suffixIcon ?? undefined}
          value={value}
        >
          {isFetching
            ? [
                /* eslint-disable-next-line no-unsafe-optional-chaining */
                ...optionSearch?.map((item) => (
                  <Select.Option key={item.value} value={item.value}>
                    {item.label}
                  </Select.Option>
                )),
                <Select.Option disabled key="loading">
                  <Spin size="small" />
                </Select.Option>,
              ]
            : optionSearch?.map((item) => (
                <Select.Option key={item.value} value={item.value}>
                  {item.label}
                </Select.Option>
              ))}
        </Select>
      )}
      {showResultValue ? (
        <>
          {addedSectionTitle && value?.length > 0 ? (
            <div className="font-bold text-[13px] mt-[10px] text-[#80888F]">{addedSectionTitle}</div>
          ) : null}
          {value?.length > 0 ? <div className="mt-[10px] flex flex-wrap items-center gap-[8px]">{tagList}</div> : ''}
        </>
      ) : null}
    </div>
  );
};
