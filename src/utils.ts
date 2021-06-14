import React from 'react';
import { matchPath } from 'react-router-dom';
import { BaseLayout } from './components/BaseLayout';
import { HomeLayout } from './components/HomeLayout';
import { DocLayout } from './components/DocLayout';
import { BlogLayout } from './components/BlogLayout';
import { ThemeOptions } from './types';

export function getLayout(staticDataPart: Record<string, any> = {}) {
  const { layout, home, blog, sourceType } = staticDataPart;

  if (home) {
    return HomeLayout;
  }

  if (blog) {
    return BlogLayout;
  }

  if (layout === false || layout === 'false') {
    return React.Fragment;
  }

  if (sourceType === 'md') {
    return DocLayout;
  }

  return BaseLayout;
}

export function mergeThemeOptions(
  options: ThemeOptions,
  pathname?: string
): ThemeOptions {
  const foundPath = Object.keys(options.themeOptionsByPaths || {})
    .sort((a, b) => b.length - a.length)
    .find(path => matchPath(pathname, path));
  return { ...options, ...options.themeOptionsByPaths?.[foundPath] };
}

interface LocaleOption {
  locale: string;
  localeText: React.ReactNode;
  localePath: string;
}

export function getLocales(options: ThemeOptions): LocaleOption[] {
  const res: LocaleOption[] = [];

  const extractLocale = (localePath: string, options: ThemeOptions = {}) => {
    const { locale, localeText = locale } = options;

    if (locale && localeText) {
      res.push({
        locale,
        localeText,
        localePath,
      });
    }
  };

  extractLocale('/', options);

  Object.entries(options.themeOptionsByPaths || {}).forEach(
    ([path, pathOptions]) => {
      extractLocale(path, pathOptions);
    }
  );

  if (res.length === 1) {
    console.warn('Only one locale is found in theme options.');
  }

  return res;
}

export function removeTailSlash(path: string) {
  return path.replace(/\/$/, '');
}

export function replaceLocaleInPath(
  path: string,
  currentLocalePath: string,
  targetLocalePath: string
) {
  currentLocalePath = removeTailSlash(currentLocalePath);
  targetLocalePath = removeTailSlash(targetLocalePath);

  if (!currentLocalePath) {
    return `${targetLocalePath}${path}`;
  }

  return (
    path.replace(new RegExp(`^${currentLocalePath}`), targetLocalePath) || '/'
  );
}
