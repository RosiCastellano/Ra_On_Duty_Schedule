/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'trent-green': '#00563F',
        'trent-light': '#A5D6A7',
        'trent-bg': '#E8F5E9',
      },
    },
  },
  plugins: [],
}
