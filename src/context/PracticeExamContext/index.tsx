import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import { ProviderExamType } from './type';

interface PropsType {
  children: React.ReactNode;
}

const PracticeExamContext = createContext<ProviderExamType | undefined>(undefined);

const PracticeExamContextProvider = ({ children }: PropsType) => {
  const { query } = useRouter();
  const [assignmentId, setAssignmentId] = useState(0);
  const [assignmentSessionId, setAssignmentSessionId] = useState(0);

  useEffect(() => {
    setAssignmentId(Number(query?.id as string));
  }, [query?.id]);

  const providerValue = useMemo(
    () => ({
      assignmentId,
      assignmentSessionId,
      setAssignmentSessionId,
    }),
    [assignmentId, assignmentSessionId]
  );

  return <PracticeExamContext.Provider value={providerValue}>{children}</PracticeExamContext.Provider>;
};

export const usePracticeExamContext = () => {
  const context = useContext(PracticeExamContext);
  if (context == null) {
    throw new Error('usePracticeExamContext() called outside of a ExamProvider?'); // an alert is not placed because this is an error for the developer not the user
  }
  return context;
};

export { PracticeExamContextProvider, PracticeExamContext };
