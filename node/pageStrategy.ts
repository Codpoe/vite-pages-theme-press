import { spawnSync } from 'child_process';
import {
  extractStaticData,
  DefaultPageStrategy,
  FileHandler,
  File,
} from 'vite-plugin-react-pages';
import { FindPages } from 'vite-plugin-react-pages/dist/node/dynamic-modules/PageStrategy';
import { getPagePublicPath } from 'vite-plugin-react-pages/dist/node/dynamic-modules/DefaultPageStrategy';

export async function extractMdTitle(file: File): Promise<string | undefined> {
  const content = await file.read();
  const m = content.match(/#\s+(.*?)\n/) || [];

  return m[1];
}

export function getGitLastUpdatedTimeStamp(file: File) {
  try {
    return (
      parseInt(
        spawnSync('git', ['log', '-1', '--format=%at', file.relative], {
          cwd: file.base,
        }).stdout.toString('utf-8')
      ) * 1000
    );
  } catch (e) {
    /* do not handle for now */
    return undefined;
  }
}

export const defaultFileHandler: FileHandler = async (file, api) => {
  const pageId = getPagePublicPath(file.relative);
  const staticData = await extractStaticData(file);

  if (staticData.sourceType === 'md') {
    staticData.title = staticData.title ?? (await extractMdTitle(file));
    staticData.lastUpdated =
      staticData.lastUpdated ?? getGitLastUpdatedTimeStamp(file);
  }

  // if blog, add additional page
  if (staticData.blog) {
    api.addPageData({
      pageId: (pageId === '/' ? pageId : pageId + '/') + ':page',
      staticData,
      dataPath: file.path,
    });
  }

  return {
    pageId,
    staticData,
    dataPath: file.path,
  };
};

export class PressPageStrategy extends DefaultPageStrategy {
  constructor(
    opts: { extraFindPages?: FindPages; fileHandler?: FileHandler } = {}
  ) {
    const { extraFindPages, fileHandler = defaultFileHandler } = opts;
    super({ extraFindPages, fileHandler });
  }
}
