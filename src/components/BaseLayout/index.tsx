import React from 'react';
import { Header } from '../Header';
import { Sidebar } from '../Sidebar';
import './style.less';

export const BaseLayout: React.FC = ({ children }) => {
  return (
    <div className="min-h-screen grid grid-rows-[auto,1fr] dark:bg-dark-700">
      <Header />
      <main className="w-full max-w-screen-lg px-4 py-8 mx-auto grid grid-cols-[auto,minmax(0,1fr)] justify-items-center items-start">
        <Sidebar />
        <div className="col-start-2 self-stretch w-full">{children}</div>
      </main>
    </div>
  );
};
