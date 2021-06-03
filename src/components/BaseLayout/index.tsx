import React from 'react';
import { Header } from '../Header';
import './style.less';

export const BaseLayout: React.FC = ({ children }) => {
  return (
    <div className="min-h-screen grid grid-rows-[auto,1fr] dark:bg-dark-700">
      <Header />
      {children}
    </div>
  );
};