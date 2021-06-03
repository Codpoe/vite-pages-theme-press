import React from 'react';
import { useTheme } from '../../context';
import { BaseLayout } from '../BaseLayout';
import { Mdx } from '../Mdx';
import { PrevNext } from '../PrevNext';
import { Sidebar } from '../Sidebar';
import { Toc } from '../Toc';

export const DocLayout: React.FC = ({ children }) => {
  const { loadedRoutePath } = useTheme();

  return (
    <BaseLayout>
      <main className="w-full max-w-screen-lg px-4 py-8 mx-auto grid grid-cols-[auto,minmax(0,1fr)] justify-items-center">
        <Sidebar />
        <div className="col-start-2 w-full max-w-screen-md relative">
          <Mdx>{children}</Mdx>
          <PrevNext />
          <div className="absolute top-0 bottom-0 left-full hidden 2xl:block">
            {/* 加个 key，清理 Toc 的状态 */}
            <Toc key={loadedRoutePath} />
          </div>
        </div>
      </main>
    </BaseLayout>
  );
};
