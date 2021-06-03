import { resolve } from 'path';
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import pages from 'vite-plugin-react-pages';
import mdx from 'vite-plugin-mdx';
import windicss from 'vite-plugin-windicss';

export default defineConfig(() => {
  return {
    root: '.',
    base: '/vite-pages-theme-press/',
    build: {
      outDir: resolve(__dirname, 'dist'),
    },
    plugins: [
      reactRefresh(),
      pages({ pagesDir: __dirname }),
      mdx(),
      windicss(),
    ],
  };
});
