/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./pages/**/*.js', './src/components/**/*.js'],
  content: [],
  theme: {
    colors: {
      primary: {
        1: '#4295FF',
        2: '#1F2B38',
      },
      green: '#2be831',
      red: '#ff6060',
      white: '#ffffff',
      sub: '#4b4a52',
      sub2: '#4c505c',
      gray: '#78777d',
      high: '#32353a',
      message: '#25272D',
      mid: '#1e1d27', // sidebars
      dark: '#17191F', // center
      darker: '#191821',
      black: '#121318', // message box
      void: '#0D0D11', // 1px border
    },
    fontFamily: {
      sans: ['Manrope', 'sans-serif'],
    },
    extend: {
      fontSize: {
        '2xs': '0.72rem',
      },
    },
  },
  plugins: [],
}
