module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'header-dark': '#2B3743',
        'body-dark': '#202D36'
      },
      fontFamily: {
        'nuninto-sans': ["Nunito Sans", "sans-serif"]
      },
      boxShadow: {
        '3xl': '0 0px 10px -1px rgb(0 0 0 / 0.13)',
        '3xl-dark': '0 0px 10px 1px rgb(0 0 0 / 0.4)',
      }
    },
  },
  plugins: [],
}
