/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--bg-color)",
        text: "var(--text-color)",
        primary: "var(--primary-color)",
        accent: "var(--accent-color)",
        border: "var(--border-color)",
        grid: "var(--grid-bg-color)",
        weekend: "var(--weekend-bg)",
        currentDay: {
          bg: "var(--current-day-bg)",
          text: "var(--current-day-text)",
        },
      },
      boxShadow: {
        paper: "0 4px 6px var(--shadow-color)",
        card: "0 2px 4px var(--shadow-color)",
      },
      fontFamily: {
        serif: ["Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
