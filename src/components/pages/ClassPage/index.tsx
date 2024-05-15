import React, { useState } from 'react';
import dayjs from 'dayjs';

import { ClassSearchObj } from '@/redux/endpoints/class';

import ClassTable from './ClassTable';
import ClassFilter from './ClassFilter';

const ClassPageComponents = () => {
  const [objSearch, setObjSearch] = useState<ClassSearchObj>({});

  return (
    <>
      <div className="py-[14px] space-y-[24px]">
        <ClassFilter
          onSubmit={(values) =>
            setObjSearch({
              search: values?.search || '',
              createdAt: values?.createdAt ? dayjs(values?.createdAt).format('YYYY-MM-DD') : '',
            })
          }
        />
      </div>
      <ClassTable objSearch={objSearch} />
    </>
  );
};

export default ClassPageComponents;
