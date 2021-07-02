import { resolve } from 'path';
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import pages from 'vite-plugin-react-pages';
import mdx from 'vite-plugin-mdx';
import windicss from 'vite-plugin-windicss';
import slug from 'remark-slug';
import { PressPageStrategy } from '../node/pageStrategy';
import windiConfig from '../windi.config';

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
      mdx({
        remarkPlugins: [slug],
      }),
      windicss({
        config: {
          ...windiConfig,
          extract: {
            ...windiConfig.extract,
            include: (windiConfig.extract?.include || []).concat(
              resolve(__dirname, './_theme.tsx')
            ),
          },
        },
      }),
    ],
  };
});
