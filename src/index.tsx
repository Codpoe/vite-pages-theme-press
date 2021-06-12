import 'virtual:windi.css';
import './styles/base.less';

import React, { useMemo, useRef, useState } from 'react';
import { Theme as PagesTheme } from 'vite-plugin-react-pages';
import { useStaticData } from 'vite-plugin-react-pages/client';
import { CSSProperties } from './components/CSSProperties';
import { BaseLayout } from './components/BaseLayout';
import { HomeLayout } from './components/HomeLayout';
import { DocLayout } from './components/DocLayout';
import { BlogLayout } from './components/BlogLayout';
import { ErrorLayout } from './components/ErrorLayout';
import { H2, P } from './components/Mdx/mdxComponents';
import { ThemeProvider } from './context';
import { ThemeOptions } from './types';
import { useLoadProgress } from './hooks/useLoadProgress';
import { useScrollToTop } from './hooks/useScrollToTop';

export * from './types';

function getLayout(staticDataPart: Record<string, any> = {}) {
  const { layout, home, blog, sourceType } = staticDataPart;

  if (home) {
    return HomeLayout;
  }

  if (blog) {
    return BlogLayout;
  }

  if (layout === false || layout === 'false') {
    return React.Fragment;
  }

  if (sourceType === 'md') {
    return DocLayout;
  }

  return BaseLayout;
}

function mergeThemeOptions(options: ThemeOptions, loadedRoutePath?: string) {
  return { ...options, ...options[loadedRoutePath] };
}

export function createTheme(options: ThemeOptions = {}) {
  const Theme: PagesTheme = props => {
    const { loadState, loadedData } = props;
    const staticData = useStaticData();
    const loadedRoutePath = useRef<string | undefined>();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const blogPaths = useMemo(() => {
      return Object.entries(staticData)
        .filter(([, data]) => Boolean(data.main.blog))
        .map(([pageId]) => pageId.replace(/\/:page$/, ''));
    }, [staticData]);

    let content: any;

    console.log({ staticData, loadedData });

    useLoadProgress(loadState);

    useScrollToTop(loadState);

    if (loadState.type === '404' || loadState.type === 'load-error') {
      loadedRoutePath.current = undefined;
      content = <ErrorLayout />;
    } else {
      if (loadState.type === 'loaded') {
        loadedRoutePath.current = loadState.routePath;
      }

      if (!loadedRoutePath.current) {
        return <CSSProperties />;
      }

      const pageData = loadedData[loadedRoutePath.current];
      const pageStaticData = staticData[loadedRoutePath.current];
      const isComposedPage = Object.keys(pageData).length > 1;

      if (isComposedPage) {
        let Layout: React.ComponentType<any> = React.Fragment;

        content = Object.entries(pageData)
          .sort(([key1], [key2]) => {
            // README should be the first section
            if (key1 === 'README') return -1;
            if (key2 === 'README') return 1;
            return key1.localeCompare(key2);
          })
          .map(([key, dataPart], index) => {
            const isREADME = key === 'README';
            const Component = dataPart.default;
            const pageStaticDataPart = pageStaticData[key];

            if (pageStaticDataPart.sourceType === 'md') {
              Layout = getLayout(pageStaticDataPart);
            }

            return (
              <React.Fragment key={index}>
                {!isREADME && pageStaticDataPart.title && (
                  <H2>{pageStaticDataPart.title}</H2>
                )}
                {pageStaticDataPart.description && (
                  <P>{pageStaticDataPart.description}</P>
                )}
                <Component />
              </React.Fragment>
            );
          });

        content = <Layout>{content}</Layout>;
      } else {
        content = Object.entries(pageData).map(([key, dataPart], index) => {
          const Component = dataPart.default;
          const pageStaticDataPart = pageStaticData[key];
          const Layout = getLayout(pageStaticDataPart);

          return (
            <Layout key={index}>
              <Component />
            </Layout>
          );
        });
      }
    }

    const finalOptions = mergeThemeOptions(options, loadedRoutePath.current);

    return (
      <>
        <CSSProperties />
        <ThemeProvider
          value={{
            ...finalOptions,
            base: import.meta.env.BASE_URL,
            // vite-plugin-react-pages will inject `__HASH_ROUTER__: boolean`
            // @ts-ignore
            useHashRouter: __HASH_ROUTER__,
            staticData,
            loadState,
            loadedData,
            loadedRoutePath: loadedRoutePath.current,
            sidebarOpen,
            setSidebarOpen,
            blogPaths,
          }}
        >
          {content}
        </ThemeProvider>
      </>
    );
  };

  return Theme;
}
