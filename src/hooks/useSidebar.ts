import { useMemo } from 'react';
import { useTheme } from '../context';
import { SidebarItem } from '../types';

export function useSidebar(): SidebarItem[] | undefined {
  const { sidebar, loadedRoutePath } = useTheme();

  return useMemo<SidebarItem[] | undefined>(() => {
    if (!sidebar) {
      return undefined;
    }

    if (Array.isArray(sidebar)) {
      return sidebar;
    }

    const found = Object.keys(sidebar)
      .sort((prePathA, prePathB) => prePathB.length - prePathA.length)
      .find(prePath => loadedRoutePath.startsWith(prePath));

    return sidebar[found];
  }, [sidebar, loadedRoutePath]);
}
