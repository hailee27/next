import React, { useState } from 'react';
import dayjs from 'dayjs';

import { StudentGetListAssignmentParams } from '@/redux/endpoints/student/class';

import StudentAssignmentFilter from './StudentAssignmentFilter';
import StudentAssignmentTable from './StudentAssignmentTable';

const StudentAssignmentComponents = () => {
  const [objSearch, setObjSearch] = useState<StudentGetListAssignmentParams>({});

  return (
    <div>
      <div className="py-[14px] space-y-[24px]">
        <StudentAssignmentFilter
          onSubmit={(values) => {
            setObjSearch({
              classId: values?.class?.value || 0,
              status: values?.status || 0,
              search: values?.search || '',
              createdAt: values?.createdAt ? dayjs(values?.createdAt).format('YYYY-MM-DD') : '',
            });
          }}
        />
      </div>
      <StudentAssignmentTable objSearch={objSearch} />
    </div>
  );
};

export default StudentAssignmentComponents;
