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
          DEFAULT: '#04092b',
          900: '#04092b',
          800: '#07103d',
          700: '#0b1959',
        },
        gold: {
          DEFAULT: '#c5a26c',
          light: '#d6b889',
          dark: '#b38f57',
        },
        ivory: {
          DEFAULT: '#f4f1ea',
          light: '#faf8f5',
          dark: '#e2ddd3',
        },
        charcoal: {
          DEFAULT: '#2d302e',
          text: '#2d302e',
        },
        dark: {
          DEFAULT: '#2d302e',
          text: '#2d302e',
        },
        muted: {
          DEFAULT: '#5f6361',
          text: '#5f6361',
        },
        ruby: {
          DEFAULT: '#a70c0c',
        }
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'sans-serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
        manrope: ['var(--font-manrope)', 'sans-serif'],
        script: ['var(--font-script)', 'cursive'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(4, 9, 43, 0.08)',
        'luxury-hover': '0 25px 50px -12px rgba(4, 9, 43, 0.16)',
        'search': '0px 16px 20px rgba(0, 0, 0, 0.11)',
      }
    },
  },
  plugins: [],
};
