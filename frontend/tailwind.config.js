/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        whitetaker: 'rgba(255,255,255,0.3)',
      },
    },
  },
  plugins: [],
};
