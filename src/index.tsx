import 'virtual:windi.css';
import React, { useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Theme as PagesTheme } from 'vite-plugin-react-pages';
import { useStaticData } from 'vite-plugin-react-pages/client';
import { Helmet } from 'react-helmet';
import { CSSPreflight } from './components/CSSPreflight';
import { ErrorLayout } from './components/ErrorLayout';
import { H2, P } from './components/Mdx/mdxComponents';
import { ThemeProvider } from './context';
import { ThemeOptions } from './types';
import { useLoadProgress } from './hooks/useLoadProgress';
import { useScrollToTop } from './hooks/useScrollToTop';
import {
  mergeThemeOptions,
  getLayout,
  getLocales,
  replaceLocaleInPath,
} from './utils';

export * from './types';

export function createTheme(options: ThemeOptions = {}) {
  const locales = getLocales(options);

  const Theme: PagesTheme = props => {
    const { loadState, loadedData } = props;
    const staticData = useStaticData();
    const { pathname } = useLocation();
    const loadedRoutePath = useRef<string | undefined>();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    if (loadState.type === '404' || loadState.type === 'load-error') {
      loadedRoutePath.current = undefined;
    } else if (loadState.type === 'loaded') {
      loadedRoutePath.current = loadState.routePath;
    }

    const finalOptions = mergeThemeOptions(options, pathname);

    const currentLocale = locales.find(
      item => item.locale === finalOptions.locale
    );

    const finalNav = useMemo(() => {
      const { nav, repo, repoText = 'GitHub' } = finalOptions;
      const res = (nav || []).slice();

      if (locales.length && currentLocale) {
        res.push({
          text: currentLocale.localeText,
          items: locales.map(item => ({
            text: item.localeText,
            link: replaceLocaleInPath(
              pathname,
              currentLocale.localePath,
              item.localePath
            ),
          })),
        });
      }

      if (repo) {
        const _repo = /^[a-z]+:/i.test(repo)
          ? repo
          : `https://github.com/${repo}`;
        res.push({ link: _repo, text: repoText });
      }

      return res;
    }, [finalOptions, currentLocale, pathname]);

    const homePaths = useMemo(() => {
      return Object.keys(staticData)
        .filter(path => Boolean(staticData[path].main?.home))
        .sort((pathA, pathB) => pathA.length - pathB.length);
    }, [staticData]);

    const homePath = currentLocale
      ? homePaths.find(item => item.startsWith(currentLocale.localePath))
      : homePaths[0];

    const blogPaths = useMemo(() => {
      return Object.entries(staticData)
        .filter(([, data]) => Boolean(data.main.blog))
        .map(([pageId]) => pageId.replace(/\/:page$/, ''));
    }, [staticData]);

    const siteTitle = useMemo(() => {
      const pageTitle = staticData[loadedRoutePath.current]?.main?.title || '';

      if (pageTitle && finalOptions.title) {
        return `${pageTitle} | ${finalOptions.title}`;
      }
      return pageTitle || finalOptions.title;
    }, [staticData, finalOptions.title]);

    let content: any;

    console.log({ staticData, loadedData });

    useLoadProgress(loadState);

    useScrollToTop(loadState);

    if (loadState.type === '404' || loadState.type === 'load-error') {
      content = <ErrorLayout />;
    } else {
      if (!loadedRoutePath.current) {
        return <CSSPreflight />;
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

    return (
      <>
        <Helmet htmlAttributes={{ lang: currentLocale?.locale }}>
          {siteTitle && <title>{siteTitle}</title>}
          {finalOptions.head}
        </Helmet>
        <CSSPreflight />
        <ThemeProvider
          value={{
            ...finalOptions,
            nav: finalNav,
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
            homePath,
            blogPaths,
            locales,
            currentLocale,
          }}
        >
          {content}
        </ThemeProvider>
      </>
    );
  };

  return Theme;
}
