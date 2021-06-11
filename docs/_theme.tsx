import React from 'react';
// import { createTheme } from '../dist/index.es';
import { createTheme } from '../src';

export default createTheme({
  title: '👻 Press',
  nav: [
    {
      text: 'Docs',
      link: '/getting-started',
    },
    {
      text: 'GitHub',
      link: 'https://github.com/codpoe/vite-pages-theme-press',
    },
  ],
  sidebar: [
    {
      text: 'Getting Started',
      link: '/getting-started',
    },
    {
      text: 'API',
      link: '/api',
    },
    {
      text: 'TODO',
      link: '/todo',
    },
  ],
  banner: (
    <div className="py-0.5 bg-gradient-to-r from-[#b92b27] to-[#1565C0] text-center text-gray-200 tracking-wide">
      This is WIP!
    </div>
  ),
  repo: 'codpoe/vite-pages-theme-press',
  docsDir: 'docs',
  editLink: true,
  lastUpdated: true,
});
