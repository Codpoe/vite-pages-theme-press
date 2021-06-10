import React, { useMemo } from 'react';
import { useParams, useHistory, Redirect, matchPath } from 'react-router-dom';
import { useTheme } from '../../context';
import { BaseLayout } from '../BaseLayout';
import { Mdx } from '../Mdx';
import { Item } from './Item';
import { Pagination } from '../Pagination';

const PAGE_SIZE = 10;

export const BlogLayout: React.FC = props => {
  const { children } = props;
  const { push } = useHistory();
  const routeParams = useParams<{ page?: string }>();
  const routePage = Number(routeParams.page || 1);
  const page = isNaN(routePage) ? 1 : routePage;

  const { staticData, loadedRoutePath } = useTheme();

  const blogPath = useMemo(() => {
    return loadedRoutePath.replace(/\/:page$/, '');
  }, [loadedRoutePath]);

  const blogPosts = useMemo(() => {
    return Object.entries(staticData)
      .filter(
        ([pageId]) =>
          matchPath(pageId, blogPath) &&
          pageId !== blogPath &&
          !pageId.endsWith(':page')
      )
      .sort(([, pageA], [, pageB]) => {
        if (!pageA.lastUpdated) {
          return 1;
        }
        if (!pageB.lastUpdated) {
          return -1;
        }
        return pageA - pageB;
      });
  }, [staticData, blogPath]);

  const slicedBlogPosts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return blogPosts.slice(start, start + PAGE_SIZE);
  }, [blogPosts, page]);

  console.log({ page, blogPath, blogPosts });

  if (isNaN(routePage)) {
    return <Redirect to={blogPath} />;
  }

  return (
    <BaseLayout>
      <div className="max-w-screen-md mx-auto relative">
        <Mdx>{children}</Mdx>
        <div className="divide-y dark:divide-dark-200">
          {slicedBlogPosts.map(([link, data]) => (
            <Item key={link} {...data.main} link={link} />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Pagination
            total={blogPosts.length}
            page={page}
            pageSize={PAGE_SIZE}
            onChange={({ page }) => {
              push(`${blogPath}/${page}`);
            }}
          />
        </div>
      </div>
    </BaseLayout>
  );
};
