import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Ultra-Luxury Obsidian Theme (2026)
        obsidian: {
          50: '#f8f9fa',
          100: '#e9ecef',
          200: '#dee2e6',
          300: '#ced4da',
          400: '#adb5bd',
          500: '#6c757d',
          600: '#495057',
          700: '#343a40',
          800: '#1a1d20',
          900: '#111418',
          950: '#0b0e12', // Primary obsidian
        },
        bronze: {
          50: '#faf8f5',
          100: '#f5f0e8',
          200: '#ebe0d0',
          300: '#d9c8ad',
          400: '#c5ae8a',
          500: '#a08968', // Bronze glow
          600: '#8b7355', // Primary bronze
          700: '#6f5c44',
          800: '#5a4936',
          900: '#473a2b',
        },
        teal: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#0a1f2a', // Teal accent
          900: '#0c1821',
        },
        ivory: {
          50: '#ffffff',
          100: '#fefefe',
          200: '#fcfbf9',
          300: '#f8f1e9', // Primary ivory
          400: '#f0e6d8',
          500: '#e8dfc8',
          600: '#d4c5ab',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Playfair Display', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Sora', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-obsidian': 'linear-gradient(135deg, #0b0e12 0%, #111418 50%, #1a1d20 100%)',
        'gradient-bronze': 'linear-gradient(135deg, #8b7355 0%, #a08968 100%)',
        'gradient-teal-accent': 'linear-gradient(135deg, #0a1f2a 0%, #0c1821 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'scale-in': 'scaleIn 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
