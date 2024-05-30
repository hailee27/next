import React, { useState } from 'react';
import dayjs from 'dayjs';

import { GetListPracticeRoomParams } from '@/redux/endpoints/student/practice';

import StudentPracticeFilter from './StudentPracticeFilter';
import StudentPracticeTable from './StudentPracticeTable';

const StudentPracticeComponents = () => {
  const [objSearch, setObjSearch] = useState<GetListPracticeRoomParams>({});

  return (
    <div>
      <div className="py-[14px] space-y-[24px]">
        <StudentPracticeFilter
          onSubmit={(values) => {
            setObjSearch({
              search: values?.search || '',
              createdAt: values?.createdAt ? dayjs(values?.createdAt).format('YYYY-MM-DD') : '',
            });
          }}
        />
      </div>

      <StudentPracticeTable objSearch={objSearch} />
    </div>
  );
};

export default StudentPracticeComponents;
