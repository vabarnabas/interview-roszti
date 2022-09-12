/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "soft-green": "#00b581",
        "soft-green-dark": "#00A274",
      },
    },
  },
  plugins: [],
}
