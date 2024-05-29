import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import { ProviderExamType } from './type';

interface PropsType {
  children: React.ReactNode;
}

const ExamContext = createContext<ProviderExamType | undefined>(undefined);

const ExamContextProvider = ({ children }: PropsType) => {
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

  return <ExamContext.Provider value={providerValue}>{children}</ExamContext.Provider>;
};

export const useExamContext = () => {
  const context = useContext(ExamContext);
  if (context == null) {
    throw new Error('useExamContext() called outside of a ExamProvider?'); // an alert is not placed because this is an error for the developer not the user
  }
  return context;
};

export { ExamContextProvider, ExamContext };
