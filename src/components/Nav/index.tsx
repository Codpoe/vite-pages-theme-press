import React, { useMemo } from 'react';
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
  const { nav, repo, repoText = 'GitHub' } = useTheme();

  const finalNav = useMemo(() => {
    if (repo) {
      const _repo = /^[a-z]+:/i.test(repo)
        ? repo
        : `https://github.com/${repo}`;
      return (nav || []).concat({ link: _repo, text: repoText });
    }

    return nav || [];
  }, [nav, repo, repoText]);

  if (!finalNav.length) {
    return null;
  }

  return (
    <ul
      className={`${className} items-center text-[0.9rem] text-gray-700 font-medium leading-normal space-x-6 flex <md:hidden dark:text-gray-300`}
    >
      {finalNav.map((item, index) => {
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
                        className="w-full px-4 font-normal leading-9 whitespace-nowrap hover:(text-primary-500) transition-colors"
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
                matchPath(pathname, item.link)
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
