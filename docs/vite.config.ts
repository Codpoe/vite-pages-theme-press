import { resolve } from 'path';
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import pages from 'vite-plugin-react-pages';
import mdx from 'vite-plugin-mdx';
import windicss from 'vite-plugin-windicss';
import { PressPageStrategy } from '../node/pageStrategy';

export default defineConfig(() => {
  return {
    root: '.',
    build: {
      outDir: resolve(__dirname, 'dist'),
    },
    plugins: [
      reactRefresh(),
      pages({
        pagesDir: __dirname,
        pageStrategy: new PressPageStrategy(),
      }),
      mdx(),
      windicss(),
    ],
  };
});
