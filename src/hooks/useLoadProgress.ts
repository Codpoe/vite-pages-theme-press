import { useEffect } from 'react';
import { LoadState } from 'vite-plugin-react-pages';
import nProgress from 'nprogress';
import '../styles/nprogress.less';

export function useLoadProgress(loadState: LoadState) {
  useEffect(() => {
    if (loadState.type === 'loading') {
      nProgress.start();

      return () => {
        nProgress.done();
      };
    }
  }, [loadState.type]);
}
