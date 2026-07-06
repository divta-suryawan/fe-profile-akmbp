/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0A1B2B',
          light: '#122A40',
        },
        medblue: {
          DEFAULT: '#1F4E79',
          light: '#2C6394',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#E4C767',
        },
        surface: '#F6F8FA',
        ink: '#1F2937',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(10, 27, 43, 0.18)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
}
