import React, { useState } from 'react';
import dayjs from 'dayjs';

import { StudentSearchObj } from '@/redux/endpoints/teacher/student';

import StudentTable from './StudentTable';
import StudentFilter from './StudentFilter';

const StudentComponents = () => {
  const [objSearch, setObjSearch] = useState<StudentSearchObj>({});

  return (
    <div>
      <div className="py-[14px] space-y-[24px]">
        <StudentFilter
          onSubmit={(values) =>
            setObjSearch({
              search: values?.search || '',
              createdAt: values?.createdAt ? dayjs(values?.createdAt).format('YYYY-MM-DD') : '',
            })
          }
        />
      </div>
      <StudentTable objSearch={objSearch} />
    </div>
  );
};

export default StudentComponents;
