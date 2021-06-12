import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context';
import { Nav } from '../Nav';
import { Search } from '../Search';
import { ThemeModeSwitch } from '../ThemeModeSwitch';
import { Menu as IconMenu } from '../Icons';

export const Header: React.FC = () => {
  const { logo, title, setSidebarOpen } = useTheme();

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b dark:(bg-dark-700 border-dark-200)">
      <div className="w-full max-w-screen-lg h-full mx-auto px-4 flex items-center">
        <div
          className="md:hidden text-2xl py-2 pr-4 text-gray-900 dark:text-gray-200"
          onClick={() => setSidebarOpen(prev => !prev)}
        >
          <IconMenu />
        </div>
        <Link className="flex items-center space-x-2" to="/">
          {logo && <img className="h-7 max-w-full" src={logo} alt="logo" />}
          {title && (
            <h1 className="text-xl text-gray-900 font-medium dark:text-gray-200">
              {title}
            </h1>
          )}
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          <Nav />
          <ThemeModeSwitch />
          <Search />
        </div>
      </div>
    </header>
  );
};
