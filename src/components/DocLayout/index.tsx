import React from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { useTheme } from '../../context';
import { BaseLayout } from '../BaseLayout';
import { Mdx } from '../Mdx';
import { UpdateInfo } from '../UpdateInfo';
import { PrevNext } from '../PrevNext';
import { Toc } from '../Toc';
import './style.less';

export const DocLayout: React.FC = ({ children }) => {
  const { useHashRouter, loadedRoutePath } = useTheme();

  return (
    <BaseLayout>
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={loadedRoutePath}
          classNames="doc-slide"
          timeout={300}
        >
          <div className="max-w-screen-md mx-auto relative">
            <Mdx className="pb-8">{children}</Mdx>
            <UpdateInfo loadedRoutePath={loadedRoutePath} />
            <PrevNext loadedRoutePath={loadedRoutePath} />
            {/* 使用 hash router 时禁用 Toc */}
            {!useHashRouter && (
              <div className="absolute top-24 bottom-0 left-full hidden 2xl:block">
                <Toc />
              </div>
            )}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </BaseLayout>
  );
};
