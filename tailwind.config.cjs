/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "login-red": "#fb344d",
        "explore-gray": "#e8f0f8",
        "explore-blue": "#09183d",
      },
    },
  },
  plugins: [],
};
