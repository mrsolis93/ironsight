const colors = require('tailwindcss/colors')

module.exports = {
  enabled: true,
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // class, 'media' or boolean
  theme: {
    extend: {
      colors: {
        gray: {
          900: '#202225',
          800: '#2f3136',
          700: '#36393f',
          600: '#4f545c',
          400: '#d4d7dc',
          300: '#e3e5e8',
          200: '#ebedef',
          100: '#f2f3f5',
        },
          slate: {
            900: '#121212',
            800: '#1E1E1E',
            700: '#1C1D1F',
            600: '#4f545c',
            400: '#d4d7dc',
            300: '#e3e5e8',
            200: '#ebedef',
            100: '#f2f3f5',  
        },
        

      },
      spacing: {
        88: '22rem',
      },
    },
  },
  variants: {},
  plugins: [require("daisyui")],
};