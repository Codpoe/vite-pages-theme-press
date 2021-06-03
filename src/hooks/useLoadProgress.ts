import { useEffect } from 'react';
import { LoadState } from 'vite-plugin-react-pages';
import nProgress from 'nprogress';
import '../styles/nprogress.less';

export function useLoadProgress(loadState: LoadState) {
  useEffect(() => {
    if (loadState.type === 'loading') {
      nProgress.configure({
        template:
          '<div class="shadow-primary-500"><div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div></div>',
      });
      nProgress.start();

      return () => {
        nProgress.done();
      };
    }
  }, [loadState.type]);
}
