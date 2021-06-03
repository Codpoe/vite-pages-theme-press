import { useEffect } from 'react';
import { LoadState } from 'vite-plugin-react-pages';

export function useScrollToTop(loadState: LoadState) {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      !window.location.hash &&
      loadState.type === 'loaded'
    ) {
      window.scrollTo({
        top: 0,
      });
    }
  }, [loadState]);
}
