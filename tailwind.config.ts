import { nextui } from '@nextui-org/react';
import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [nextui()],
} satisfies Config;
