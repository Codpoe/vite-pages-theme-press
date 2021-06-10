import React from 'react';
import { useTheme } from '../../context';
import { BaseLayout } from '../BaseLayout';
import { Mdx } from '../Mdx';
import { UpdateInfo } from '../UpdateInfo';
import { PrevNext } from '../PrevNext';
import { Toc } from '../Toc';

export const DocLayout: React.FC = ({ children }) => {
  const { useHashRouter, loadedRoutePath } = useTheme();

  return (
    <BaseLayout>
      <div className="max-w-screen-md mx-auto relative">
        <Mdx className="pb-8">{children}</Mdx>
        <UpdateInfo />
        <PrevNext />
        {/* 使用 hash router 时禁用 Toc */}
        {!useHashRouter && (
          <div className="absolute top-0 bottom-0 left-full hidden 2xl:block">
            {/* 加个 key，清理 Toc 的状态 */}
            <Toc key={loadedRoutePath} />
          </div>
        )}
      </div>
    </BaseLayout>
  );
};
