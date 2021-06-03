import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTheme } from '../../context';
import { Link } from '../Link';
import { ChevronDown } from '../Icons';

export const Nav: React.FC = () => {
  const { pathname } = useLocation();
  const { nav } = useTheme();

  const isActive = (targetPath?: string) => {
    if (!targetPath) {
      return false;
    }

    let base = import.meta.env.BASE_URL;
    base = base === '/' ? '' : base;

    return base + targetPath === pathname;
  };

  if (!nav?.length) {
    return null;
  }

  return (
    <ul className="flex items-center text-[0.9rem] text-gray-700 leading-normal space-x-6 dark:text-gray-300">
      {nav.map((item, index) => {
        if (item.items) {
          return (
            <li key={index} className="group relative">
              <div className="flex items-center cursor-pointer group">
                {item.text}
                <ChevronDown className="ml-1 text-gray-400 group-hover:(transform rotate-180) transition-transform" />
              </div>
              <div className="absolute top-full right-0 pt-2 hidden group-hover:block">
                <ul className="py-[6px] bg-white overflow-y-auto rounded-md border shadow-sm text-sm dark:(bg-dark-700 border-dark-200)">
                  {item.items.map((subItem, index) => (
                    <li key={index}>
                      <Link
                        {...subItem}
                        to={subItem.link}
                        color={false}
                        className="w-full px-4 leading-9 whitespace-nowrap hover:(text-primary-500) transition-colors"
                      >
                        {subItem.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        }

        return (
          <li key={index}>
            <Link
              {...item}
              to={item.link}
              color={false}
              className={`border-b-2 -mb-0.5 transition-colors hover:border-primary-500 ${
                isActive(item.link)
                  ? 'border-primary-500'
                  : 'border-transparent'
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
