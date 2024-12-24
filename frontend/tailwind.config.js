/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-teal': '#3fa5a5',
        'light-teal': '#3cb9b9',
        'dark-gray': '#36454F',
      },
    },
  },
  plugins: [],
}

