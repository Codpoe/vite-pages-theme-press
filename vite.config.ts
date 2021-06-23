import { defineConfig } from 'vite';
import windicss from 'vite-plugin-windicss';

export default defineConfig(() => {
  return {
    build: {
      lib: {
        entry: './src/index.tsx',
        formats: ['es'],
        fileName: 'index',
      },
      rollupOptions: {
        // 这里需要把 @mdx-js/react 设为 external，不能打包进 bundle，
        // 因为 markdown 文件经过 mdx 转换生成的代码依赖了 node_modules 的 @mdx-js/react，
        // 如果打包进 bundle，会导致 MDXContext 不是同一个了
        external: [
          'react',
          'react-dom',
          'react-router-dom',
          '@mdx-js/react',
          'react-helmet',
        ],
      },
    },
    plugins: [windicss()],
  };
});
