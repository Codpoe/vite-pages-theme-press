import { defineConfig } from 'windicss/helpers';

const colorVars = [
  'c-brand',
  'c-brand-light',
  'c-bg',
  'c-bg-light',
  'c-bg-lighter',
  'c-bg-nav',
  'c-bg-sidebar',
  'c-text',
  'c-text-light',
  'c-text-lighter',
  'c-text-lightest',
  'c-text-accent',
  'c-divider',
  'code-bg',
  'code-highlight-bg',
  'code-line-number',
];

export default defineConfig({
  extract: {
    include: ['src/**/*.{js,ts,jsx,tsx}'],
  },
  darkMode: 'class',
  theme: {
    extend: {
      colors: colorVars.reduce((acc, cur) => {
        acc[cur] = `var(--${cur})`;
        return acc;
      }, {} as Record<string, string>),
    },
  },
  shortcuts: {
    'btn-base':
      'focus:outline-none inline-flex justify-center items-center rounded-md transition-colors',
    btn: 'btn-base text-c-text bg-c-bg-light hover:bg-c-bg-lighter',
    'btn-primary': 'btn-base bg-c-brand text-white hover:bg-c-brand-light',
    'btn-hollow':
      'btn-base border-2 border-c-brand text-c-brand hover:(bg-c-brand text-white)',
    'btn-text': 'btn-base text-c-text hover:text-c-brand',
  },
});
