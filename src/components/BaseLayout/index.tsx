import React from 'react';
import { useTheme } from '../../context';
import { Header } from '../Header';
import { Sidebar } from '../Sidebar';

export const BaseLayout: React.FC = ({ children }) => {
  const { banner } = useTheme();

  return (
    <div className="min-h-screen grid grid-rows-[auto,auto,1fr]">
      <div>{banner}</div>
      <Header />
      <main className="w-full max-w-screen-lg px-4 py-8 mx-auto grid grid-cols-[auto,minmax(0,1fr)] justify-items-center items-start">
        <Sidebar />
        <div className="col-start-2 self-stretch w-full">{children}</div>
      </main>
    </div>
  );
};
