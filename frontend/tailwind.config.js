/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,js,tsx,jsx}"],
  theme: {
    extend: {},
    container: {
      padding: {
        md: "12rem",
        sm: "2rem",
      },
    },
  },
  plugins: [],
};
