import React, { PropsWithChildren, useContext, useMemo, useState } from 'react';

export interface LayoutContextInterface {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

export const LayoutContext = React.createContext<LayoutContextInterface>({
  collapsed: false,
  setCollapsed: () => {},
});

const LayoutProvider = ({ children }: PropsWithChildren) => {
  const [collapsed, setCollapsed] = useState(false);

  const value = useMemo(() => ({ collapsed, setCollapsed }), [collapsed]);

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
};

export const useLiveM = () => {
  const context = useContext(LayoutContext);

  if (!context) {
    throw new Error('Please use LiveMProvider in parent component');
  }

  return context;
};

export default LayoutProvider;
