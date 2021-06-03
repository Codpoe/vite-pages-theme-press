import { defineConfig } from 'windicss/helpers';
import colors from 'windicss/colors';

export default defineConfig({
  extract: {
    include: ['src/**/*.{js,ts,jsx,tsx}'],
  },
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
      },
    },
  },
  shortcuts: {
    btn: 'focus:outline-none inline-flex justify-center items-center rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 dark:(bg-dark-300 text-gray-200) dark:hover:bg-dark-100',
    'btn-primary':
      'focus:outline-none inline-flex justify-center items-center rounded-md bg-primary-500 text-white hover:bg-primary-400',
    'btn-hollow':
      'focus:outline-none inline-flex justify-center items-center rounded-md border-2 border-primary-500 text-primary-500 hover:(bg-primary-500 text-white)',
  },
});
