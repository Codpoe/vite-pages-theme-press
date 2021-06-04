import React, { useRef } from 'react';
import 'virtual:windi.css';
import { Theme as PagesTheme } from 'vite-plugin-react-pages';
import { useStaticData } from 'vite-plugin-react-pages/client';
import { BaseLayout } from './components/BaseLayout';
import { HomeLayout } from './components/HomeLayout';
import { DocLayout } from './components/DocLayout';
import { H2, P } from './components/Mdx/mdxComponents';
import { ThemeProvider } from './context';
import { CreateThemeOptions } from './types';
import { useLoadProgress } from './hooks/useLoadProgress';
import { useScrollToTop } from './hooks/useScrollToTop';

export * from './types';

function getLayout(routePath: string, sourceType: string, useLayout = true) {
  if (!useLayout) {
    return React.Fragment;
  }

  if (routePath === '/') {
    return HomeLayout;
  }

  if (sourceType === 'md') {
    return DocLayout;
  }

  return BaseLayout;
}

export function createTheme(options: CreateThemeOptions = {}) {
  const Theme: PagesTheme = props => {
    const { loadState, loadedData } = props;
    const staticData = useStaticData();
    const loadedRoutePath = useRef<string | undefined>();

    useLoadProgress(loadState);

    useScrollToTop(loadState);

    if (loadState.type === 'load-error') {
      // TODO
      return null;
    }

    // TODO
    if (loadState.type === '404') {
      return null;
    }

    if (loadState.type === 'loaded') {
      loadedRoutePath.current = loadState.routePath;
    }

    if (!loadedRoutePath.current) {
      return null;
    }

    const pageData = loadedData[loadedRoutePath.current];
    const pageStaticData = staticData[loadedRoutePath.current];
    const isComposedPage = Object.keys(pageData).length > 1;

    let content: any;

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
            Layout = getLayout(loadedRoutePath.current, 'md');
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
        const Layout = getLayout(
          loadedRoutePath.current,
          pageStaticDataPart.sourceType
        );

        return (
          <Layout key={index}>
            <Component />
          </Layout>
        );
      });
    }

    return (
      <ThemeProvider
        value={{
          ...options,
          // @ts-ignore
          useHashRouter: __HASH_ROUTER__,
          staticData,
          loadState,
          loadedData,
          loadedRoutePath: loadedRoutePath.current,
        }}
      >
        {content}
      </ThemeProvider>
    );
  };

  return Theme;
}
