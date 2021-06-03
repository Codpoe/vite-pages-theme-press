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
});
