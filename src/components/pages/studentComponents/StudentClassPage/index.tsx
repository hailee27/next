import React, { useState } from 'react';
import dayjs from 'dayjs';

import { StudentGetListClassParams } from '@/redux/endpoints/student/class';

import StudentClassTable from './StudentClassTable';
import StudentClassFilter from './StudentClassFilter';

const StudentClassComponents = () => {
  const [objSearch, setObjSearch] = useState<StudentGetListClassParams>({});

  return (
    <div>
      <div className="py-[14px] space-y-[24px]">
        <StudentClassFilter
          onSubmit={(values) =>
            setObjSearch({
              search: values?.search || '',
              createdAt: values?.createdAt ? dayjs(values?.createdAt).format('YYYY-MM-DD') : '',
            })
          }
        />
      </div>

      <StudentClassTable objSearch={objSearch} />
    </div>
  );
};

export default StudentClassComponents;
