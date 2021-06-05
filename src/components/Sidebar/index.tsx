import React, { useEffect, useMemo, useState } from 'react';
import { matchPath } from 'react-router-dom';
import { useTheme } from '../../context';
import { useSidebar } from '../../hooks/useSidebar';
import { Items } from './Items';
import { SidebarItem } from './types';

export const Sidebar: React.FC = () => {
  const { loadedRoutePath } = useTheme();
  const sidebar = useSidebar();

  const hitItems = useMemo(() => {
    const res: SidebarItem[] = [];

    const find = (items?: SidebarItem[]) => {
      if (!items?.length) {
        return false;
      }

      for (let i = 0; i < items.length; i++) {
        res.push(items[i]);

        if (matchPath(loadedRoutePath, items[i].link)) {
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
    console.log('mounted');
  }, []);

  // no hit, indicating that the current path does not have a sidebar
  if (!sidebar?.length || !hitItems.length) {
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
