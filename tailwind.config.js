import defaultTheme from 'tailwindcss/defaultTheme';
// eslint-disable-next-line import/no-extraneous-dependencies
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './resources/views/admin/app.blade.php',
    './resources/js/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        phpvms: '#067ec1',
      },
      fontFamily: {
        sans: ['Figtree', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [forms],
};
