import React from 'react';
import { Link } from 'react-router-dom';
import { BaseLayout } from '../BaseLayout';
import { Mdx } from '../Mdx';
import { Footer } from '../Footer';
import { useTheme } from '../../context';

interface HomeStaticData {
  heroImage?: string;
  heroText?: React.ReactNode;
  tagline?: React.ReactNode;
  actions?: { text: React.ReactNode; link: string }[];
  features?: { title?: React.ReactNode; details?: React.ReactNode }[];
  footer?: React.ReactNode;
}

export const HomeLayout: React.FC = props => {
  const { children } = props;
  const { loadedRoutePath, staticData } = useTheme();
  const { heroImage, heroText, tagline, actions, features, footer } =
    (staticData[loadedRoutePath]?.main || {}) as HomeStaticData;

  return (
    <BaseLayout>
      <div className="h-full grid grid-rows-[minmax(0,1fr),auto] grid-cols-1">
        <div>
          <header className="mt-8 mb-12 flex flex-col justify-center <md:mt-0">
            {heroImage &&
              (heroImage.includes('/') ? (
                <img
                  src={heroImage}
                  alt="hero"
                  className="max-w-full max-h-60 mx-auto mb-6 <md:max-h-52"
                />
              ) : (
                <div className="mx-auto mb-6 text-[170px] leading-normal">
                  {heroImage}
                </div>
              ))}
            {heroText && (
              <h1 className="mb-4 text-center text-5xl font-semibold text-gray-800 dark:text-gray-200">
                {heroText}
              </h1>
            )}
            {tagline && (
              <p className="mb-6 text-center text-2xl text-gray-500 dark:text-gray-400">
                {tagline}
              </p>
            )}
            {actions && (
              <div className="flex justify-center mt-4 space-x-6">
                {actions.map((action, index) => (
                  <Link key={index} to={action.link}>
                    <button
                      className={`h-14 px-8 text-lg ${
                        index === 0 ? 'btn-primary' : 'btn-hollow'
                      }`}
                    >
                      {action.text}
                    </button>
                  </Link>
                ))}
              </div>
            )}
          </header>
          {features && (
            <div className="grid grid-cols-[repeat(3,1fr)] gap-10 my-12 pt-10 border-t dark:border-dark-200 <sm:grid-cols-1">
              {features.map((feature, index) => (
                <div key={index}>
                  {feature.title && (
                    <h2 className="mb-3 text-xl font-medium text-gray-700 dark:text-gray-200">
                      {feature.title}
                    </h2>
                  )}
                  {feature.details && (
                    <p className="text-base text-gray-500 dark:text-gray-400">
                      {feature.details}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
          <Mdx>{children}</Mdx>
        </div>
        {footer && <Footer>{footer}</Footer>}
      </div>
    </BaseLayout>
  );
};
