/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '',
        secondary: '',
        accent: '',
        // more
      },
      fontFamily: {
        body: ['""', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

