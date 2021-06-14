import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context';
import { Nav } from '../Nav';
import { Search } from '../Search';
import { ThemeModeSwitch } from '../ThemeModeSwitch';
import { Menu as IconMenu } from '../Icons';

export const Header: React.FC = () => {
  const { logo, title, setSidebarOpen, homePath } = useTheme();

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b dark:(bg-dark-700 border-dark-200)">
      <div className="w-full max-w-screen-lg h-full mx-auto px-4 flex items-center">
        <div
          className="hidden <md:block text-2xl py-2 pr-4 text-gray-900 dark:text-gray-200"
          onClick={() => setSidebarOpen(prev => !prev)}
        >
          <IconMenu />
        </div>
        <Link className="flex items-center space-x-2" to={homePath}>
          {logo && <img className="h-8 min-w-8" src={logo} alt="logo" />}
          {title && (
            <h1 className="text-xl text-gray-900 font-semibold dark:text-gray-200">
              {title}
            </h1>
          )}
        </Link>
        <div className="ml-auto flex items-center">
          <Nav />
          <div className="w-px h-6 mx-4 bg-gray-300 dark:bg-dark-50 <md:hidden"></div>
          <div className="space-x-4 <md:space-x-2">
            <ThemeModeSwitch />
            <Search />
          </div>
        </div>
      </div>
    </header>
  );
};
