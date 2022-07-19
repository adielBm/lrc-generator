const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [require('@tailwindcss/typography')],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Assistant', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        blue: {
          DEFAULT: '#17324F',
          50: '#F1F6FB',
          100: '#D0E0F1',
          200: '#8CB4DE',
          300: '#4987CA',
          400: '#2B5D92',
          500: '#17324F',
          600: '#142B43',
          700: '#102337',
          800: '#0D1C2B',
          900: '#091420',
        },
        red: {
          DEFAULT: '#EF4444',
          50: '#FDEDED',
          100: '#FCDADA',
          200: '#F9B5B5',
          300: '#F58F8F',
          400: '#F26A6A',
          500: '#EF4444',
          600: '#E71414',
          700: '#B30F0F',
          800: '#800B0B',
          900: '#4C0707',
        },
        green: {
          DEFAULT: '#36B97B',
          50: '#BBEBD5',
          100: '#ACE7CB',
          200: '#8CDDB7',
          300: '#6CD4A3',
          400: '#4DCB8F',
          500: '#36B97B',
          600: '#298E5E',
          700: '#1D6241',
          800: '#103724',
          900: '#030B08',
        },
      },
    },
  },
}
