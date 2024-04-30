import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      spacing: {
        99: '550px',
      },
      screens: {
        xs: '200px',
      },
    },
  },
  plugins: [
    tailwindcss,
    autoprefixer,
  ],
};
