/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      animation: {
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'alegreya-sans': ['Alegreya Sans', 'sans-serif'],
        'alegreya': ['Alegreya', 'serif'],
      },
      colors: {
        'primary': '#FFD700',
        'secondary': '#D4ADFC',
        'accent': '#F04A00',
        'text-light': '#EAEAEA',
        'text-dark': '#BBBBBB',
      },
      boxShadow: {
        'soft': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'strong': '0 6px 12px rgba(0, 0, 0, 0.2)',
      },
      borderRadius: {
        'lg': '12px',
        'xl': '18px',
      },
    },
  },
  plugins: [],
};
