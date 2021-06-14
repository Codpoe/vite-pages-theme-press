import React from 'react';

export interface NavItem {
  [key: string]: any;
  text: React.ReactNode;
  link?: string;
  items?: NavItem[];
}

export interface SidebarItem {
  [key: string]: any;
  text: React.ReactNode;
  link?: string;
  items?: SidebarItem[];
}

export interface LocaleOption {
  locale: string;
  localeText: React.ReactNode;
  localePath: string;
}

export interface ThemeOptions {
  [key: string]: any;
  locale?: string;
  localeText?: React.ReactNode;
  logo?: string;
  title?: React.ReactNode;
  head?: React.ReactNode;
  nav?: NavItem[];
  sidebar?: SidebarItem[] | Record<string, SidebarItem[]>;
  banner?: React.ReactNode;
  repo?: string;
  repoText?: React.ReactNode;
  docsRepo?: string;
  docsDir?: string;
  docsBranch?: string;
  editLink?: boolean | string;
  lastUpdated?: boolean | string;
  algolia?: {
    [key: string]: any;
    apiKey: string;
    indexName: string;
    appId?: string;
    algoliaOptions?: Record<string, any>;
  };
  themeOptionsByPaths?: Record<string, ThemeOptions>;
}
