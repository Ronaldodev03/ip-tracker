/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryDark: "#2c2c2c",
      },
      boxShadow: {
        custom: "0px 50px 50px -25px rgba(0, 0, 0, 0.10)",
      },
      screens: {
        sm: "375px",
        lsm: "600px",
        md: "768px",
        lg: "1024px",
        xl: "1440px",
        xxl: "1536px",
      },
    },
  },
  plugins: [],
};
