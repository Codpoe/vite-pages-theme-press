import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import { useTheme } from '../../context';
import { Items } from './Items';
import { SidebarItem } from './types';

export const Sidebar: React.FC = () => {
  const { pathname } = useLocation();
  const { sidebar } = useTheme();

  const hitItems = useMemo(() => {
    const res: SidebarItem[] = [];

    const find = (items?: SidebarItem[]) => {
      if (!items?.length) {
        return false;
      }

      for (let i = 0; i < items.length; i++) {
        res.push(items[i]);

        if (matchPath(pathname, items[i].link)) {
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
  }, [pathname, sidebar]);

  const [activeItems, setActiveItems] = useState<SidebarItem[]>(hitItems);

  useEffect(() => {
    setActiveItems(prev => [...new Set([...prev, ...hitItems])]);
  }, [hitItems]);

  useEffect(() => {
    console.log('mounted');
  }, []);

  if (!sidebar?.length) {
    return null;
  }

  return (
    <aside
      className="w-56 mr-9 sticky top-24 overflow-y-auto hidden md:block"
      style={{ maxHeight: 'calc(100vh - 8rem)' }}
    >
      <div className="border-r text-[0.9rem] leading-normal text-gray-500 dark:(border-dark-200 text-gray-400)">
        <Items
          items={sidebar}
          hitItems={hitItems}
          activeItems={activeItems}
          inside={false}
          expanded={false}
          setActiveItems={setActiveItems}
        />
      </div>
    </aside>
  );
};
