module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '2/3': '66.666667%',
      },
      colors: {
        'primary': '#39B44A',
        'shadowPrimary': '#E5E6E7',
        'shadowSecondary': '#2F3A4F',
        'highlight': '#8CC53F'
      } ,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],

};
