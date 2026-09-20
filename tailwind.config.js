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
        navy: {
          DEFAULT: '#060913',
          900: '#060913',
          800: '#080C16',
          700: '#0A0E1A',
        },
        gold: {
          DEFAULT: '#C5A880',
          light: '#D4B37F',
          dark: '#B38F57',
        },
        charcoal: {
          DEFAULT: '#060913',
          text: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['var(--font-be-vietnam)', 'var(--font-montserrat)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        accent: ['var(--font-be-vietnam)', 'var(--font-montserrat)', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.4)',
        'luxury-hover': '0 25px 50px -12px rgba(197, 168, 128, 0.2)',
      }
    },
  },
  plugins: [],
};
