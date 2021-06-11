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

export interface CreateThemeOptions {
  [key: string]: any;
  logo?: string;
  title?: React.ReactNode;
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
}
