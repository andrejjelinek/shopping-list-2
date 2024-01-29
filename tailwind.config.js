/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#41b883",
        "main-light": "#a5d8ff",
        dark: "#1c1917",
        "dark-light": "#495057",
      },
    },
  },
  plugins: [],
};
