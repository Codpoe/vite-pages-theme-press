import { createContext, useContext } from 'react';
import { LoadState, PagesLoaded } from 'vite-plugin-react-pages';
import { CreateThemeOptions } from './types';

export interface ThemeContextValue extends CreateThemeOptions {
  useHashRouter: boolean;
  loadState: LoadState;
  loadedData: PagesLoaded;
  loadedRoutePath: string;
  staticData: Record<string, any>;
}

export const ThemeContext = createContext<ThemeContextValue>(null);

export const ThemeProvider = ThemeContext.Provider;

export const useTheme = () => useContext(ThemeContext);
