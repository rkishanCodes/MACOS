/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "finder-nav-dark": "rgb(59, 59, 56)", 
        "finder-body-dark": "rgb(40, 37, 34)",
      },
    },
  },
  plugins: [],
};
