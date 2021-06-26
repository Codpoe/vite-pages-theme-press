import React from 'react';
import { Link } from 'react-router-dom';

interface ItemProps {
  link: string;
  title: string;
  updatedTime: string;
}

export const Item: React.FC<ItemProps> = props => {
  const { link, title, updatedTime } = props;

  return (
    <Link
      to={link}
      className="group flex justify-between items-center py-9 duration-500"
    >
      <h1 className="font-semibold tracking-wide text-xl group-hover:text-c-brand transition-colors">
        {title}
      </h1>
      {updatedTime && (
        <div className="flex-shrink-0 ml-8 text-[0.9rem] text-c-text-lighter">
          {new Date(updatedTime).toLocaleDateString()}
        </div>
      )}
    </Link>
  );
};
