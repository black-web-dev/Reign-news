/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      baskerville: ['Libre Baskerville', 'sans-serif'],
      roboto: ['Roboto', 'sans-serif'],
    },
    fontSize: {
      xs: '.75rem',
      sm: '.875rem',
      tiny: '.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.75rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },
    extend: {
      colors: {
        gray: '#3b3b3b',
        'gray-100': '#2e2e2e',
        'gray-200': '#343434',
        'gray-300': '#3b3b3b',
        'gray-400': '#606060',
        'gray-500': '#6b6b6b',
        'gray-600': '#767676',
        'gray-700': '#979797',
        'gray-800': '#d6d6d6',
        'gray-900': '#ececec',
        primary: '#1797ff',
      },
    },
  },
  plugins: [],
};
