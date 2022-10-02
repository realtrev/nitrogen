/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./pages/**/*.js', './src/components/**/*.js'],
  content: [],
  theme: {
    colors: {
      primary: '#6d31cf',
      secondary: '#ff8155',
      tertiary: '#ffc04b',
      white: '#ffffff',
      gray: {
        base: '#2a2a2a',
        dark: '#272727',
        darkest: '#212121',
        black: '#1a1a1a',
      },
      messages: {
        incoming: '#5d5d5d',
        outgoing: '#6d31cf',
      },
      text: {
        title: '#ffffff',
        subtitle: '#b4b4b4',
        sub2: '#8c8c8c',
      }
    },
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
      whitney: ['Whitney', 'sans-serif'],
      big: ['Readex Pro', 'sans-serif'],
      beeg: ['Lexend', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}
