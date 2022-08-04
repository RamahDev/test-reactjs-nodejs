const tailwindForms = require('@tailwindcss/forms');

module.exports = {
  purge: {
    // mode: 'all',
    enabled: true,
    // preserveHtmlElements: false,
    content: [
      './src/presentation/component/*.tsx',
      './src/presentation/component/**/*.tsx',
      './src/presentation/container/*.tsx',
      './src/presentation/container/**/*.tsx',
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 600,
      semibold: 700,
      bold: 800,
    },
    container: {
      center: true,
    },
    extend: {
      colors: {
        green: { 400: '#58A618', 500: '#27AE60', 900: '#1D5C42' },
        blue: { 900: '#0F579E' },
        red: { 600: '#EB5757' },
        pink: { 500: '#DD5791' },
      },
      transitionProperty: { height: 'height', position: 'position' },
      display: ['hover', 'focus'],
    },
  },
  variants: {
    extend: {
      margin: ['first'],
      ringWidth: ['hover', 'active'],
      opacity: ['disabled'],
      cursor: ['hover', 'focus'],
    },
  },
  plugins: [tailwindForms],
};
