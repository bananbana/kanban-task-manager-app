/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./@/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
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
        "destructive-red": "#EA5555",
        "red-hover": "#FF9898",
        "light-blue": "#48c3e5",
        "light-green": "#67e2ae",
        "light-pink": "#f083f0",
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
      fill: (theme) => ({
        red: theme("colors.destructive-red"),
        grey: theme("colors.medium-grey"),
        white: theme("colors.white"),
        purple: theme("colors.main-purple"),
        "light-grey": theme("colors.light-grey"),
        "light-purple": theme("colors.main-purple-hover"),
        "light-blue": theme("colors.light-blue"),
        "light-green": theme("colors.light-green"),
        "light-pink": theme("colors.light-pink"),
      }),
      extend: {},
      screens: {
        phone: "300px",
        tablet: "640px",
        pc: "1024px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
