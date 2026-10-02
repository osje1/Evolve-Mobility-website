/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Dark graphite base — premium automotive interior feel
        ink: {
          50: '#F5F6F7',
          100: '#E7E9EC',
          200: '#C7CBD1',
          300: '#9AA1AB',
          400: '#6B7280',
          500: '#4B515C',
          600: '#383D47',
          700: '#282C34',
          800: '#1C1F25',
          900: '#121419',
          950: '#0A0B0E',
        },
        // Copper/flare accent — sharp, not the standard blue/indigo/green
        flare: {
          50: '#FFF4EC',
          100: '#FFE3CC',
          200: '#FFC699',
          300: '#FF9F5C',
          400: '#FF7D33',
          500: '#F2611A',
          600: '#D94E12',
          700: '#B53D0F',
          800: '#8F3010',
          900: '#742A12',
        },
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
      },
      boxShadow: {
        base: '0 1px 2px 0 rgb(10 11 14 / 0.06)',
        raised: '0 8px 24px -8px rgb(10 11 14 / 0.18)',
        floating: '0 24px 48px -12px rgb(10 11 14 / 0.28)',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
