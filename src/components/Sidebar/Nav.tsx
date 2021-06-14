import React, { useCallback, useState } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import { useTheme } from '../../context';
import { Link } from '../Link';
import { ChevronRight } from '../Icons';
import { NavItem } from '../../types';

export const Nav: React.FC = () => {
  const { pathname } = useLocation();
  const { nav } = useTheme();

  const [open, setOpen] = useState<NavItem[]>([]);

  const toggleOpen = useCallback((item: NavItem) => {
    setOpen(prev => {
      const res = prev.slice();
      const index = prev.indexOf(item);

      if (index >= 0) {
        res.splice(index, 1);
      } else {
        res.push(item);
      }

      return res;
    });
  }, []);

  if (!nav?.length) {
    return null;
  }

  return (
    <ul className="mb-4 pb-4 border-b leading-9 text-gray-700 hidden <md:block dark:(border-dark-200 text-gray-300)">
      {nav.map((item, index) => {
        if (item.items) {
          const isOpen = open.includes(item);

          return (
            <li key={index}>
              <div
                className="flex items-center font-semibold"
                onClick={() => toggleOpen(item)}
              >
                {item.text}
                <ChevronRight
                  className={`ml-1 text-gray-400 transform transition-transform ${
                    isOpen ? 'rotate-90' : ''
                  }`}
                />
              </div>
              {isOpen && (
                <ul className="text-[0.9rem] leading-8 dark:border-dark-200)">
                  {item.items.map((subItem, index) => (
                    <li key={index}>
                      <Link
                        {...subItem}
                        to={subItem.link}
                        color={false}
                        className="w-full pl-4"
                      >
                        {subItem.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        }

        return (
          <li key={index}>
            <Link
              {...item}
              to={item.link}
              color={false}
              className={`w-full font-semibold ${
                matchPath(pathname, item.link) ? 'text-primary-500' : ''
              }`}
            >
              {item.text}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
