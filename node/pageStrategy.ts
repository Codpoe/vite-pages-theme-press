import {
  extractStaticData,
  DefaultPageStrategy,
  FileHandler,
  File,
} from 'vite-plugin-react-pages';
import { FindPages } from 'vite-plugin-react-pages/dist/node/dynamic-modules/PageStrategy';
import { getPagePublicPath } from 'vite-plugin-react-pages/dist/node/dynamic-modules/DefaultPageStrategy';

async function extractMdTitle(file: File): Promise<string | undefined> {
  const content = await file.read();
  const m = content.match(/#\s+(.*?)\n/) || [];

  return m[1];
}

export async function defaultFileHandler(file: File) {
  const pageId = getPagePublicPath(file.relative);
  const staticData = await extractStaticData(file);

  if (staticData.sourceType === 'md') {
    staticData.title = staticData.title ?? (await extractMdTitle(file));
  }

  return {
    pageId,
    staticData,
    dataPath: file.path,
  };
}

export class PressPageStrategy extends DefaultPageStrategy {
  constructor(
    opts: { extraFindPages?: FindPages; fileHandler?: FileHandler } = {}
  ) {
    const { extraFindPages, fileHandler = defaultFileHandler } = opts;
    super({ extraFindPages, fileHandler });
  }
}
