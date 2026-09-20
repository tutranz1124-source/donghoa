/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        warm: {
          50: '#FAF8F5',
          100: '#F5F2EB',
          200: '#EBE6DC',
          300: '#DDD6C9',
          400: '#C7BDAA',
        },
        charcoal: {
          DEFAULT: '#161A22',
          900: '#11141B',
          800: '#161A22',
          700: '#232936',
          600: '#384152',
          muted: '#687182',
        },
        gold: {
          DEFAULT: '#B89358',
          light: '#D4B37F',
          dark: '#9A753C',
        },
        bronze: {
          DEFAULT: '#B89358',
          dark: '#8C6832',
        },
      },
      fontFamily: {
        sans: ['var(--font-be-vietnam)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        accent: ['var(--font-be-vietnam)', 'sans-serif'],
      },
      boxShadow: {
        'warm-sm': '0 2px 8px rgba(22, 26, 34, 0.04)',
        'warm-md': '0 10px 30px rgba(22, 26, 34, 0.06)',
        'warm-lg': '0 20px 40px rgba(22, 26, 34, 0.08)',
      },
    },
  },
  plugins: [],
};
