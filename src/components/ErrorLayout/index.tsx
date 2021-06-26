import React from 'react';
import { Redirect } from 'react-router-dom';
import { useTheme } from '../../context';
import { BaseLayout } from '../BaseLayout';

export const ErrorLayout: React.FC = () => {
  const { staticData, loadState } = useTheme();
  const is404 = loadState.type === '404';

  if (is404 && staticData['/404']) {
    return <Redirect to="/404" />;
  }

  if (loadState.type === 'load-error' && staticData['/error']) {
    return <Redirect to="/error" />;
  }

  return (
    <BaseLayout>
      <div className="h-full flex justify-center items-center font-semibold">
        <h1 className="pr-6 border-r border-c-divider text-3xl">
          {is404 ? '404' : 'Error'}
        </h1>
        <p className="pl-6 text-base">
          {is404 ? 'Page Not Found' : 'Oops, Something Went Wrong'}
        </p>
      </div>
    </BaseLayout>
  );
};
