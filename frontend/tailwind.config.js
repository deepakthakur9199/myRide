/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: '#000000',
        primary: '#111111',
        secondary: '#222222',
        accent: '#10b981'
      }
    },
  },
  plugins: [],
}
