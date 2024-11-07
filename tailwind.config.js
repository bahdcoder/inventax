import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './vendor/laravel/jetstream/**/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.tsx',
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', ...defaultTheme.fontFamily.sans],
        serif: ['Fraunces', ...defaultTheme.fontFamily.serif],
      },
      colors: {
        'dark-green': {
          300: '#243138',
          400: '#1b262d',
          500: '#39db7d',
          800: '#141e22',
          900: '#0f171a',
        },
        green: {
          500: '#39db7d',
        },
        gray: {
          600: '#707e80',
        },
      },
    },
  },

  plugins: [forms, typography],
};
