import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context';
import { Nav } from '../Nav';
import { Search } from '../Search';
import { ThemeModeSwitch } from '../ThemeModeSwitch';
import { Menu as IconMenu } from '../Icons';

export const Header: React.FC = () => {
  const { logo, title, setSidebarOpen, homePath = '', hasSidebar } = useTheme();

  return (
    <header className="sticky top-0 z-30 h-16 bg-c-bg border-b border-c-divider">
      <div className="w-full max-w-screen-lg h-full mx-auto px-4 flex items-center">
        {hasSidebar && (
          <div
            className="hidden <md:block text-2xl py-2 pr-4"
            onClick={() => setSidebarOpen(prev => !prev)}
          >
            <IconMenu />
          </div>
        )}
        <Link className="flex items-center space-x-2" to={homePath}>
          {logo && <img className="h-8 min-w-8" src={logo} alt="logo" />}
          {title && <h1 className="text-xl font-semibold">{title}</h1>}
        </Link>
        <div className="ml-auto flex items-center">
          <Nav />
          <div className="w-px h-6 mx-4 bg-c-divider <md:hidden"></div>
          <div className="space-x-4 <md:space-x-2">
            <ThemeModeSwitch />
            <Search />
          </div>
        </div>
      </div>
    </header>
  );
};
