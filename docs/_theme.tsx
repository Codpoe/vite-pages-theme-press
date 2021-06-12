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
  // algolia: {
  //   apiKey: '25626fae796133dc1e734c6bcaaeac3c',
  //   indexName: 'docsearch',
  // },
  // themeOptionsByPaths: {
  //   '/api': {
  //     title: '啦啦啦',
  //     banner: (
  //       <div className="py-0.5 bg-gradient-to-r from-[#b92b27] to-[#1565C0] text-center text-gray-200 tracking-wide">
  //         开发中！
  //       </div>
  //     ),
  //     nav: [
  //       {
  //         text: '文档',
  //         link: '/getting-started',
  //       },
  //     ],
  //     sidebar: [
  //       {
  //         text: '快速上手',
  //         link: '/getting-started',
  //       },
  //       {
  //         text: 'API',
  //         link: '/api',
  //       },
  //       {
  //         text: '待办',
  //         link: '/todo',
  //       },
  //     ],
  //   },
  // },
});
