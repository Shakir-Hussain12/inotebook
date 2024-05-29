import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        green: '#00ff00',
      },
      spacing: {
        99: '550px',
      },
      screens: {
        xs: '200px',
        mxs: { max: '450px' },
      },
    },
  },
  plugins: [
    tailwindcss,
    autoprefixer,
  ],
};
