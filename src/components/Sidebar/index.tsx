import React, { useEffect, useMemo, useState } from 'react';
import { matchPath } from 'react-router-dom';
import { useTheme } from '../../context';
import { useSidebar } from '../../hooks/useSidebar';
import { Items } from './Items';
import { Nav } from './Nav';
import { SidebarItem } from './types';
import styles from './style.module.less';

export const Sidebar: React.FC = () => {
  const { loadedRoutePath, sidebarOpen, setSidebarOpen } = useTheme();
  const sidebar = useSidebar();

  const hitItems = useMemo(() => {
    const res: SidebarItem[] = [];

    const find = (items?: SidebarItem[]) => {
      if (!items?.length) {
        return false;
      }

      for (let i = 0; i < items.length; i++) {
        res.push(items[i]);

        if (
          matchPath(items[i].link || '', { path: loadedRoutePath, exact: true })
        ) {
          return true;
        }

        if (find(items[i].items)) {
          return true;
        }

        res.pop();
      }
    };

    find(sidebar);

    return res;
  }, [loadedRoutePath, sidebar]);

  const [activeItems, setActiveItems] = useState<SidebarItem[]>(hitItems);

  useEffect(() => {
    setActiveItems(prev => [...new Set([...prev, ...hitItems])]);
  }, [hitItems]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [loadedRoutePath, setSidebarOpen]);

  return (
    <>
      <aside
        className={`border-r overflow-y-auto <md:(w-64 px-4 py-3 fixed top-16 right-full bottom-0 z-20 bg-white border-r transform transition-transform dark:bg-dark-700) md:(w-56 mr-9 sticky top-24) dark:border-dark-200 ${
          sidebarOpen ? '<md:translate-x-full' : ''
        } ${hitItems.length > 0 ? 'block' : 'hidden <md:block'} ${
          styles.sidebar
        }`}
      >
        <Nav />
        {/* no hit, indicating that the current path does not have a sidebar */}
        {hitItems.length > 0 && (
          <div className="text-gray-700 dark:text-gray-300">
            <Items
              items={sidebar}
              hitItems={hitItems}
              activeItems={activeItems}
              inside={false}
              expanded={false}
              setActiveItems={setActiveItems}
            />
          </div>
        )}
      </aside>
      {sidebarOpen && (
        <div
          className="fixed top-0 bottom-0 left-0 right-0 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};
