const options = require("./config"); //options from config.js

const allPlugins = {
  //typography: require("@tailwindcss/typography"),
  forms: require("@tailwindcss/forms"),
  containerQueries: require("@tailwindcss/container-queries"),
};

const plugins = Object.keys(allPlugins)
  .filter((k) => options.plugins[k])
  .map((k) => {
    if (k in options.plugins && options.plugins[k]) {
      return allPlugins[k];
    }
  });

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,php}"],
  //darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#D52C4D',
          700: '#E33737',
          800: '#C92B2B'
        },
        secondary: {
          DEFAULT: '#1E4365',
          300: '#90B8DD',
          400: '#8BAAC7',
          800: '#182735',
          900: '#173958'
        },
        gray: {
          500: '#909090',
          600: '#666'
        },
        black: {
          DEFAULT: '#000',
          900: '#272727'
        },
        white: {
          DEFAULT: '#FFF',
          100: '#F7F9FA'
        }
      },
      fontFamily: {
        inter: 'Inter, system-ui, sans-serif'
      },
      listStyleType: {
        square: 'square',
      }
    },
  },
  plugins: plugins,
};
