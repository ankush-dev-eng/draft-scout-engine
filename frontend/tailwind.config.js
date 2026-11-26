/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        c9: {
          dark: '#080C16',
          panel: '#0E172A',
          card: '#16223B',
          border: '#233554',
          blue: '#00AEEF',
          blueHover: '#0090C7',
          accent: '#38BDF8',
          red: '#EF4444',
          gold: '#F59E0B'
        }
      }
    },
  },
  plugins: [],
}
