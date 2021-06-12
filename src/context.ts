import { createContext, Dispatch, SetStateAction, useContext } from 'react';
import { LoadState, PagesLoaded } from 'vite-plugin-react-pages';
import { ThemeOptions } from './types';

export interface ThemeContextValue extends ThemeOptions {
  base: string;
  useHashRouter: boolean;
  loadState: LoadState;
  loadedData: PagesLoaded;
  loadedRoutePath: string;
  staticData: Record<string, any>;
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  blogPaths: string[];
}

export const ThemeContext = createContext<ThemeContextValue>(null);

export const ThemeProvider = ThemeContext.Provider;

export const useTheme = () => useContext(ThemeContext);
