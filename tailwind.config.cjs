/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    fontFamily: {
      Roboto: ['Roboto', 'sans-serif'],
      Poppins: ['Poppins', 'sans-serif']
    },
    colors: {
      google: '#ea4335',
      details: '#FEFEFE',
      black: '#29292E',
      white: '#f8f8f8',
      shadow: {
        500: '#050206'
      },
      purple: {
        500: '#835AFD',
        hover: '#6F4BD8'
      },
      danger: {
        500: '#E73F5D',
        hover: '#D73754'
      },
      gray: {
        300: '#DBDCDD',
        500: '#A8A8B3',
        800: '#737380'
      },
      gray_hover: {
        300: '#CECECE',
        500: '#7E7E86',
      },
      pink: {
        300: '#D67EE2',
        500: '#E559F9'
      }

    },
    extend: {
      flex: {
        '5': '5 5 0%',
        '8': '8 8 0%'
      }
    },
  },
  plugins: [],
}
