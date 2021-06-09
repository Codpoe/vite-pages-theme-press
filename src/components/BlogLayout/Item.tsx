import React from 'react';
import { Link } from 'react-router-dom';

interface ItemProps {
  link: string;
  title: string;
  lastUpdated: string;
}

export const Item: React.FC<ItemProps> = props => {
  const { link, title, lastUpdated } = props;

  return (
    <Link
      to={link}
      className="group flex justify-between items-center py-9 duration-500"
    >
      <h1 className="font-semibold tracking-wide text-xl text-gray-700 group-hover:text-primary-500 dark:text-gray-200 transition-colors">
        {title}
      </h1>
      {lastUpdated && (
        <div className="flex-shrink-0 ml-8 text-[0.9rem] text-gray-500 dark:text-gray-400">
          {new Date(lastUpdated).toLocaleDateString()}
        </div>
      )}
    </Link>
  );
};
