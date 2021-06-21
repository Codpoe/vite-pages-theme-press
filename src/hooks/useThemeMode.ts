import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { IN_BROWSER } from '../constants';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'themeMode';

function getThemeMode(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const storageValue = window.localStorage.getItem(STORAGE_KEY);

  if (
    storageValue === 'dark' ||
    (!storageValue && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    return 'dark';
  } else {
    return 'light';
  }
}

function toggleClass(mode: ThemeMode) {
  if (mode === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

if (IN_BROWSER) {
  toggleClass(getThemeMode());
}

export function useThemeMode(): [
  ThemeMode,
  Dispatch<SetStateAction<ThemeMode>>
] {
  const [mode, setMode] = useState(() => getThemeMode());

  useEffect(() => {
    toggleClass(mode);
    window.localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  return [mode, setMode];
}
