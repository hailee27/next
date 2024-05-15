import React from 'react';

interface PropsType {
  children: React.ReactNode;
}

const MainPage = ({ children }: PropsType) => <div className="py-6">{children}</div>;

export default MainPage;
