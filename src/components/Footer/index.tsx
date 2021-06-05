import React from 'react';

export const Footer: React.FC = props => {
  const { children } = props;

  return (
    <footer>
      <div className="w-full max-w-screen-lg mx-auto pt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        {children}
      </div>
    </footer>
  );
};
