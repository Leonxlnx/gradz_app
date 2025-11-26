/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FDFCF8',
        forest: '#143328',
        matcha: '#D4E09B',
        peach: '#F6B092',
        butter: '#FDE68A',
        lilac: '#D8D4F2',
      },
      fontFamily: {
        serif: ['Fraunces', 'serif'],
        sans: ['Outfit', 'sans-serif'],
        hand: ['Caveat', 'cursive'],
      },
      borderRadius: {
        'organic': '3rem',
      },
      boxShadow: {
        'hard': '8px 8px 0px 0px rgba(20, 51, 40, 1)',
        'hard-sm': '4px 4px 0px 0px rgba(20, 51, 40, 1)',
        'hard-lg': '12px 12px 0px 0px rgba(20, 51, 40, 1)',
      },
    },
  },
  plugins: [],
};
