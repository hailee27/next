import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/redux/store';

import TeacherClassPage from './teacher/class';
import StudentClassPage from './student/class';

const HomePage = () => {
  const auth = useSelector((state: RootState) => state.auth);

  const isTeacher = !!auth?.teacher?.id;

  if (isTeacher) {
    return <TeacherClassPage />;
  }

  return <StudentClassPage />;
};

export default HomePage;
