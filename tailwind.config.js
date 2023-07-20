/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    colors: {
      "main-purple": "#635FC7",
      "main-purple-hover": "#A8A4FF",
      white: "#FFFFFF",
      black: "#000112",
      "very-dark-grey": "#20212C",
      "dark-grey": "#2B2C37",
      "lines-dark": "#3E3F4E",
      "medium-grey": "#828FA3",
      "lines-light": "#E4EBFA",
      "light-grey": "#F4F7FD",
      red: "#EA5555",
      "red-hover": "#FF9898",
    },
    fontSize: {
      "heading-xl": ["24px", { lineHeight: "30px", fontWeight: "bold" }],
      "heading-l": ["18px", { lineHeight: "23px", fontWeight: "bold" }],
      "heading-m": ["15px", { lineHeight: "19px", fontWeight: "bold" }],
      "heading-s": [
        "12px",
        { lineHeight: "15px", fontWeight: "bold", letterSpacing: "2.4px" },
      ],
      "body-l": ["13px", { lineHeight: "23px", fontWeight: "medium" }],
      "body-m": ["12px", { lineHeight: "15px", fontWeight: "bold" }],
    },
    fill: {
      current: "currentColor",
    },
    fill: (theme) => ({
      grey: theme("colors.medium-grey"),
      white: theme("colors.white"),
      purple: theme("colors.main-purple"),
      "light-grey": theme("colors.light-grey"),
    }),
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
