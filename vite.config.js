/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        oswald: ["Oswald", "sans-serif"],
        wix: ["Wix Madefor Text", "sans-serif"],
      },
      colors: {
        primary: "#6D66C5",
        secondary: "#00CC66",
        dark: "#121212"
      }
    }
  },
  plugins: []
}
