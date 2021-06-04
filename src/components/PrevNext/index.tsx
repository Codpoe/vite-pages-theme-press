import React, { useMemo } from 'react';
import { Link } from '../Link';
import { ArrowLeft, ArrowRight } from '../Icons';
import { useTheme } from '../../context';
import { SidebarItem } from '../../types';

const Item: React.FC<{ type: 'prev' | 'next'; item?: SidebarItem }> = ({
  type,
  item,
}) => {
  if (!item) {
    return null;
  }

  return (
    <div
      className={`w-1/2 flex items-center text-[0.9rem] leading-normal ${
        type === 'prev' ? 'flex-row pr-4' : 'flex-row-reverse ml-auto pl-4'
      }`}
    >
      {type === 'prev' ? (
        <ArrowLeft className="flex-shrink-0 mr-1 text-gray-700 dark:text-gray-400" />
      ) : (
        <ArrowRight className="flex-shrink-0 ml-1 text-gray-700 dark:text-gray-400" />
      )}
      <Link to={item.link}>{item.text}</Link>
    </div>
  );
};

export const PrevNext: React.FC = () => {
  const { sidebar, loadedRoutePath } = useTheme();

  const { prev, next } = useMemo<{
    prev?: SidebarItem;
    next?: SidebarItem;
  }>(() => {
    let _prev: SidebarItem | undefined;
    let _next: SidebarItem | undefined;
    let found = false;

    function find(items: SidebarItem[] = []) {
      for (let i = 0; i < items.length; i++) {
        if (_next) {
          break;
        }

        if (items[i].items) {
          find(items[i].items);
          continue;
        }

        if (found) {
          _next = items[i];
          break;
        }

        if (items[i].link === loadedRoutePath) {
          found = true;
          continue;
        }

        _prev = items[i];
      }
    }

    find(sidebar);

    return { prev: _prev, next: _next };
  }, [sidebar, loadedRoutePath]);

  if (!prev && !next) {
    return null;
  }

  return (
    <div className="flex justify-between items-center mt-16 py-4 border-t dark:border-dark-200">
      <Item type="prev" item={prev} />
      <Item type="next" item={next} />
    </div>
  );
};