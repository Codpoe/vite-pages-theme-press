import { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useScrollPromise } from './useScrollPromise';

export function useScrollToTop(loadedRoutePath?: string) {
  const { action } = useHistory();
  const actionRef = useRef(action);
  const scrollPromise = useScrollPromise();

  actionRef.current = action;

  useEffect(() => {
    if (actionRef.current === 'PUSH' && !window.location.hash) {
      (async () => {
        await scrollPromise.wait();
        window.scrollTo({
          top: 0,
        });
      })();
    }
  }, [loadedRoutePath, scrollPromise]);
}
