/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'fr-blue': '#0055A4',
        'fr-red': '#EF4135',
      },
      boxShadow: {
        'fr-blue': '0 8px 12px -15px rgba(0, 85, 164, 0.3)',
      },
    },
  },
  plugins: [],
}
