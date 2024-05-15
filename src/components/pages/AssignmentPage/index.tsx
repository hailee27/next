import React, { useState } from 'react';
import dayjs from 'dayjs';

import { AssignmentSearchObj } from '@/redux/endpoints/assignment';

import AssignmentTable from './AssignmentTable';
import AssignmentFilter from './AssignmentFilter';

const AssignmentPageComponents = () => {
  const [objSearch, setObjSearch] = useState<AssignmentSearchObj>({});

  return (
    <>
      <div className="py-[14px] space-y-[24px]">
        <AssignmentFilter
          onSubmit={(values) => {
            setObjSearch({
              classId: values?.class?.value,
              createdAt: values?.createdAt ? dayjs(values?.createdAt).format('YYYY-MM-DD') : '',
            });
          }}
        />
      </div>
      <AssignmentTable objSearch={objSearch} />
    </>
  );
};

export default AssignmentPageComponents;
