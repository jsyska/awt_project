/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      roboto: ['Roboto', 'sans-serif'],
    },
    extend: {
      animation: { 'like': 'tada 1s ease-in-out' },
      keyframes: {
        tada: {
          '0%': {
            transform: 'scale(1.3)',
          },
          '10%, 20%': {
            transform: 'scale(.7) rotate(-3deg)',
          },
          '30%, 50%, 70%, 90%': {
            transform: 'scale(1.3) rotate(3deg)',
          },
          '40%, 60%, 80%': {
            transform: 'scale(1.3) rotate(-3deg)',
          },
          '100%': {
            transform: 'scale(1) rotate(0)',
          },
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
