import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import { usePostAssignmentStartMutation } from '@/redux/endpoints/student/assignment';

import Question from './Question';

const ExamComponents = () => {
  const { query } = useRouter();
  const [getList, { data }] = usePostAssignmentStartMutation();

  useEffect(() => {
    if (query?.id) {
      getList({
        assignmentId: Number(query?.id as string),
      });
    }
  }, [query?.id]);

  const question = data?.result.questions || [];

  return (
    <div className="shadow-lg bg-[#fff] rounded p-6">
      <div className="grid grid-cols-1 gap-y-5">
        {question?.map((item, index) => <Question index={index + 1} key={item?.id} question={item} />)}
      </div>
    </div>
  );
};

export default ExamComponents;
