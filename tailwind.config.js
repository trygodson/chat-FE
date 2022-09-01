module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'appcolor': {
          '50': '#f4f5f7',
          '100': '#e9ebef',
          '200': '#c8ced7',
          '300': '#a7b0be',
          '400': '#65748e',
          '500': '#23395d',
          '600': '#203354',
          '700': '#1a2b46',
          '800': '#152238',
          '900': '#111c2e',
        },
        'seagreen': {
          '50': '#f5f9f7',
          '100': '#eaf3ee',
          '200': '#cbe2d5',
          '300': '#abd1bc',
          '400': '#6dae89',
          '500': '#2e8b57',
          '600': '#297d4e',
          '700': '#236841',
          '800': '#1c5334',
          '900': '#17442b',
        },
      },
      fontFamily: {
        sans: ['Nunito Sans', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('tailwindcss')],
};
