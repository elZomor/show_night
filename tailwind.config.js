/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280', // soft neutral for text
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827', // very dark background
          950: '#0b0f19', // almost pure black
        },
        secondary: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308', // strong gold
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
          950: '#422006',
        },
        accent: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444', // vibrant red accent (optional)
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        theater: {
          dark: '#0f0f0f', // deep black
          curtain: '#8b0000', // rich deep red
          gold: '#cfa62d', // brighter golden shade
          shadow: '#1a1a1a', // for cards and modal backgrounds
          highlight: '#ffcf48', // for hover effects and highlights
        }
      },
      fontFamily: {
        'display': ['"Playfair Display"', 'serif'],
        'sans': ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};