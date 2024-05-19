/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';

import { StudentSearchObj } from '@/redux/endpoints/teacher/student';

import StudentTable from './StudentTable';

const StudentComponents = () => {
  const [objSearch, setObjSearch] = useState<StudentSearchObj>({});

  return (
    <div>
      <StudentTable objSearch={objSearch} />
    </div>
  );
};

export default StudentComponents;
