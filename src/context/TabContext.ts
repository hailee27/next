import { createContext } from 'react';

export type TypeTabContext = {
  prevTab?: () => void;
};

export const StepContext = createContext<TypeTabContext>({});
