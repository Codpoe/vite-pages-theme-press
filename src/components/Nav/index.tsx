import React from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import { useTheme } from '../../context';
import { Link } from '../Link';
import { ChevronDown } from '../Icons';

export interface NavProps {
  className?: string;
}

export const Nav: React.FC<NavProps> = props => {
  const { className } = props;
  const { pathname } = useLocation();
  const { nav } = useTheme();

  if (!nav.length) {
    return null;
  }

  return (
    <ul
      className={`${className} items-center text-[0.9rem] font-medium leading-normal space-x-6 flex <md:hidden`}
    >
      {nav.map((item, index) => {
        if (item.items) {
          return (
            <li key={index} className="group relative">
              <div className="flex items-center cursor-pointer group">
                {item.text}
                <ChevronDown className="ml-1 text-c-text-lighter group-hover:(transform rotate-180) transition-transform" />
              </div>
              <div className="absolute top-full right-0 pt-2 hidden group-hover:block">
                <ul className="py-[6px] bg-c-bg overflow-y-auto rounded-md border border-c-divider shadow-sm text-sm">
                  {item.items.map((subItem, index) => (
                    <li key={index}>
                      <Link
                        {...subItem}
                        to={subItem.link}
                        color={false}
                        className="w-full px-4 font-normal leading-9 whitespace-nowrap hover:text-c-brand transition-colors"
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
              className={`border-b-2 -mb-0.5 transition-colors hover:border-c-brand ${
                matchPath(pathname, item.link)
                  ? 'border-c-brand'
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
