/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./{pages,components}/**/*.tsx'],
  theme: {
    extend: {}
  },
  plugins: [require('daisyui')],
  daisyui: {
    styled: true,
    themes: [],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: 'dark'
  }
}
