import React from 'react';
import { useTheme } from '../../context';
import { Link } from '../Link';

/**
 * Based on https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/theme-default/components/PageEdit.vue
 */
function createEditLink(
  docsRepo: string,
  docsBranch: string,
  docsDir: string,
  path = ''
) {
  docsRepo = docsRepo.replace(/\/$/, '');
  docsDir = docsDir.replace(/\/$/, '');
  path = `/${path}`;

  if (docsRepo.includes('bitbucket.org')) {
    return (
      docsRepo +
      `/src` +
      `/${docsBranch}` +
      `${docsDir ? '/' + docsDir : ''}` +
      path +
      `?mode=edit&spa=0&at=${docsBranch}&fileviewer=file-view-default`
    );
  }

  if (docsRepo.includes('gitlab.com')) {
    return (
      docsRepo +
      `/-/edit` +
      `/${docsBranch}` +
      (docsDir ? '/' + docsDir : '') +
      path
    );
  }

  docsRepo = /^[a-z]+:/i.test(docsRepo)
    ? docsRepo
    : `https://github.com/${docsRepo}`;

  return (
    docsRepo +
    '/edit' +
    `/${docsBranch}` +
    `${docsDir ? '/' + docsDir : ''}` +
    path
  );
}

export interface UpdateInfoProps {
  loadedRoutePath: string;
}

export const UpdateInfo: React.FC<UpdateInfoProps> = props => {
  const { loadedRoutePath } = props;
  const {
    staticData,
    blogPaths,
    repo,
    docsRepo = repo,
    docsBranch = 'master',
    docsDir = '/',
    editLink = false,
    lastUpdated = false,
  } = useTheme();
  const data = staticData[loadedRoutePath].main;
  const editLinkText =
    typeof editLink === 'string' ? editLink : 'Edit this page';
  const lastUpdatedText =
    typeof lastUpdated === 'string' ? lastUpdated : 'Last updated';

  const realEditLink = editLink
    ? createEditLink(docsRepo, docsBranch, docsDir, data.filePath)
    : '';

  const realLastUpdated =
    lastUpdated && data.updatedTime
      ? new Date(data.updatedTime).toLocaleString()
      : '';

  const isBlog = blogPaths.some(path => loadedRoutePath.startsWith(path));

  if (!realEditLink && !realLastUpdated) {
    return null;
  }

  return (
    <div className="flex <sm:(flex-col space-y-2) sm:(justify-between items-center space-x-8) py-4">
      {/* if it is a blog, hide edit link */}
      {!isBlog && realEditLink && (
        <Link
          className="font-medium text-c-text-light hover:text-c-brand transition-colors"
          to={realEditLink}
          color={false}
        >
          {editLinkText}
        </Link>
      )}
      {realLastUpdated && (
        <div>
          <span className="inline-block mr-1 font-medium text-c-text-light">
            {`${lastUpdatedText}:`}
          </span>
          <span className="inline-block text-c-text-lighter">
            {realLastUpdated}
          </span>
        </div>
      )}
    </div>
  );
};
